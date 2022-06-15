import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../card';
import { CARDS } from '../card-list';
import { CardService } from '../card.service';

type Jsoner = {
  [key: string]: any;
};


@Component({
  selector: 'mcg-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  
  cards: Card[] = [];
  flippedCards: Card[] = [];
  matchedCount = 0;
  pairIdCounter = 0;
  url = 'https://e926.net/posts.json?tags=set%3Adrate';
  
  constructor(private cardService: CardService) { }

  async getCards() {
    this.cardService.getCards().subscribe(cards => this.cards = cards as Card[]);
    //this.cardService.getSuffledCards().subscribe(cards => this.cards = cards);
  }

  shuffleArray(anArray: any[]): any[] {
    console.log(anArray.length);
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  async fetchCards() {
    var counter : number = 0;
    (await this.cardService.getJSON(this.url)).subscribe( 
      async data => {
        try {
          while(data['posts'][counter]['file']['url']) {
          var newCard: Card = {id:0,pairId:counter,state:'default',shape:"s",picture:data['posts'][counter]['file']['url']}
          this.cardService.create(newCard);
          this.cardService.create(newCard);
          counter++;
          }
          } catch {
          }
      },
      err => {
        console.log(err);
      }
    )
    
  }
  cardClicked(index: number): void {
    const cardInfo = this.cards[index];
    console.log('clicked')
    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        //this.checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();

    }
  }

  async ngOnInit(): Promise<void> {
    await this.fetchCards();
    await this.getCards();
    console.log(this.cards);
    this.shuffleArray(this.cards);
    console.log(this.cards);
  }
  switcher() {
    console.log('ran');
  }

}




