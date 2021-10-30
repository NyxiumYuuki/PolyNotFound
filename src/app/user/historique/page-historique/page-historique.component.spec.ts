import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHistoriqueComponent } from './page-historique.component';

describe('PageHistoriqueComponent', () => {
  let component: PageHistoriqueComponent;
  let fixture: ComponentFixture<PageHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageHistoriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
