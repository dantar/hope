import { Component, Input, OnInit } from '@angular/core';
import { ChallengeAction, ChallengeCommonsService, ChallengeItem } from 'src/app/services/challenge-commons.service';
import { DiceCommonsService, DieDef, RolledDie } from 'src/app/services/dice-commons.service';
import { Encounter, EncounterAction, GameService } from 'src/app/services/game.service';
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
  @Input() encounter: Encounter;
  bits: number;
  tags: string[];
  tagToFace = {
    '(hit)': 'hit',
    '(cancel)': 'cancel',
    '(crit)': 'crit',
  }

  ngOnInit(): void {
    this.cup = [];
    this.encounter = this.shared.data.play.encounter;
    this.tags = this.shared.data.play.tags;
    this.encounter.challenge.actions.forEach(action => this.addDie(this.dice.defs['cancel']));
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
    console.log(action);
    action.def.action(this.shared.data);
    this.encounter.nextAction();
  }

  clickFace(die: RolledDie) {
    console.log(die.def.faces[die.index]);
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
    //this.game.newEncounter(this.shared.data);
    this.ngOnInit();
  }

}
