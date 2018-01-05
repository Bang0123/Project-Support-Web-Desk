import { NgModule } from '@angular/core';
import { MatModuleModule } from '../mat-module/mat-module.module';
import { ModuleWithProviders } from '@angular/core';


@NgModule({
  imports: [
    MatModuleModule
  ],
  exports: [MatModuleModule],
  declarations: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [

      ]
    };
  }
}
