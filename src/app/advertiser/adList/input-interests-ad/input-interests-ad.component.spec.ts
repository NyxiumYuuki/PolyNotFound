import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputInterestsAdComponent } from './input-interests-ad.component';

describe('BarTagsComponent', () => {
  let component: InputInterestsAdComponent;
  let fixture: ComponentFixture<InputInterestsAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputInterestsAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputInterestsAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
