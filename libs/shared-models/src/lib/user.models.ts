export interface UserBalances {
  [id: string]: number;
}

export interface CurrentUser {
  displayName: string;
  photoURL: string;
  uid: string;
}

export interface User {
  [id: string]: {
    balances: UserBalances;
  };
}
