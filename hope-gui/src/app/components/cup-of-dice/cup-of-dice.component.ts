import { Component, OnInit } from '@angular/core';
import { DiceCommonsService, DieDef, RolledDie } from 'src/app/services/dice-commons.service';

@Component({
  selector: 'app-cup-of-dice',
  templateUrl: './cup-of-dice.component.html',
  styleUrls: ['./cup-of-dice.component.scss']
})
export class CupOfDiceComponent implements OnInit {

  constructor(public dice: DiceCommonsService) { }

  cup: RolledDie[];

  ngOnInit(): void {
    this.cup = [];
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
