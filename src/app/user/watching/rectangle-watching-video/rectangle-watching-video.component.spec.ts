import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleWatchingVideoComponent } from './rectangle-watching-video.component';

describe('RectangleWatchingVideoComponent', () => {
  let component: RectangleWatchingVideoComponent;
  let fixture: ComponentFixture<RectangleWatchingVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RectangleWatchingVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleWatchingVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
