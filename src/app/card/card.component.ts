import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Card } from '../card';

@Component({
  selector: 'mcg-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})


export class CardComponent implements OnInit {

  @Input() card!: Card;
  @Output() cardClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  turn(): void {
    if (this.card.state == 'default') {
      this.card.state = 'flipped';
    } else {
      this.card.state = 'default';
    }
  }
  

}
