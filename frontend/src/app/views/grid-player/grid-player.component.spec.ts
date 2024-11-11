import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPlayerComponent } from './grid-player.component';

describe('GridPlayerComponent', () => {
  let component: GridPlayerComponent;
  let fixture: ComponentFixture<GridPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
