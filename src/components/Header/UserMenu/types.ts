import { User } from '../../../types';

export interface UserMenuProps {
  loading: boolean,
  error: string,
  user: User,
  isLogged: boolean,
}