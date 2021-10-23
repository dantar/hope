import { Injectable } from '@angular/core';
import { ChallengeCommonsService } from './challenge-commons.service';
import { DiceCommonsService } from './dice-commons.service';
import { GameData, GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor(
    private dice: DiceCommonsService,
    private challenges: ChallengeCommonsService,
    private game: GameService,
  ) {
    this.data = game.newGame();
  }
  
  data: GameData;

}
