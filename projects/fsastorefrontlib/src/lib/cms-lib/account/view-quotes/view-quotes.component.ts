import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
    selector: 'fsa-view-quotes',
    templateUrl: './view-quotes.component.html',
    styleUrls: ['./view-quotes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CMSViewQuotesComponent implements OnInit {

    test = 'Test component';
    
    ngOnInit(){
        console.log('hi');
    }
}