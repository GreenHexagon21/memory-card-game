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
  newCard:Card = {id:0,pairId:0,isTurned:true,shape:"s",picture:""}
  pairIdCounter = 0;
  
  constructor(private cardService: CardService) { }

  getCards(): void {
    this.cardService.getCards()
    .subscribe(cards => this.cards = cards);
  }


  ngOnInit(): void {
    this.fetchJson();
    this.getCards();
    console.log(this.cards);
  }

  fetchJson() :void {
    let data: Jsoner;

    fetch('https://e926.net/posts.json?tags=set%3Adrate')
    .then(function(response) {
      return response.json();
    })
    .then((myJson) => {

      data=myJson
    //console.log(data)
    var counter : number = 0;
    var posturls : string[] = [];

    try {
    while(data['posts'][counter]['file']['url']) {
      
      var copy = structuredClone(this.newCard);
      this.newCard.pairId = counter;
      this.newCard.picture = data['posts'][counter]['file']['url'];
      this.cardService.create(this.newCard);
      console.log(this.newCard);
      this.newCard.pairId = counter;
      this.newCard.picture = data['posts'][counter]['file']['url'];
      this.cardService.create(this.newCard);
      console.log(this.newCard);
      
      counter++;
      //
      //console.log(this.newCard);
      //console.log(this.cardService.getCards());
    }
    } catch {

    }

    });


  }

  

}




