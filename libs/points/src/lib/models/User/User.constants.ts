export interface UserBalances {
  [id: string]: string;
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
