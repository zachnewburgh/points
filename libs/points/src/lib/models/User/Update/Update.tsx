import { Program, User } from '@points/shared-models';
import { PrimaryButton, Select, TextInput } from '@points/shared-react-ui';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import './Update.scss';

interface Props {
  programs: Program[];
  user: User;
  updateUser: (ID: string, update: Partial<User>) => void;
}

export default (props: Props) => {
  const { programs, user, updateUser } = props;
  const [programID, setProgramID] = useState();
  const [balance, setBalance] = useState();

  const handleupdateUser = async (event: FormEvent) => {
    event.preventDefault();
    const newBalances = { ...user.balances, [programID]: balance };
    if (balance === 0) delete newBalances[programID];
    updateUser(user.id, { balances: newBalances });
  };

  const handleProgramChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setProgramID(event.target.value);
  };

  const handleBalanceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBalance(+event.target.value);
  };

  const programOptions = programs.map(({ id: value, name: label }) => ({
    value,
    label
  }));

  const selectProgram = (
    <Select
      id="edit-program-from"
      label="Program"
      helperText=""
      handleOnChange={handleProgramChange}
      value={programID}
      options={programOptions}
    />
  );

  const selectBalance = (
    <TextInput
      id="program-balance"
      label="Balance"
      helperText=""
      value={balance}
      handleOnChange={handleBalanceChange}
    />
  );

  return (
    <form onSubmit={handleupdateUser}>
      <h3>Add a New Balance</h3>
      {selectProgram}
      {selectBalance}
      <PrimaryButton type="submit" />
    </form>
  );
};
