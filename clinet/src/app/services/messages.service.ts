import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { Member } from '../model/member';
import { MemberChat } from '../model/memberChat';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  // public messagesMemberData: Map<string, MemberChat> = new Map<
  //   string,
  //   MemberChat
  //   >();
  public messagesMemberData: MemberChat[] = [];


  private messagesMember = new ReplaySubject<Map<string, MemberChat>>(1);

  messagesMember$ = this.messagesMember.asObservable();
  constructor() {}

  fetchMessages(member: Member) {
    this.messagesMemberData.push(new MemberChat(member, null));
    //this.messagesMemberData.set(member.username, new MemberChat(member, null));
  }
  removeMessages(member: Member) {
    console.log(member.username);

    //this.messagesMemberData.delete(member.username);
    
  }
}
