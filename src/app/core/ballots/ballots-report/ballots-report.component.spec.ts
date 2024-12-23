import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallotsReportComponent } from './ballots-report.component';

describe('BallotsReportComponent', () => {
  let component: BallotsReportComponent;
  let fixture: ComponentFixture<BallotsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BallotsReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BallotsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
