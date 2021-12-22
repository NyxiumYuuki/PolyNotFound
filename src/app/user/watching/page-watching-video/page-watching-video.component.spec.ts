import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWatchingVideoComponent } from './page-watching-video.component';

describe('PageWatchingVideoComponent', () => {
  let component: PageWatchingVideoComponent;
  let fixture: ComponentFixture<PageWatchingVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageWatchingVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWatchingVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
