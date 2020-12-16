import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from 'src/app/model/member';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
  animations: [
    trigger('dataChange', [
      transition('* => closed', [
        animate(
          '500ms ease',
          style([{ 'margin-right': '100%' }, { opacity: '100%' }])
        ),
      ]),

      transition('done => entering', [
        style([
          {
            'margin-left': '100%',
          },
          { opacity: '0%' },
        ]),
        animate(
          '500ms ease',
          style([{ 'margin-left': '*' }, { opacity: '100%' }])
        ),
      ]),
    ]),
  ],
})
export class MemberCardComponent implements OnInit {
  constructor(private memberServices: MembersService) {}

  @Input() _member: Member;

  @Input() set member(member: any) {
    this.dataState = 'entering';
    this._member = member;
  }

  get member() {
    return this._member;
  }

  @Output() userInteracted = new EventEmitter<boolean>();
  dataState: 'entering' | 'done' = 'done';
  ngOnInit(): void {}

  likeUser() {
    this.memberServices.likeMember(this.member.username, true).subscribe(
      (x) => {
        console.log('like2');

        this.emitUserInteracted(true);
      },
      (error) => {
        console.log('like error');

        console.log(error);
      }
    );
  }
  mehUser() {
    this.memberServices
      .likeMember(this.member.username, false)
      .subscribe((x) => {
        this.emitUserInteracted(false);
      });
  }
  private emitUserInteracted(like: boolean) {
    this.userInteracted.emit(like);
  }
}
