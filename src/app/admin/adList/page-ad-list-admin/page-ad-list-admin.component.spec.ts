import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdListAdminComponent } from './page-ad-list-admin.component';

describe('PageAdListAdminComponent', () => {
  let component: PageAdListAdminComponent;
  let fixture: ComponentFixture<PageAdListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAdListAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAdListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
