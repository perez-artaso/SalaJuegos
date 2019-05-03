import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AnagramaComponent } from './components/anagrama-component/anagrama-component.component';
import { PPoTComponent } from './components/ppot-component/ppot-component.component';
import { AdivinaComponent } from './components/adivina-component/adivina-component.component';
import { CalculoComponent } from './components/calculo-component/calculo-component.component';
import { MemotestComponent } from './components/memotest-component/memotest-component.component';
import { PuntajesComponent } from './components/puntajes/puntajes.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    AnagramaComponent,
    PPoTComponent,
    AdivinaComponent,
    CalculoComponent,
    MemotestComponent,
    PuntajesComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
