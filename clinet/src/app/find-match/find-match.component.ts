import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Member } from '../model/member';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-find-match',
  templateUrl: './find-match.component.html',
  styleUrls: ['./find-match.component.css'],

})
export class FindMatchComponent implements OnInit {
  memberIndex: number = 0;
  constructor(
    private memberService: MembersService,
    private cd: ChangeDetectorRef
  ) {}

  public members: Member[] = [];
  ngOnInit(): void {
    this.memberService.geteAllMemgers().subscribe((res: Member[]) => {
      this.members = res;
      this.memberIndex = 0;
    });
  }
  onUserInteracted(like: boolean) {
    console.log('like dd');
    console.log(like);
    this.members = this.members.slice(1);
    this.memberIndex++;
  }
}
