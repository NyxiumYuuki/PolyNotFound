import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMyProfilComponent } from './page-my-profil.component';

describe('PageMyProfilComponent', () => {
  let component: PageMyProfilComponent;
  let fixture: ComponentFixture<PageMyProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageMyProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMyProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
