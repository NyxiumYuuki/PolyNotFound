import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {MessageService} from "../../../utils/services/message/message.service";
import {map, startWith} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";



@Component({
  selector: 'app-input-interests-profil',
  templateUrl: './input-interests-profil.component.html',
  styleUrls: ['./input-interests-profil.component.scss']
})
export class InputInterestsProfilComponent implements OnInit
{
    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    formControl = new FormControl();
    filteredInterests: Observable<string[]>;
    @Input() myInterests: string[] = [];
    allInterests: string[] = [];
    @Output() eventEmitter = new EventEmitter<string[]>();
    @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
    interestsNotSelected: string[] = [];


    constructor( private messageService: MessageService ) {}


    ngOnInit(): void
    {
        this.filteredInterests = this.formControl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) => fruit ? this._filter(fruit) : this.interestsNotSelected.slice()));

        this.messageService
            .get("misc/getInterests")
            .subscribe( retour => {

                if(retour.status !== "success") {
                    console.log(retour);
                }
                else {
                    this.allInterests = [];
                    for(let elt of retour.data)
                    {
                        this.allInterests.push(elt.interest);
                        this.interestsNotSelected.push(elt.interest);
                    }
                }
            });
    }


    add(event: MatChipInputEvent): void
    {
        const value = (event.value || '').trim();
        const index = this.interestsNotSelected.indexOf(value);
        if (value && (index !== -1) && (!this.myInterests.includes(value)))
        {
            this.myInterests.push(value);
            event.chipInput!.clear();
            this.formControl.setValue(null);
            this.eventEmitter.emit(this.myInterests);
            this.interestsNotSelected.splice(index, 1);
        }
    }


    remove(interest: string): void
    {
        // supprimer 'interest' de 'myInterest'
        const index = this.myInterests.indexOf(interest);
        if (index >= 0) this.myInterests.splice(index, 1);
        this.eventEmitter.emit(this.myInterests);

        // remmettre 'interest' dans 'interestsNotSelected'
        if(!this.interestsNotSelected.includes(interest))
        {
            const indexOfAutres = this.interestsNotSelected.indexOf("Autres");
            if(indexOfAutres !== -1)
            {
                this.interestsNotSelected.splice(indexOfAutres, 1);
                if(interest !== "Autres") this.interestsNotSelected.push(interest);
                this.interestsNotSelected.sort();
                this.interestsNotSelected.push("Autres");
            }
            else {
                this.interestsNotSelected.push(interest);
                if(interest !== "Autres") this.interestsNotSelected.sort();
            }
        }
    }


    selected(event: MatAutocompleteSelectedEvent): void
    {
        const value = event.option.viewValue;
        if(!this.myInterests.includes(value))
        {
            this.myInterests.push(value);
            const index = this.interestsNotSelected.indexOf(value);
            this.interestsNotSelected.splice(index, 1);
        }
        this.tagInput.nativeElement.value = '';
        this.formControl.setValue(null);
        this.eventEmitter.emit(this.myInterests);
    }


    private _filter(value: string): string[]
    {
        const filterValue = value.toLowerCase();
        return this.interestsNotSelected.filter(fruit => fruit.toLowerCase().includes(filterValue));
    }

}
