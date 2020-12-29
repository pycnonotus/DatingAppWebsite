import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MemberChat } from 'src/app/model/memberChat';

@Component({
  selector: 'app-desktop-chat-buble',
  templateUrl: './desktop-chat-buble.component.html',
  styleUrls: ['./desktop-chat-buble.component.css'],
})
export class DesktopChatBubleComponent implements OnInit {
  constructor() {}
  @Input() chat: MemberChat;
  @Output() closeChat = new EventEmitter();
  showChat = false;
  rand = Math.random();
  ngOnInit(): void {}

  onClose() {
    this.closeChat.emit(this.chat.member);
  }
}
