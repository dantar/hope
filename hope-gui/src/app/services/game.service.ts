import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }
}

export class GameData {

  scenario: ScenarioData;
  play: PlayData

  actionWound() {
    this.play.wounded = this.play.wounded + 1 ;
  }
  actionFail() {
    
  }

}

export class ScenarioData {

}

export class PlayData {
  wounded: number;
  constructor() {
    this.wounded = 0;
  }
}