import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputInterestsAdminComponent } from './input-interests-admin.component';

describe('InputInterestsAdminComponent', () => {
  let component: InputInterestsAdminComponent;
  let fixture: ComponentFixture<InputInterestsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputInterestsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputInterestsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
