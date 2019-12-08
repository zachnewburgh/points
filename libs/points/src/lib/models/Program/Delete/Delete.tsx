import React, { ChangeEvent, FormEvent, useState } from 'react';
import './Delete.scss';
import { Program } from '@points/shared-models';
import { PrimaryButton, Select } from '@points/shared-react-ui';

interface Props {
  programs: Program[];
  deleteProgram: (id: string) => void;
}

export default (props: Props) => {
  const { programs, deleteProgram } = props;
  const [programID, setProgramID] = useState();

  const handleDeleteChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setProgramID(event.target.value);
  };

  const handleDeleteProgram = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    deleteProgram(programID);
  };

  const programOptions = programs.map((program: Program) => {
    const { name } = program;
    return { value: program.id, label: name };
  });

  const selectProgram = (
    <Select
      id="delete-program"
      label="Program"
      helperText="Program to delete"
      handleOnChange={handleDeleteChange}
      options={programOptions}
    />
  );

  return (
    <form onSubmit={handleDeleteProgram}>
      <h3>Delete a Program</h3>
      {selectProgram}
      <PrimaryButton type="submit" />
    </form>
  );
};
