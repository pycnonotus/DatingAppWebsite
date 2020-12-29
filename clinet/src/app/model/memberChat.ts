import { chatMessage } from './chatMessages';
import { Member } from './member';

export class MemberChat {
  constructor(member, chatMessage) {
    this.member = member;
    this.chatMessage = chatMessage;
  }
  member: Member;
  chatMessage: chatMessage[];
}
