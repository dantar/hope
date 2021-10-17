import { Component, OnInit } from '@angular/core';
import { ChallengeCommonsService, ChallengeItem } from 'src/app/services/challenge-commons.service';
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

  ngOnInit(): void {
    this.cup = [];
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

}
