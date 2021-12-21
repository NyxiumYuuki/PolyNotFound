import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBeforeConnexionComponent } from './navbar-before-connexion.component';

describe('NavbarBeforeConnexionComponent', () => {
  let component: NavbarBeforeConnexionComponent;
  let fixture: ComponentFixture<NavbarBeforeConnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarBeforeConnexionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarBeforeConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
