import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/model/member';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-matches-member-card',
  templateUrl: './matches-member-card.component.html',
  styleUrls: ['./matches-member-card.component.css'],
})
export class MatchesMemberCardComponent implements OnInit {
  constructor(private messagesService: MessagesService) {}
  @Input() member: Member;
  ngOnInit(): void {}

  getImageUrl(): string {
    return (
      'url(' +
      'https://api.time.com/wp-content/uploads/2017/12/terry-crews-person-of-year-2017-time-magazine-facebook-1.jpg?quality=85' +
      ')'
    );
  }

  openChat() {
    this.messagesService.fetchMessages(this.member);
  }
}
