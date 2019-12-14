import React from 'react';
import { UserRead, UserUpdate } from '../../models';
import { Program, User } from '@points/shared-models';

interface Props {
  programs: Program[];
  user: User;
  updateUser: (ID: string, update: Partial<User>) => void;
}

export default (props: Props) => {
  const { programs, user, updateUser } = props;

  return (
    <section className="programs">
      <UserUpdate updateUser={updateUser} programs={programs} user={user} />
      <UserRead programs={programs} balances={user.balances} />
    </section>
  );
};
