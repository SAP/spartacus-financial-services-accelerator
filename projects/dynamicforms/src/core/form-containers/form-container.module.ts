import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { ComponentsModule } from '../../components/components.module';
import { FormConnector } from '../connectors/form.connector';
import { FormBuilderService } from '../services/builder/form-builder.service';
import { FormDataService } from '../services/data/form-data.service';
import { FormValidationService } from '../services/form-validation/form-validation.service';
import { FormService } from '../services/form/form.service';
import { FieldDependencyResolverService } from './../services/form-dependencies/field-dependency-resolver.service';
import { FormDataStorageService } from './../services/storage/form-data-storage.service';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormComponent } from './form/form.component';
import { FileService } from '../services/file/file.service';

@NgModule({
    imports: [
        CommonModule,
        I18nModule,
        RouterModule,
        ReactiveFormsModule,
        ComponentsModule,
    ],
    declarations: [FormComponent, DynamicFormComponent],
    exports: [FormComponent, DynamicFormComponent, ComponentsModule],
    providers: [
        FormService,
        FormBuilderService,
        FormValidationService,
        FieldDependencyResolverService,
        FormDataStorageService,
        FormConnector,
        FormDataService,
        FileService,
    ]
})
export class FormContainerModule {}
