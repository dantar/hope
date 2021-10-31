import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.scss']
})
export class MainBoardComponent implements OnInit {

  constructor(
    public shared: SharedDataService,
    private game: GameService,
  ) { }

  ngOnInit(): void {
  }

  openChallenge() {
    this.game.newEncounter(this.shared.data);
  }

}
