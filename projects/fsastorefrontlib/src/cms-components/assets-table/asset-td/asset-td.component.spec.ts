import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { AssetColumn } from '../../../core/assets-table-config/assets-table.config';
import { FS_ICON_TYPE } from '../../../core/icon-config/icon-config';
import { AssetTableType } from '../../../occ';
import { ResolveAssetValuePipe } from '../resolve-asset-value.pipe';
import { AssetTdComponent } from './asset-td.component';

describe('AssetTdComponent', () => {
  let component: AssetTdComponent;
  let fixture: ComponentFixture<AssetTdComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, CommonModule],
        declarations: [AssetTdComponent, ResolveAssetValuePipe],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTdComponent);
    component = fixture.componentInstance;

    component.selectedAsset = AssetTableType.POLICIES;
    component.mobileColumn = 'Test';
    component.icon = {
      show: true,
      type: FS_ICON_TYPE.CHEVRON_RIGHT,
    };
    component.assetConfig = {
      classes: 'test2',
      column: AssetColumn.NUMBER,
      propName: true,
      value: 'test3',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should call ngOnInit column EMPTY', () => {
    component.assetConfig.column = AssetColumn.EMPTY;
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should call ngAfterViewInit', () => {
    component.assetConfig.column = AssetColumn.STATUS;
    spyOn(component, 'ngAfterViewInit').and.callThrough();
    component.ngAfterViewInit();
    expect(component.ngAfterViewInit).toHaveBeenCalled();
  });

  it('should call onIconClick', () => {
    spyOn(component, 'onIconClick').and.callThrough();
    component.onIconClick('test', 'test');
    expect(component.onIconClick).toHaveBeenCalled();
  });
});
