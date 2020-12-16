import { Member } from './member';

export interface MemberRegister extends Member {
  password: string;
  dateOfBirth: Date;
}
