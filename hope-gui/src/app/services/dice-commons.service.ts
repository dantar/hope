import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameData } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class DiceCommonsService {

  data: DiceData;
  defs: {[name:string]: DieDef};

  static _items: FaceEffect[] = [];
  static registerFace(item: FaceEffect) {
    this._items.push(item);
  }

  faces: {[id: string]: FaceEffect};

  constructor(private http: HttpClient) {
    this.faces = {};
    DiceCommonsService._items.forEach(m => this.faces[m.name] = m);
    this.http.get<DiceData>('./assets/dice.json').subscribe(data => {
      this.data = data;
      this.defs = {};
      data.dice.forEach(die => this.defs[die.name] = die);
    })
  }

  roll(die: RolledDie) {
    RolledDie.roll(die);
  }

}

export class DiceData {
  name: string;
  dice: DieDef[];
}

export class DieDef {
  name: string;
  faces: string[];
}

export class RolledDie {
  def: DieDef;
  index: number;
  static roll(die: RolledDie) {
    die.index = Math.floor(Math.random() * die.def.faces.length);
  }
  static icons(die: RolledDie): string[] {
    return die.def.faces[die.index].split(' ');
  }
}

export class DiceBatch {
  batch: DieDef[];
}

export class FaceEffect {
  name: string;
  execute: (game: GameData) => void;
}

DiceCommonsService.registerFace({
  name: 'hit',
  execute: (game: GameData) => {
    
  }
});
