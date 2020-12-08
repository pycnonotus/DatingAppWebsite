import { Component, OnInit } from '@angular/core';
import { Member } from '../model/member';
import { MembersService } from '../services/members.service';


@Component({
  selector: 'app-find-match',
  templateUrl: './find-match.component.html',
  styleUrls: ['./find-match.component.css'],
})
export class FindMatchComponent implements OnInit {
  constructor(private memberService: MembersService) {}
  public members: Member[] = [];
  ngOnInit(): void {
    this.memberService.geteAllMemgers().subscribe((res: Member[]) => {
      this.members = res;
      console.log('====================================');
      console.log(res);
      console.log('====================================');
    });
  }
}
