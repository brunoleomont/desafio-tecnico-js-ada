import { Component, OnInit } from '@angular/core';
import { CardService } from './services/card.service';
import { Card } from './models/card';
import { AuthService } from './services/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  card = {} as Card;
  cards: Card[] = [];
  isCreate = false;

  constructor(private cardService: CardService, private auth: AuthService) { }

  ngOnInit() {
    forkJoin(this.auth.login()).subscribe(results => {
      this.auth.setParms(results[0]);
      this.getCards();
    });
  }

  changeIsCreate() {
    this.isCreate = !this.isCreate
  }

  getCards() {
    this.cardService.getCards().subscribe((cards: Card[]) => {
      this.cards = cards;
      this.card = {} as Card;
      this.isCreate = false;
    });
  }

  cardsTodo(): Card[] {
    return this.cards.filter(card => card.lista === 'todo');
  }

  cardsDoing(): Card[] {
    return this.cards.filter(card => card.lista === 'doing');
  }

  cardsDone(): Card[] {
    return this.cards.filter(card => card.lista === 'done');
  }
}
