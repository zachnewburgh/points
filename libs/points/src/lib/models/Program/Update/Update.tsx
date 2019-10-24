import React, { ChangeEvent, FormEvent } from 'react';
import {
  QuerySnapshot,
  CollectionReference
} from 'firebase/firebase-firestore';

import './Update.scss';
import { Program } from '@points/shared-models';
import { TextInput, PrimaryButton, Select } from '@points/shared-react-ui';

interface Props {
  programs: Array<QuerySnapshot>;
  programsRef: CollectionReference;
  from: string;
  to: string;
  fromRatio: number;
  toRatio: number;
  programToEdit: string;
  setFrom: (id: string) => void;
  setFromRatio: (ratio: number) => void;
  setTo: (id: string) => void;
  setToRatio: (ratio: number) => void;
  setNewName: (name: string) => void;
  newName: string;
  setProgramToEdit: (id: string) => void;
  getPrograms: (
    programsRef: CollectionReference,
    setPrograms: (programs: Array<Program>) => void
  ) => void;
  setPrograms: (programs: Array<Program>) => void;
}

export default (props: Props) => {
  const {
    from,
    programs,
    to,
    fromRatio,
    toRatio,
    programToEdit,
    setFrom,
    setFromRatio,
    setTo,
    setToRatio,
    programsRef,
    getPrograms,
    setNewName,
    newName,
    setProgramToEdit,
    setPrograms
  } = props;

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
    const fromRef = programs.find(program => program.id === from);
    const toRef = programs.find(program => program.id === to);
    const oldTransfers = fromRef.data().transferRatiosByPartner;
    const transferRatiosByPartner = {
      [to]: ratio,
      ...oldTransfers
    };

    try {
      await programsRef.doc(fromRef.id).update({ transferRatiosByPartner });
      console.log(
        `${toRef.data().name} added to ${
          fromRef.data().name
        } partners successfully at a ${fromRatio}:${toRatio} (${ratio}) ratio.`
      );
      getPrograms(programsRef, setPrograms);
    } catch (error) {
      console.log(
        `${toRef.data().name} was not added to ${fromRef.data().name} partners.`
      );
    }
  };

  const handleNewName = (event: ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleEditProgram = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const editRef = programs.find(program => program.id === programToEdit);
    const name = editRef.data().name;

    try {
      if (programs.find(p => p.data().name === newName)) {
        throw new Error('A program with that name already exists.');
      }
      await programsRef.doc(programToEdit).update({ name: newName });
      console.log(`"${name}" successfully changed to "${newName}".`);
      getPrograms(programsRef, setPrograms);
    } catch (error) {
      console.log(`${name} failed to edit.`, error);
    }
  };

  const handleEditProgramChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setProgramToEdit(event.target.value);
  };

  const programOptions = programs.map(ref => {
    const { name } = ref.data();
    return { value: ref.id, label: name };
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
          options={programOptions.filter(option => option.value != from)}
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
          value={programToEdit}
          options={programOptions}
        />
        <TextInput
          id="new-program-name"
          label="New Name"
          helperText="Edit the program name."
          handleOnChange={handleNewName}
        />
        <PrimaryButton type="submit" />
      </form>
    </>
  );
};
