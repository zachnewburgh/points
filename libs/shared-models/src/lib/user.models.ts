export interface UserBalances {
  [id: string]: number;
}

export interface User {
  id: string;
  displayName: string;
  photoURL: string;
  email: string;
  isAdmin: boolean;
  balances: UserBalances;
}
