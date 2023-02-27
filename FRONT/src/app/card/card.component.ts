import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input()
  card = {} as Card;
  @Input()
  isEdit = false;

  @Output() changeItemEvent = new EventEmitter<string>();

  constructor(private cardService: CardService) {}

  saveCard() {
    if (this.card.id !== undefined) {
      this.cardService.updateCard(this.card).subscribe(() => {
        this.changeItemEvent.emit();
        this.editCard();
      });
    } else {
      this.card.lista = 'todo';
      this.cardService.saveCard(this.card).subscribe(() => {
        this.changeItemEvent.emit();
        this.editCard();
      });
    }
  }
  
  editCard() {
    this.isEdit = !this.isEdit;
  }

  cancelEditCard() {
    this.changeItemEvent.emit();
    this.editCard();
  }

  deleteCard() {
    this.cardService.deleteCard(this.card).subscribe(() => {
      this.changeItemEvent.emit();
    });
  }

  previousLane() {
    if (this.card.lista === 'doing') {
      this.card.lista = 'todo';
    } else if (this.card.lista === 'done') {
      this.card.lista = 'doing';
    } else {
      return;
    }

    this.cardService.updateCard(this.card).subscribe(() => {
      this.changeItemEvent.emit();
    });
  }

  nextLane() {
    if (this.card.lista === 'todo') {
      this.card.lista = 'doing';
    } else if (this.card.lista === 'doing') {
      this.card.lista = 'done';
    } else {
      return;
    }

    this.cardService.updateCard(this.card).subscribe(() => {
      this.changeItemEvent.emit();
    });
  }
}
