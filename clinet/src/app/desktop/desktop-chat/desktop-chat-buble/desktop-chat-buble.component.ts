import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { MemberChat } from 'src/app/model/memberChat';
import { User } from 'src/app/model/user';
import { AccountService } from 'src/app/services/account.service';
import { SubMessagesService } from 'src/app/services/sub-messages.service';

@Component({
  selector: 'app-desktop-chat-buble',
  templateUrl: './desktop-chat-buble.component.html',
  styleUrls: ['./desktop-chat-buble.component.css'],
  providers: [SubMessagesService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class DesktopChatBubleComponent implements OnInit {
  constructor(public subMessagesService: SubMessagesService, private accountServie: AccountService) {}
  @Input() chat: MemberChat;
  @Output() closeChat = new EventEmitter();
  showChat = false;
  user: User;
  text = "";
  ngOnInit(): void {
    this.subMessagesService.blop();

    //TODO: maybe to use object foruser and no a observer? cuz if user logout this dies anyway
    this.accountServie.currentUser$.pipe(take(1))
        .subscribe(user => {
          this.subMessagesService.init(user, this.chat.member.username);
          this.user = user;
        }
      )
  }

  onClose() {
    console.log('i wish to close');

    this.closeChat.emit(this.chat.member);
  }

  sendMessage() {
    this.subMessagesService.sendMessage(this.chat.member.username, this.text).then(x => {
      this.text = "";
    });
    return false;
  }
  getMemberUrl(username) {
    if (username === this.chat.member.username) {
      return 'https://api.time.com/wp-content/uploads/2017/12/terry-crews-person-of-year-2017-time-magazine-2.jpg';
    } else {
      return 'https://cdn.pixabay.com/photo/2017/10/11/08/02/phone-2840244_1280.jpg';
    }
  }

}
