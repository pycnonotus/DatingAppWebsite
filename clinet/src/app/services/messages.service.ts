import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { Member } from '../model/member';
import { MemberChat } from '../model/memberChat';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  /*
       Map thing was abounded for now. map cuz fg for to think different elements were pushed.
       if you got a salutation for this you should you it instead.
       oh and pm me ths solution <3

  */
  // public messagesMemberData: Map<string, MemberChat> = new Map<
  //   string,
  //   MemberChat
  //   >();
  public messagesMemberData: MemberChat[] = [];

  private messagesMember = new ReplaySubject<Map<string, MemberChat>>(1);

  messagesMember$ = this.messagesMember.asObservable();
  constructor() {}

  fetchMessages(member: Member) {
    if (
      !this.messagesMemberData.some((v, i, a) => {
        return v.member.username === member.username;
      })
    ) {
      this.messagesMemberData.push(new MemberChat(member, null));
    }
    //this.messagesMemberData.set(member.username, new MemberChat(member, null));
  }
  removeMessages(member: Member) {
    console.log('remove');

    const index = this.messagesMemberData.findIndex(
      (x) => x.member.username == member.username
    );
    if (index > -1) {
      this.messagesMemberData.splice(index, 1);
    } else {
      console.log('wwooops');
    }

    //this.messagesMemberData.delete(member.username);
  }
}
