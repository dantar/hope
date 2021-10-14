import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CupOfDiceComponent } from './components/cup-of-dice/cup-of-dice.component';


const routes: Routes = [
  {path: '', component: CupOfDiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
