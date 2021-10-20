import { Component, OnInit } from '@angular/core';
import { ChallengeAction, ChallengeCommonsService, ChallengeItem } from 'src/app/services/challenge-commons.service';
import { DiceCommonsService, DieDef, RolledDie } from 'src/app/services/dice-commons.service';

@Component({
  selector: 'app-cup-of-dice',
  templateUrl: './cup-of-dice.component.html',
  styleUrls: ['./cup-of-dice.component.scss']
})
export class CupOfDiceComponent implements OnInit {

  constructor(
    public dice: DiceCommonsService,
    private chalreg: ChallengeCommonsService,
    ) { }

  cup: RolledDie[];
  challenge: ChallengeItem;
  bits: number;
  actionId: number;

  ngOnInit(): void {
    this.cup = [];
    this.actionId = 0;
    this.bits = 3;
    this.challenge = this.chalreg.items['mutants'];
    let cancel: DieDef = {
      name: 'cancel',
      faces: ['-', '-', '-', '(cancel)', '(cancel)', 'cancel']
    };
    this.challenge.actions.forEach(action => this.addDie(cancel));
  }

  addDie(def: DieDef) {
    let die = {def: def, index:0};
    RolledDie.roll(die);
    this.cup.push(die);
  }

  rollCup() {
    this.cup.forEach(die => RolledDie.roll(die));
  }

  acceptAction(action: ChallengeAction) {
    console.log(action);
    this.actionId = this.actionId +1;
  }

}
