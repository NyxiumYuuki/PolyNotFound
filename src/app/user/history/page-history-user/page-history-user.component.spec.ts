import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHistoryUserComponent } from './page-history-user.component';

describe('PageHistoriqueComponent', () => {
  let component: PageHistoryUserComponent;
  let fixture: ComponentFixture<PageHistoryUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageHistoryUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHistoryUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
