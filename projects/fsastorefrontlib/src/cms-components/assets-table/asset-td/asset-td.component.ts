import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AssetColumn } from '../../../core/assets-table-config/assets-table.config';
import { FS_ICON_TYPE } from '../../../core/icon-config/icon-config';
import {
  AssetTableType,
  DataAssetConfig,
  RequestType,
} from '../../../occ/occ-models/occ.models';
import { ResolveAssetValuePipe } from '../resolve-asset-value.pipe';

@Component({
  selector: 'cx-fs-asset-td',
  templateUrl: 'asset-td.component.html',
  host: { class: 'd-flex d-md-table-cell' },
})
export class AssetTdComponent implements OnInit, AfterViewInit {
  @Input() asset: { [key: string]: any };
  @Input() assetConfig: DataAssetConfig;
  @Input() selectedAsset: AssetTableType;
  @Input() mobileColumn: string;
  @Output() resolveIconAction = new EventEmitter();

  @ViewChild('tdValue') tdValue: ElementRef<HTMLSpanElement>;

  icon = {
    show: false,
    type: FS_ICON_TYPE.EDIT,
  };

  constructor(
    private renderer: Renderer2,
    private resolveAssetValuePipe: ResolveAssetValuePipe
  ) {}

  ngOnInit(): void {
    if (this.selectedAsset === AssetTableType.POLICIES) {
      if (
        this.assetConfig.column === AssetColumn.NUMBER &&
        this.resolveAssetValuePipe.allowedFSRequestTypesIsClaim(this.asset)
      ) {
        this.icon.show = true;
      }

      if (
        this.assetConfig.column === AssetColumn.CLAIM &&
        this.resolveAssetValuePipe.allowedFSRequestTypesIsClaim(this.asset)
      ) {
        this.icon = {
          show: true,
          type: FS_ICON_TYPE.CHEVRON_RIGHT,
        };
      }
    }
  }

  ngAfterViewInit(): void {
    const el = this.tdValue.nativeElement;

    if (this.assetConfig.column === AssetColumn.STATUS) {
      if (el.innerText === 'Active') this.renderer.addClass(el, 'text-success');
    }
  }

  onIconClick(asset, assetConfig) {
    this.resolveIconAction.emit({ asset, assetConfig });
  }
}
