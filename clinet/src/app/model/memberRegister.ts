import { Member } from './member';

export interface MemberRegister extends Member {
  about?: string;
  username: string;
  password: string;
}
