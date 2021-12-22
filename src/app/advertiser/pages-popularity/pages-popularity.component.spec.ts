import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesPopularityComponent } from './pages-popularity.component';

describe('SubjectsPopularityComponent', () => {
  let component: PagesPopularityComponent;
  let fixture: ComponentFixture<PagesPopularityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesPopularityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesPopularityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
