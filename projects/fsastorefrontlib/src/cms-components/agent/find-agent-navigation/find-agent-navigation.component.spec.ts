import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FindAgentNavigationComponent } from './find-agent-navigation.component';
import { I18nTestingModule } from '@spartacus/core';

describe('FindAgentNavigationComponent', () => {
  let component: FindAgentNavigationComponent;
  let fixture: ComponentFixture<FindAgentNavigationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule],
        declarations: [FindAgentNavigationComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FindAgentNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
