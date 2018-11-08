import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BootstrapModule } from '../../../bootstrap.module';
import { CmsModule } from './../../../cms/cms.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CmsModule,
    BootstrapModule
  ],
  declarations: [LoginComponent, LoginFormComponent],
  exports: [LoginComponent, LoginFormComponent]
})
export class LoginModule {}
