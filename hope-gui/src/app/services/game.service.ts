import { Injectable } from '@angular/core';
import { ChallengeCommonsService, ChallengeItem } from './challenge-commons.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  constructor(
    private challenges: ChallengeCommonsService,
  ) { }
  
  newGame(): GameData {
    let game = new GameData();
    game.play.challenge = this.challenges.items['mutants'];
    return game;
  }

}

export class GameData {

  scenario: ScenarioData;
  play: PlayData

  constructor() {
    this.scenario = new ScenarioData();
    this.play = new PlayData();
  }

  actionWound() {
    this.play.wounded = this.play.wounded + 1 ;
  }
  actionFail() {
    
  }

}

export class ScenarioData {

}

export class PlayData {
  challenge: ChallengeItem;
  bits: number;
  tags: string[];
  wounded: number;
  constructor() {
    this.challenge = null;
    this.wounded = 0;
    this.bits = 3;
    this.tags = [];
  }
}