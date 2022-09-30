import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './module/material.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ItemlistComponent } from './components/itemlist/itemlist.component';
import { TodoComponent } from './components/todo/todo.component';
import { ConvertWithFunctionPipe } from './pipes/convert-with-function.pipe';
import { PlanoContasComponent } from './components/plano-contas/plano-contas.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LancamentoGrupoContasComponent } from './components/grupo-contas/lancamento-grupo-contas.component';


registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemlistComponent,
    TodoComponent,
    ConvertWithFunctionPipe,
    PlanoContasComponent,
    LancamentoGrupoContasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatToolbarModule,
    FlexLayoutModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
