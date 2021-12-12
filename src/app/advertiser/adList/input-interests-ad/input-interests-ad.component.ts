import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MessageService} from "../../../utils/services/message/message.service";
import {FictitiousUtilsService} from "../../../utils/services/fictitiousDatas/fictitiousUtils/fictitious-utils.service";



@Component({
    selector: 'app-input-interests-ad',
    templateUrl: './input-interests-ad.component.html',
    styleUrls: ['./input-interests-ad.component.scss']
})
export class InputInterestsAdComponent implements OnInit
{
    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    formControl = new FormControl();
    filteredTags: Observable<string[]>;
    @Input() myTags: string[] = [];
    allTags: string[] = [];
    @Output() eventEmitter = new EventEmitter<string[]>();
    @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;


    constructor( private fictitiousUtilsService: FictitiousUtilsService,
                 private messageService: MessageService ) {}


    ngOnInit(): void
    {
        this.filteredTags = this.formControl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTags.slice()));

        this.messageService
            .get("misc/getInterests")
            .subscribe( retour => {

                if(retour.status !== "success") {
                    console.log(retour);
                }
                else {
                    this.allTags = retour.data.map(x => x.interest)
                    this.allTags.sort();
                }
            });
    }


    add(event: MatChipInputEvent): void
    {
        const value = (event.value || '').trim();
        if (value && (this.allTags.indexOf(value) !== -1))
        {
            this.myTags.push(value);
            event.chipInput!.clear();
            this.formControl.setValue(null);
            this.eventEmitter.emit(this.myTags);
        }
    }


    remove(tag: string): void
    {
        const index = this.myTags.indexOf(tag);
        if (index >= 0) this.myTags.splice(index, 1);
        this.eventEmitter.emit(this.myTags);
    }


    selected(event: MatAutocompleteSelectedEvent): void
    {
        this.myTags.push(event.option.viewValue);
        this.tagInput.nativeElement.value = '';
        this.formControl.setValue(null);
        this.eventEmitter.emit(this.myTags);
    }


    private _filter(value: string): string[]
    {
        const filterValue = value.toLowerCase();
        return this.allTags.filter(fruit => fruit.toLowerCase().includes(filterValue));
    }

}
