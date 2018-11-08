import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsastorefrontlibComponent } from './fsastorefrontlib.component';

describe('FsastorefrontlibComponent', () => {
  let component: FsastorefrontlibComponent;
  let fixture: ComponentFixture<FsastorefrontlibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsastorefrontlibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsastorefrontlibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
