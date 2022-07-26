import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { RoutingService } from '@spartacus/core';
import { AppointmentSchedulingConfirmationComponent } from './appointment-scheduling-confirmation.component';

const mockImageSrc =
  'data:image/svg+xml;base64, PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjExNSIgaGVpZ2h0PSIxMTUiIHZpZXdCb3g9IjAgMCAxMTUgMTE1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMTUgMTE1Ij48c3R5bGU+LnN0MHtmaWxsOnVybCgjU1ZHSURfMV8pfS5zdDF7ZmlsbDojZmZmfS5zdDJ7ZmlsbDojZWVlfS5zdDN7ZmlsbDojMDAzfS5zdDR7ZmlsbDojMDZjfTwvc3R5bGU+PGc+PGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIyNjguNSIgeTE9IjEwMS41IiB4Mj0iMjY4LjUiIHkyPSItOC41IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAtMSAzMjYgMTA0KSI+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojZmZmIi8+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojMDBiOWYyIi8+PHN0b3Agb2Zmc2V0PSIuNTQ5IiBzdHlsZT0ic3RvcC1jb2xvcjojMDE5Y2UwIi8+PHN0b3Agb2Zmc2V0PSIuNzczIiBzdHlsZT0ic3RvcC1jb2xvcjojMGM3ZWNmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojMTY2MWJlIi8+PC9saW5lYXJHcmFkaWVudD48Y2lyY2xlIGNsYXNzPSJzdDAiIGN4PSI1Ny41IiBjeT0iNTcuNSIgcj0iNTUiLz48Zz48ZyBpZD0iR3JvdXBfNDg3OCI+PHBhdGggaWQ9IlBhdGhfMzI3NSIgY2xhc3M9InN0MSIgZD0iTTM4LjkgMjkuMmgyNS42TDc4IDQyLjV2NDEuN2MwIDEuMS0uOSAxLjktMS45IDEuOUgzOC45Yy0xLjEuMC0xLjktLjktMS45LTEuOVYzMS4xQzM3IDMwIDM3LjkgMjkuMiAzOC45IDI5LjJ6Ii8+PHBhdGggaWQ9IlBhdGhfMzI3NiIgY2xhc3M9InN0MiIgZD0iTTY0IDQwLjNWMjguOGwxMy40IDEzLjRINjZDNjQuOSA0Mi4yIDY0IDQxLjMgNjQgNDAuM3oiLz48L2c+PHBhdGggaWQ9IlJlY3RhbmdsZV8yMDMxIiBjbGFzcz0ic3QzIiBkPSJNNDEgNDcuMmgzM3YxSDQxeiIvPjxwYXRoIGlkPSJSZWN0YW5nbGVfMjAzMiIgY2xhc3M9InN0MyIgZD0iTTQxIDUzLjJoMzN2MUg0MXoiLz48cGF0aCBpZD0iUmVjdGFuZ2xlXzIwMzMiIGNsYXNzPSJzdDMiIGQ9Ik00MSA1OC4yaDMzdjFINDF6Ii8+PHBhdGggaWQ9IlJlY3RhbmdsZV8yMDM0IiBjbGFzcz0ic3QzIiBkPSJNNDEgNjQuMmgzM3YxSDQxeiIvPjxwYXRoIGlkPSJSZWN0YW5nbGVfMjAzNSIgY2xhc3M9InN0MyIgZD0iTTQxIDY5LjJoMzN2MUg0MXoiLz48cGF0aCBpZD0iUmVjdGFuZ2xlXzIwMzYiIGNsYXNzPSJzdDMiIGQ9Ik00MSA3NS4yaDMzdjFINDF6Ii8+PHBhdGggaWQ9IlJlY3RhbmdsZV8yMDM3IiBjbGFzcz0ic3QzIiBkPSJNNDEgODAuMmgzM3YxSDQxeiIvPjxwYXRoIGlkPSJSZWN0YW5nbGVfMjAzOCIgY2xhc3M9InN0NCIgZD0iTTQxLjUgMzEuOWgxMC4ydjExLjhINDEuNXoiLz48L2c+PC9nPjwvc3ZnPg==';

class MockDomSanitizer {
  bypassSecurityTrustUrl() {
    return mockImageSrc;
  }
  sanitize() {}
}

class MockRoutingService {}

describe('AppointmentSchedulingConfirmationComponent', () => {
  let component: AppointmentSchedulingConfirmationComponent;
  let fixture: ComponentFixture<AppointmentSchedulingConfirmationComponent>;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentSchedulingConfirmationComponent],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: DomSanitizer,
          useClass: MockDomSanitizer,
        },
      ],
    });

    fixture = TestBed.createComponent(
      AppointmentSchedulingConfirmationComponent
    );
    component = fixture.componentInstance;
    routingService = TestBed.inject(RoutingService);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should check appointmentDate', () => {
    const mockedDate = '2022-05-04 11:00';
    history.pushState({ date: mockedDate }, '', '');
    component.ngOnInit();
    expect(component.appointmentDate).toEqual(mockedDate);
  });
});
