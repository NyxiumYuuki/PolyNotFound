import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdvertiserComponent } from './page-advertiser.component';

describe('PageAdvertiserComponent', () => {
  let component: PageAdvertiserComponent;
  let fixture: ComponentFixture<PageAdvertiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAdvertiserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAdvertiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
