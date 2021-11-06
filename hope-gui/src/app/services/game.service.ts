import { Injectable } from '@angular/core';
import { ChallengeAction, ChallengeCommonsService, ChallengeDef } from './challenge-commons.service';
import { DieDef } from './dice-commons.service';

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
    game.play.scene.current = new EncounterData('mutants');
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
    this.play.pool.push('wounded');
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

export class PlayData {
  scene: GameScene;
  actionIndex: number;
  bits: number;
  tags: string[];
  wounded: number;
  pool: string[];
  constructor() {
    this.wounded = 0;
    this.bits = 3;
    this.tags = [];
    this.scene = null;
    this.pool = [];
  }
}

export class GameScene {
  done: EncounterData[];
  current: EncounterData;
  line: EncounterData[];
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

export class EncounterData {
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

export class PoolCardDef {
  name: string;
  description: string;
  keywords: string[];
  draft: {[name: string]: (data: GameData, collector: (die: DieDef) => void) => void};
  constructor(name: string) {
    this.name = name;
    this.draft = {};
    this.keywords = [];
  }
  addDraft(name: string, draft: (data: GameData, collector: (die: DieDef) => void) => void): PoolCardDef {
    this.draft[name] = draft;
    return this;
  }
  setDescription(description: string): PoolCardDef {
    this.description = description;
    return this;
  }
  addKeyword(keyword: string): PoolCardDef {
    this.keywords.push(keyword);
    return this;
  }
  static items: {[name:string]: PoolCardDef} = {};
  static register(def: PoolCardDef) {
    PoolCardDef.items[def.name] = def;
  }
}

PoolCardDef.register(
  new PoolCardDef('wounded')
  .setDescription('COMBATTIMENTO: aggiungi 1 dado WOUNDED')
  .addKeyword('combattimento')
  .addDraft('fight', (data: GameData, collector: (die: DieDef) => void) => {
    collector(DieDef.items['wounded']);
  })
)