// src/app/services/websocket.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
  private socket: WebSocket | null = null;
  private messageSubject: Subject<string> = new Subject<string>();

  connect(url: string): Observable<string> {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('>>> connected');
    };

    this.socket.onmessage = (message: MessageEvent) => {
      this.messageSubject.next(message.data);
    };

    return this.messageSubject.asObservable();
  }

  sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket connection is not open.');
    }
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
