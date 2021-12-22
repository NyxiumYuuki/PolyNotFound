import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUserListComponent } from './page-user-list.component';

describe('PageUserListComponent', () => {
  let component: PageUserListComponent;
  let fixture: ComponentFixture<PageUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
