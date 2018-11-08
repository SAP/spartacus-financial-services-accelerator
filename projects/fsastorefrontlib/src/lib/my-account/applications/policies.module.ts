import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PoliciesComponent } from './components/policies/policies.component';
import { reducerProvider } from './store/reducers';
import { PoliciesService } from './services/policies.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule
  ],
  declarations: [PoliciesComponent],
  exports: [PoliciesComponent],
  providers: [reducerProvider, PoliciesService]
})
export class PoliciesModule { }
