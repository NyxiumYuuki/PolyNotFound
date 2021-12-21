import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProfilUserComponent } from './page-profil-user.component';

describe('PageProfilUserComponent', () => {
  let component: PageProfilUserComponent;
  let fixture: ComponentFixture<PageProfilUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageProfilUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageProfilUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
