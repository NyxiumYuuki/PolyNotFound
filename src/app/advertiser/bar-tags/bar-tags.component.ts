import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {FictitiousDatasService} from "../../utils/services/fictitiousDatas/fictitious-datas.service";
import {MessageService} from "../../utils/services/message/message.service";



@Component({
    selector: 'app-bar-tags',
    templateUrl: './bar-tags.component.html',
    styleUrls: ['./bar-tags.component.scss']
})
export class BarTagsComponent implements OnInit
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


    constructor( private fictitiousDatasService: FictitiousDatasService,
                 private messageService: MessageService ) {}


    ngOnInit(): void
    {
        this.filteredTags = this.formControl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTags.slice()));

        // --- FAUX CODE ---
        this.allTags = this.fictitiousDatasService.getTags();
        this.allTags.sort();

        // --- VRAI CODE ---
        /*
        this.messageService
            .sendMessage("advertiser/get/tags", null)
            .subscribe( retour => {

                if(retour.status === "error") console.log(retour);
                else {
                    this.allTags = retour.data.tags;
                    this.allTags.sort();
                }
            });
        */
    }


    add(event: MatChipInputEvent): void
    {
        const value = (event.value || '').trim();
        if (value) this.myTags.push(value); // Add our fruit
        event.chipInput!.clear(); // Clear the input value
        this.formControl.setValue(null);
        this.eventEmitter.emit(this.myTags);
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
