import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdListAdvertiserComponent } from './page-ad-list-advertiser.component';

describe('PageAdvertiserComponent', () => {
  let component: PageAdListAdvertiserComponent;
  let fixture: ComponentFixture<PageAdListAdvertiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAdListAdvertiserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAdListAdvertiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
