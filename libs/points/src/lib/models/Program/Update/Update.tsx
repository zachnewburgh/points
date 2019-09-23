import React, { ChangeEvent, FormEvent } from 'react';
import {
  QuerySnapshot,
  CollectionReference
} from 'firebase/firebase-firestore';

import './Update.scss';
import { Program } from '../Program.constants';

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

  return (
    <>
      <form onSubmit={handleAddTransfer}>
        <h3>Add a Transfer Partner</h3>
        <label>
          From
          <select onChange={handleFromChange} value={from} required>
            <option value="" disabled>
              ---
            </option>
            {programs.map(ref => {
              const { name } = ref.data();
              return (
                <option value={ref.id} key={ref.id}>
                  {name}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          To
          <select onChange={handleToChange} value={to} required>
            <option value="" disabled>
              ---
            </option>
            {programs
              .filter(ref => ref.id != from)
              .map(ref => {
                const { name } = ref.data();
                return (
                  <option value={ref.id} key={ref.id}>
                    {name}
                  </option>
                );
              })}
          </select>
        </label>
        <label>
          From Ratio
          <input
            type="number"
            step="0.01"
            value={fromRatio}
            onChange={handleFromRatioChange}
            required
          />
        </label>
        <label>
          To Ratio
          <input
            type="number"
            step="0.01"
            value={toRatio}
            onChange={handleToRatioChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <form onSubmit={handleEditProgram}>
        <h3>Edit a Program Name</h3>
        <label>
          Program
          <select
            onChange={handleEditProgramChange}
            value={programToEdit}
            required
          >
            <option value="" disabled>
              ---
            </option>
            {programs.map(ref => {
              const { name } = ref.data();
              return (
                <option value={ref.id} key={ref.id}>
                  {name}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          New Name
          <input type="text" onChange={handleNewName} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
