import { Injectable } from '@angular/core';
import { GameData } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeCommonsService {

  static _items: ChallengeItem[] = [];
  static registerItem(item: ChallengeItem) {
    this._items.push(item);
  }

  items: {[id: string]: ChallengeItem};

  constructor() {
    this.items = {};
    ChallengeCommonsService._items.forEach(m => this.items[m.name] = m);
  }
  
}

export class ChallengeItem {
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