import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AnagramaComponent } from './components/anagrama-component/anagrama-component.component';
import { PPoTComponent } from './components/ppot-component/ppot-component.component';
import { AdivinaComponent } from './components/adivina-component/adivina-component.component';
import { CalculoComponent } from './components/calculo-component/calculo-component.component';
import { MemotestComponent } from './components/memotest-component/memotest-component.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  { path: 'anagrama', component: AnagramaComponent },
  { path: 'ppot', component: PPoTComponent },
  { path: 'adivina', component: AdivinaComponent },
  { path: 'calculo', component: CalculoComponent },
  { path: 'memotest', component: MemotestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
