import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ChartDataSets} from "chart.js";
import {Label} from "ng2-charts";
import { Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";
import {ThemeService} from "../../utils/theme/theme.service";
import {MessageService} from "../../utils/message/message.service";



interface CoupleNameViews {
    name: string,
    views: Date[],
}



@Component({
  selector: 'app-subjects-popularity',
  templateUrl: './pages-popularity.component.html',
  styleUrls: ['./pages-popularity.component.scss']
})
export class PagesPopularityComponent implements OnInit
{
    formControl: FormControl = new FormControl();
    allCoupleNameViews: CoupleNameViews[] = [];

    allInterests: string[] = [];

    oneDay: number = 24*60*60*1000;
    oneWeek: number = 7*24*60*60*1000;

    campaignOne = new FormGroup({
        start: new FormControl(new Date(((new Date()).getTime() - this.oneWeek))),
        end: new FormControl(new Date()),
    });
    step: number = 1;
    stepUnity: string = "jour" ;


    lineChartData: ChartDataSets[] = [];
    lineChartLabels: Label[] = [];
    chartOptions: any = {
        responsive: true,
        scales: {
            yAxes: [{ display: true, scaleLabel: { display: true, labelString: "vues" } }],
            xAxes: [{ scaleLabel: { display: true, labelString: "temps" } }],
        }
    };

    isDisplayable: boolean = false;


    constructor( private router: Router,
                 public themeService: ThemeService,
                 private messageService: MessageService ) {}


    // -----------------------------------------------------------------------------------------------------


    ngOnInit(): void
    {
        // Initialisation de campaignOne
        let today00h00Date = new Date();
        today00h00Date.setHours(0);
        today00h00Date.setMinutes(0);
        today00h00Date.setSeconds(0);
        today00h00Date.setMilliseconds(0);
        this.campaignOne = new FormGroup({
            start: new FormControl(new Date(today00h00Date.getTime() - this.oneWeek)),
            end: new FormControl(today00h00Date),
        });


        // Sera excuté si on est sur la page 'adsPopularity'
        // Remplie l'attribut 'allCoupleNameViews'
        if(this.router.url.includes("ads"))
        {
            let params = new HttpParams();
            params = params.append("isActive", true);
            this.messageService
                .get("ad/findAll", params )
                .subscribe(ret => this.afterReceivingAds(ret), err => this.afterReceivingAds(err));
        }


        // Sera excuté si on est sur la page 'subjectsPopularity'
        // Remplie l'attribut 'allCoupleNameViews'
        else if(this.router.url.includes("subjects"))
        {
            this.messageService
                .get("misc/getInterests")
                .subscribe( retour => {

                    if(retour.status !== "success") {
                        console.log(retour);
                    }
                    else {
                        this.allInterests = retour.data.map(x => x.interest);
                        this.messageService
                            .get("video/findAll")
                            .subscribe(ret => this.afterReceivingVideos(ret), err => this.afterReceivingVideos(err));
                    }
                });
        }
    }


    // Callback: Sera excuté si on est sur la page 'adsPopularity'
    afterReceivingAds(retour: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
        }
        else {
            const allAdverts = retour.data;
            for(let advert of allAdverts)
            {
                let couple = {name: advert.title, views: advert.views }
                this.allCoupleNameViews.push(couple);
            }

            this.formControl = new FormControl(this.allCoupleNameViews);
            this.onApplyFilter();
        }
    }


    // Callback: Sera excuté si on est sur la page 'subjectsPopularity'
    afterReceivingVideos(retour: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
        }
        else {
            const allVideos = retour.data;
            let myMap: Map<string,Date[]> = new Map();

            // parcours des interest de chaque video
            for(let video of allVideos)
            {
                const key = video.interest;
                if(!myMap.has(key)) myMap.set(key, video.watchedDates);
                else {
                    let tabDate = myMap.get(key);
                    for(let date0 of video.watchedDates) tabDate = this.insertInOrder(tabDate, date0);
                    myMap.set(key, tabDate);
                }
            }

            // parcours les interest qui n'ont pas p été vu dans les videos
            for(let interest of this.allInterests)
            {
                if(!myMap.has(interest)) myMap.set(interest, []);
            }

            // parcours de la map pour remplir 'allCoupleNameViews'
            for(const [key, value] of myMap.entries())
            {
                let couple = {name: key, views: value }
                this.allCoupleNameViews.push(couple);
            }

            this.formControl = new FormControl(this.allCoupleNameViews);
            this.onApplyFilter();
        }
    }


    // -----------------------------------------------------------------------------------------------------


    // Applique le filtre
    onApplyFilter(): void
    {
        // --- initialisation ---
        this.lineChartData = [];
        this.lineChartLabels = [];

        let startDate = this.campaignOne.get("start").value;
        let endDate = this.campaignOne.get("end").value;
        if(this.step <= 0) this.step = 1;
        if((endDate === null) || (endDate === undefined)) endDate = new Date();
        if((startDate === null) || (startDate === undefined)) startDate = new Date(endDate.getTime() - this.oneWeek); // date d'il y a une semaine

        const startTime = startDate.getTime();
        const endTime = endDate.getTime();


        // --- remplissage de 'lineChartLabels' ---
        let dataWithZeros = [];
        let time = startTime;
        let intervals = [];
        while(time <= endTime)
        {
            dataWithZeros.push(0);
            this.lineChartLabels.push(this.getLabel(new Date(time)));
            intervals.push(time);
            time = this.addStep(time);
        }
        intervals.push(time);


        // --- remplissage de 'lineChartData' ---
        for(let coupleNameViews of this.formControl.value)
        {
            let data = dataWithZeros.slice();
            let label = coupleNameViews.name;
            let index = 0;

            for(let date0 of coupleNameViews.views)
            {
                const time0 = (new Date(date0)).getTime();

                if(time0 > (endTime+this.oneDay)) break;

                if((startTime <= time0) && (time0 <= (endTime+this.oneDay)))
                {
                    while((index < intervals.length) && (time0 >= intervals[index])) index += 1;
                    console.log("index:" + index);
                    //console.log("index < intervals.length : " + (index < intervals.length));
                    //console.log("time0 >= intervals[index] : " + (time0 >= intervals[index]));
                    index = index - 1;
                    data[index] += 1;
                }
            }

            this.lineChartData.push({"data": data.slice(), "label": label});
        }
        this.isDisplayable = true;
        console.log(this.lineChartLabels);
    }


    // Renvoie le bon label pour le graph
    getLabel(date0: Date): string
    {
        if((this.stepUnity === 'jour') && (this.step === 1))
        {
            return date0.toLocaleDateString();
        }
        else {
            const time2 = this.addStep((new Date(date0)).getTime()) - this.oneDay;
            let date2 = new Date(time2);
            return date0.toLocaleDateString() + " à " + date2.toLocaleDateString();
        }
    }


    // Ajoute le bon pas à la date 'new Date(time)'
    addStep(time: number): number
    {
        let newDate;

        if(this.stepUnity === 'jour') {
            newDate = new Date(time + this.step*this.oneDay);
        }
        else if(this.stepUnity === 'semaine') {
            newDate = new Date(time + this.step*this.oneWeek);
        }
        else
        {
            const oldDate = new Date(time);

            let newMonth = oldDate.getMonth() + this.step;
            const newYear = oldDate.getFullYear() +  (newMonth / 12);
            newMonth = newMonth % 12;
            const startDate = this.campaignOne.get("start").value;
            const day = startDate.getDate();

            if((newMonth === 1) && ([29, 30, 31].includes(day))) { // si fevrier et si jour n'existe pas
                newDate = new Date(newYear, newMonth, 28);
            }
            else if((day === 31) && ([3, 5, 8, 10].includes(newMonth))) { // si 31 et mois à 30 jours
                newDate = new Date(newYear, newMonth, 30);
            }
            else {
                newDate = new Date(newYear, newMonth, day);
            }
        }

        const _1h = 60*60*1000;
        if(newDate.getHours() === 23) return newDate.getTime() + _1h;
        else if(newDate.getHours() === 1) return newDate.getTime() - _1h;
        else return newDate.getTime();
    }


    // Insere la date0 dans le tableau tabDate par ordre croissant
    insertInOrder(tabDate: Date[], date0: Date): Date[]
    {
        let i = 0;
        let n = tabDate.length;
        let time0 = (new Date(date0)).getTime();

        while((i <n) && (time0 > (new Date(tabDate[i])).getTime())) i++;
        if(i === n) tabDate.push(date0);
        else tabDate.splice(i, 0, date0);

        return tabDate;
    }


    onSelectAll(): void
    {
        this.formControl = new FormControl(this.allCoupleNameViews);
    }

    onDeSelectAll(): void
    {
        this.formControl = new FormControl([]);
    }

}
