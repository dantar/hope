import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiceCommonsService {

  data: DiceData;
  defs: {[name:string]: DieDef};

  constructor(private http: HttpClient) {
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