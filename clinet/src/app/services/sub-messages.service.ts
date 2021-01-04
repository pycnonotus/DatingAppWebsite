import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Group } from '../model/goruo';
import { User } from '../model/user';
import { Message } from './message';

@Injectable({ providedIn: 'any' })
export class SubMessagesService {
  private hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private messagesThreadSource = new BehaviorSubject<Message[]>([]);
  messagesThread$ = this.messagesThreadSource.asObservable();
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  ngOnDestroy() {
    this.stopHubConnection();
  }

  init(user: User, otherUsername: string) {
    this.createHubConnection(user, otherUsername);
  }

  private createHubConnection(user: User, otherUsername: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => {
      console.log(error);
    });
    this.hubConnection.on('ReceiveMessageThread', (message) => {
      this.messagesThreadSource.next(message);
    });
    this.hubConnection.on('NewMessage', (message) => {
      this.messagesThread$.pipe(take(1)).subscribe((messages) => {
        this.messagesThreadSource.next([...messages, message]);
      });
    });
    this.hubConnection.on('UpdateGroup', (group: Group) => {
      if (group.connections.some((x) => x.username === otherUsername)) {
        this.messagesThread$.pipe(take(1)).subscribe((messages) => {
          messages.forEach((message) => {
            if (!message.dateRead) {
              message.dateRead = new Date(Date.now());
            }
          });
          this.messagesThreadSource.next([...messages]);
        });
      }
    });
  }

  private stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
  async sendMessage(username: string, content: string) {
    if (this.isEmptyOrSpaces(content)) {
      return;
    }
      try {
        return this.hubConnection.invoke('SendMessage', {
          recipientUsername: username,
          content,
        });
      } catch (error) {
        console.log(error);
      }
  }

 private isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}
  blop() {
    console.log('blop');
  }
}
