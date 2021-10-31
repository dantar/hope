import { Injectable } from '@angular/core';
import { GameData } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeCommonsService {

  static _items: ChallengeDef[] = [];
  static _map: { [id: string]: ChallengeDef } = {};
  static registerItem(item: ChallengeDef) {
    this._items.push(item);
    this._map[item.name] = item;
  }
  static challenge(name: string): ChallengeDef {
    return this._map[name];
  }

  items: { [id: string]: ChallengeDef };

  constructor() {
    this.items = {};
    ChallengeCommonsService._items.forEach(m => this.items[m.name] = m);
  }

}

export class ChallengeDef {
  name: string;
  actions: ChallengeAction[];
}

export class ChallengeAction {
  required: string;
  description: string;
  action: (game: GameData) => void;
}

ChallengeCommonsService.registerItem({
  name: 'mutants',
  actions: [
    {
      required: 'hit',
      description: '1 wound',
      action: game => {
        game.actionWound();
      },
    },
    {
      required: 'hit',
      description: 'Fail mission',
      action: game => {
        game.actionFail();
      },
    }
  ]
})

