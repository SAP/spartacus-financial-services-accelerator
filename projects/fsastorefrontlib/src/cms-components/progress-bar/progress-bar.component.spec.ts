import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FSProgressBarComponent } from './progress-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Pipe, PipeTransform } from '@angular/core';

describe('FSProgressBarComponent', () => {
  let component: FSProgressBarComponent;
  let fixture: ComponentFixture<FSProgressBarComponent>;

  @Pipe({
    name: 'cxUrl',
  })
  class MockUrlPipe implements PipeTransform {
    transform() {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FSProgressBarComponent, MockUrlPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FSProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
