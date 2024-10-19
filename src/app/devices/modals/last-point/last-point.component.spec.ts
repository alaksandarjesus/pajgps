import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastPointComponent } from './last-point.component';

describe('LastPointComponent', () => {
  let component: LastPointComponent;
  let fixture: ComponentFixture<LastPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastPointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
