import { Component, Input, OnInit } from '@angular/core';
import { FormGenericComponent } from '../form-generic.component';

@Component({
    selector: 'fsa-error-notice',
    templateUrl: './error-notice.component.html'
})

export class ErrorNoticeComponent extends FormGenericComponent implements OnInit {
    @Input() warn: any;
    @Input() parentConfig: any;

    ngOnInit() {
        console.log(this.warn);
    }
}
