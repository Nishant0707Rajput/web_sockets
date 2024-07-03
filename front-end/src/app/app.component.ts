import { Component } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'front-end';
  socket: any;
  messages: string[] = [];
  private messageSubscription: Subscription | null = null;


  constructor(private webSocketService:WebSocketService){

  }
  ngOnInit() {
     this.messageSubscription = this.webSocketService.connect('ws://localhost:8080')
      .subscribe((message: string) => {
        console.log('Received message', message);
        this.messages = [...this.messages, message];
      });
  }
  sendMessageToServer(value: string) {
    this.webSocketService.sendMessage(value);
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
