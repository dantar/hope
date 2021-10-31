import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainBoardComponent } from './components/main-board/main-board.component';


const routes: Routes = [
  {path: '', component: MainBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
