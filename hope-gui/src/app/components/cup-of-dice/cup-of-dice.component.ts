import { Component, Input, OnInit } from '@angular/core';
import { ChallengeCommonsService, ChallengeDef } from 'src/app/services/challenge-commons.service';
import { DiceCommonsService, DieDef, RolledDie } from 'src/app/services/dice-commons.service';
import { EncounterAction, GameScene, GameService, PoolCardDef } from 'src/app/services/game.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: '[app-cup-of-dice]',
  templateUrl: './cup-of-dice.component.html',
  styleUrls: ['./cup-of-dice.component.scss']
})
export class CupOfDiceComponent implements OnInit {

  constructor(
    public dice: DiceCommonsService,
    public shared: SharedDataService,
    private game: GameService,
    private chalreg: ChallengeCommonsService,
    ) { }

  cup: RolledDie[];
  @Input() scene: GameScene;
  encounter: GameSceneWrap;
  
  bits: number;
  tags: string[];
  tagToFace = {
    '(hit)': 'hit',
    '(cancel)': 'cancel',
    '(crit)': 'crit',
  }

  ngOnInit(): void {
    this.cup = [];
    this.encounter = new GameSceneWrap(this.scene);
    this.tags = this.shared.data.play.tags;
    this.encounter.challenge.actions.forEach(action => this.addDie(this.dice.defs['cancel']));
    this.shared.data.play.pool.forEach(card => {
      let draft = PoolCardDef.items[card].draft['fight'];
      if (draft) {
        draft(this.shared.data, (die: DieDef) => {
          this.addDie(die);
        });
      }
    });
  }

  addDie(def: DieDef) {
    let die = {def: def, index:0};
    RolledDie.roll(die);
    this.cup.push(die);
  }

  rollCup() {
    this.cup.forEach(die => RolledDie.roll(die));
  }

  acceptAction(action: EncounterAction) {
    action.def.action(this.shared.data);
    this.encounter.nextAction();
  }

  clickFace(die: RolledDie) {
    let face = this.dice.faces[die.def.faces[die.index]];
    if (face) {
      face.execute(this.shared.data);
      this.cup.splice(this.cup.indexOf(die), 1);
    }
  }

  clickTag(tag: string) {
    if (this.tagToFace[tag]) {
      this.shared.data.payBits(1);
      this.dice.faces[tag].execute(this.shared.data);  
    }
  }

  doneEncounter() {
    this.game.doneEncounter(this.shared.data);
    this.ngOnInit();
  }

}

class GameSceneWrap {

  scene: GameScene;
  challenge: ChallengeDef;

  constructor(scene: GameScene) {
    this.scene = scene;
    this.challenge = ChallengeCommonsService.challenge(this.scene.current.name);
  }

  actions(): EncounterAction[] {
    return this.challenge.actions.map(a => new EncounterAction(a, this.challenge.actions[this.scene.current.step] === a));
  }

  done(): boolean {
    return this.scene.current.step >= this.challenge.actions.length;
  }

  nextAction() {
    GameScene.nextAction(this.scene);
  }

}