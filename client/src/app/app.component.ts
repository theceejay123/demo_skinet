import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'skinet-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private bService: BasketService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.initializeBasket();
    this.initializeUser();
  }

  initializeBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.bService.getBasket(basketId).subscribe(
        () => {
          console.log('initialized basket');
        },
        (error) => console.log(error)
      );
    }
  }

  initializeUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe(
      () => console.log('loaded user'),
      (err) => console.error(err)
    );
  }
}
