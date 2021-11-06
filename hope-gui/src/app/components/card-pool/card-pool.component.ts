import { Component, Input, OnInit } from '@angular/core';
import { PoolCardDef } from 'src/app/services/game.service';

@Component({
  selector: '[app-card-pool]',
  templateUrl: './card-pool.component.html',
  styleUrls: ['./card-pool.component.scss']
})
export class CardPoolComponent implements OnInit {

  @Input() pool: string[]

  constructor() { }

  ngOnInit(): void {
  }

  cards(): PoolCard[] {
    return this.pool.map((name) => new PoolCard(PoolCardDef.items[name]));
  }

}

class PoolCard {
  def: PoolCardDef;
  constructor(def: PoolCardDef) {
    this.def = def;
  }
}