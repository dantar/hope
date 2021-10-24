import { Injectable } from '@angular/core';
import { ChallengeAction, ChallengeCommonsService, ChallengeItem } from './challenge-commons.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  constructor(
    private challenges: ChallengeCommonsService,
  ) { }
  
  newGame(): GameData {
    let game = new GameData();
    this.newEncounter(game);
    return game;
  }
  
  newEncounter(game: GameData) {
    game.play.encounter = new Encounter(this.challenges.items['mutants']);
  }

}

export class GameData {
  payBits(howmany: number) {
    this.play.bits = Math.max(0, this.play.bits - howmany);
  }

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

export class EncounterAction {
  def: ChallengeAction;
  isCurrent: boolean;
  constructor(def, isCurrent) {
    this.def = def;
    this.isCurrent = isCurrent;  
  }
}

export class Encounter {
  challenge: ChallengeItem;
  actionId: number; 
  constructor(challenge: ChallengeItem) {
    this.challenge = challenge;
    this.actionId = 0;
  }
  current(): ChallengeAction {
    return this.challenge.actions[this.actionId];
  }
  nextAction() {
    this.actionId = this.actionId + 1;
  }
  actions(): EncounterAction[] {
    return this.challenge.actions.map(a => new EncounterAction(a, this.actionId === this.challenge.actions.indexOf(a)))
  }
  done(): boolean {
    return this.actionId >= this.challenge.actions.length;
  }
}

export class PlayData {
  encounter: Encounter;
  actionIndex: number;
  bits: number;
  tags: string[];
  wounded: number;
  constructor() {
    this.encounter = null;
    this.wounded = 0;
    this.bits = 3;
    this.tags = [];
  }
}