import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/model/member';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-desktop-chat',
  templateUrl: './desktop-chat.component.html',
  styleUrls: ['./desktop-chat.component.css'],
})
export class DesktopChatComponent implements OnInit {
  constructor(public messageService: MessagesService) {}
  ngOnInit(): void {}

  closeChat(member: any) {
    console.log(member);

    this.messageService.removeMessages(member.member);
  }
}
