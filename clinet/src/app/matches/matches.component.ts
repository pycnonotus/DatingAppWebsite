import { Component, OnInit } from '@angular/core';
import { Member } from '../model/member';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
})
export class MatchesComponent implements OnInit {
  constructor(private memberService: MembersService) {}

  members: Member[] = [];
  ngOnInit(): void {
    this.memberService.getMatches().subscribe((res: Member[]) => {
      this.members = res;
    });
  }
}
