import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Member } from '../model/member';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
})
export class MatchesComponent implements OnInit {
  constructor(private memberService: MembersService) {}
  maths$: Observable<Member[]> = null;
  ngOnInit(): void {
    this.maths$ = this.memberService.getMatches();
  }


}
