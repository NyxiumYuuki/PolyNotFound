import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProfilAdminComponent } from './page-profil-admin.component';

describe('PageProfilAdminComponent', () => {
  let component: PageProfilAdminComponent;
  let fixture: ComponentFixture<PageProfilAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageProfilAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageProfilAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
