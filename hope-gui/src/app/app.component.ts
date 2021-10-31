import { Component } from '@angular/core';
import { DiceCommonsService } from './services/dice-commons.service';
import { SharedDataService } from './services/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hope-gui';

  constructor(
    public dice: DiceCommonsService,
    public shared: SharedDataService,
    ) {
    
  }

}
