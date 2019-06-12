import {CONFIG_PROVIDE, ConfigInterface} from './config.type';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {GGMonacoEditorComponent} from './editor.component';
@NgModule({
    imports: [
        CommonModule
      ],
      declarations: [
        GGMonacoEditorComponent
      ],
      exports: [
        GGMonacoEditorComponent
      ]
})
export class MonacoEditorModule {
    public static forRoot(e: ConfigInterface = {}): ModuleWithProviders {
      return {
        ngModule: MonacoEditorModule,
        providers: [
          { provide: CONFIG_PROVIDE, useValue: e }
        ]
      };
    }
  }