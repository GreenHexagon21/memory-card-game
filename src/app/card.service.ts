import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Card } from './card';
import { CARDS } from './card-list';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  idCounter:number = 0;
  constructor() { }

  getCards(): Observable<Card[]> {
    const cards = of(CARDS);
    return cards;
  }

  getCard(id: number): Observable<Card> {
    const card = CARDS.find(h => h.id === id)!;
    return of(card);
  }
 
  delete(id:number){
    const dragonIndex = CARDS.findIndex(h => h.id === id)!;
    CARDS.splice(dragonIndex,1);
  }
  
  create(card:Card) {
    card.id = this.idCounter;
    this.idCounter++;
    CARDS.push(card);
  }
}
