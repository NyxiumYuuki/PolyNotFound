import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCellComponent } from './video-cell.component';

describe('RectangleVideoComponent', () => {
  let component: VideoCellComponent;
  let fixture: ComponentFixture<VideoCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
