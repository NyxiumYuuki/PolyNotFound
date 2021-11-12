import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {FictitiousDatasService} from "../../../utils/services/fictitiousDatas/fictitious-datas.service";
import {MessageService} from "../../../utils/services/message/message.service";
import {map, startWith} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";


@Component({
  selector: 'app-input-interests',
  templateUrl: './input-interests.component.html',
  styleUrls: ['./input-interests.component.scss']
})
export class InputInterestsComponent implements OnInit
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


    constructor( private fictitiousDatasService: FictitiousDatasService,
                 private messageService: MessageService ) {}


    ngOnInit(): void
    {
        this.filteredInterests = this.formControl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) => fruit ? this._filter(fruit) : this.allInterests.slice()));

        // --- FAUX CODE ---
        this.allInterests = this.fictitiousDatasService.getTags();
        this.allInterests.sort();
    }


    add(event: MatChipInputEvent): void
    {
        const value = (event.value || '').trim();
        if (value && (this.allInterests.indexOf(value) !== -1))
        {
            this.myInterests.push(value);
            event.chipInput!.clear();
            this.formControl.setValue(null);
            this.eventEmitter.emit(this.myInterests);
        }
    }


    remove(tag: string): void
    {
        const index = this.myInterests.indexOf(tag);
        if (index >= 0) this.myInterests.splice(index, 1);
        this.eventEmitter.emit(this.myInterests);
    }


    selected(event: MatAutocompleteSelectedEvent): void
    {
        this.myInterests.push(event.option.viewValue);
        this.tagInput.nativeElement.value = '';
        this.formControl.setValue(null);
        this.eventEmitter.emit(this.myInterests);
    }


    private _filter(value: string): string[]
    {
        const filterValue = value.toLowerCase();
        return this.allInterests.filter(fruit => fruit.toLowerCase().includes(filterValue));
    }

}