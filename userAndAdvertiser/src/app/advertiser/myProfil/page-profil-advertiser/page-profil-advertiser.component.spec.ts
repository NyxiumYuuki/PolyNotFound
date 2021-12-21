import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProfilAdvertiserComponent } from './page-profil-advertiser.component';

describe('PageProfilAdvertiserComponent', () => {
  let component: PageProfilAdvertiserComponent;
  let fixture: ComponentFixture<PageProfilAdvertiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageProfilAdvertiserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageProfilAdvertiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
