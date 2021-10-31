import { Injectable } from '@angular/core';
import { ChallengeAction, ChallengeCommonsService, ChallengeDef } from './challenge-commons.service';

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
    game.play.scene = new GameScene();
    game.play.scene.current = new EncounterPlan('mutants');
  }

  doneEncounter(data: GameData) {
    GameData.endScene(data);
  }
  
}

export class GameData {

  static endScene(data: GameData) {
    data.play.scene = null;
  }

  static current(game: GameData) {
    return ChallengeCommonsService.challenge(game.play.scene.current.name).actions[game.play.scene.current.step];
  }

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

// DEBT: remove me
export class Encounter {
  challenge: ChallengeDef;
  actionId: number; 
  constructor(challenge: ChallengeDef) {
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
  scene: GameScene;
  actionIndex: number;
  bits: number;
  tags: string[];
  wounded: number;
  constructor() {
    this.wounded = 0;
    this.bits = 3;
    this.tags = [];
    this.scene = null;
  }
}

export class GameScene {
  done: EncounterPlan[];
  current: EncounterPlan;
  line: EncounterPlan[];
  rewards: string[];
  constructor() {
    this.done = [];
    this.current = null;
    this.line = [];
    this.rewards = [];
  }
  static nextAction(scene: GameScene) {
    scene.current.step = scene.current.step +1;
  }
}

export class EncounterPlan {
 name: string;
 step: number;
 constructor(name: string) {
  this.name = name;
  this.step = 0;
 }
}

export class RewardDef {
  name: string;
  collect: (data: GameData) => void;
}