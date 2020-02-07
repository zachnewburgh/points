import { Program } from '@points/shared-models';
import { PrimaryButton, Select, TextInput } from '@points/shared-react-ui';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import './Update.scss';

interface Props {
  programs: Program[];
  updateProgram: (ID: string, update: Partial<Program>) => void;
}

export default (props: Props) => {
  const { programs, updateProgram } = props;

  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [fromRatio, setFromRatio] = useState(0);
  const [toRatio, setToRatio] = useState(0);
  const [name, setName] = useState();
  const [ID, setID] = useState();

  const handleFromChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFrom(event.target.value);
  };

  const handleFromRatioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFromRatio(+event.target.value);
  };

  const handleToChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTo(event.target.value);
  };

  const handleToRatioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToRatio(+event.target.value);
  };

  const handleAddTransfer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ratio = toRatio / fromRatio;
    const fromProgram = programs.find(({ id }) => id === from);
    const transferRatiosByPartner = {
      ...fromProgram.transferRatiosByPartner,
      [to]: ratio
    };
    updateProgram(from, { transferRatiosByPartner });
  };

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEditProgram = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProgram(ID, { name });
  };

  const handleEditProgramChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setID(event.target.value);
  };

  const programOptions = programs.map(({ name: label, id: value }) => {
    return { label, value };
  });

  return (
    <>
      <form onSubmit={handleAddTransfer}>
        <h3>Add a Transfer Partner</h3>
        <Select
          id="edit-program-from"
          label="From"
          helperText="From"
          handleOnChange={handleFromChange}
          value={from}
          options={programOptions}
        />
        <Select
          id="edit-program-to"
          label="To"
          helperText="To"
          handleOnChange={handleToChange}
          value={to}
          options={programOptions.filter(option => option.value !== from)}
        />
        <TextInput
          id="from-ratio"
          label="From Ratio"
          helperText="From Ratio"
          handleOnChange={handleFromRatioChange}
          value={fromRatio}
        />
        <TextInput
          id="to-ratio"
          label="To Ratio"
          helperText="To Ratio"
          handleOnChange={handleToRatioChange}
          value={toRatio}
        />
        <PrimaryButton type="submit" />
      </form>

      <form onSubmit={handleEditProgram}>
        <h3>Edit a Program Name</h3>
        <Select
          id="edit-program-name"
          label="Program Name"
          helperText="Program to edit"
          handleOnChange={handleEditProgramChange}
          value={ID}
          options={programOptions}
        />
        <TextInput
          id="new-program-name"
          label="New Name"
          helperText="Edit the program name."
          handleOnChange={handleName}
        />
        <PrimaryButton type="submit" />
      </form>
    </>
  );
};
