import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public conversations: Object[];
  public title: string = 'Clever app title';


  constructor(public navCtrl: NavController) {

    this.conversations = [
      {
        image: './assets/imgs/avatar-ts-jessie.png',
        name: 'Jessie',
        title: 'Pay attention',
        description: 'This is just some placeholder text',
      }, {
        image: './assets/imgs/avatar-ts-bullseye.png',
        name: 'Bullseye',
        title: 'Got ya',
        description: 'This is just some placeholder text',
      }, {
        image: './assets/imgs/avatar-ts-buzz.png',
        name: 'Buzz',
        title: 'I can fly',
        description: 'This is just some placeholder text',
      }, {
        image: './assets/imgs/avatar-ts-hamm.png',
        name: 'Hamm',
        title: 'Pork tastes good',
        description: 'This is just some placeholder text',
      }, {
        image: './assets/imgs/avatar-ts-potatohead.png',
        name: 'Potatohead',
        title: 'Chop chop',
        description: 'This is just some placeholder text',
      }, {
        image: './assets/imgs/avatar-ts-rex.png',
        name: 'Rex',
        title: 'Tiny hands',
        description: 'This is just some placeholder text',
      }, {
        image: './assets/imgs/avatar-ts-sarge.png',
        name: 'Jessie',
        title: 'Weeeeee',
        description: 'This is just some placeholder text',
      }, {
        image: './assets/imgs/avatar-ts-slinky.png',
        name: 'Slinky',
        title: 'Pay attention',
        description: 'This is just some placeholder text',
      }, {
        image: './assets/imgs/avatar-ts-squeeze.png',
        name: 'Squeeze',
        title: 'Me',
        description: 'This is just some placeholder text',
      }, {
        image: './assets/imgs/avatar-ts-woody.png',
        name: 'Woody',
        title: 'Like my head?',
        description: 'This is just some placeholder text',
      }, {
        image: './assets/imgs/avatar-ts-jessie.png',
        name: 'Jessie',
        title: 'Pay attention',
        description: 'This is just some placeholder text',
      }, {
        image: './assets/imgs/avatar-ts-jessie.png',
        name: 'Jessie',
        title: 'Pay attention',
        description: 'Help ons bepalen hoe jij over risico denkt, zodat wij een gepaste nieuwe regeling kunnen adviseren',
      }

    ]

  }

}
