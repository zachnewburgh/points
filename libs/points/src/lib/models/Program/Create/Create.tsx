import React, { FormEvent } from 'react';
import {
  QuerySnapshot,
  CollectionReference
} from 'firebase/firebase-firestore';

import './Create.scss';

/* eslint-disable-next-line */
interface Props {
  programs: Array<QuerySnapshot>;
  program: string;
  programsRef: CollectionReference;
  getPrograms: () => void;
  setProgram: (program: string) => void;
}

export default (props: Props) => {
  const { programs, program, programsRef, getPrograms, setProgram } = props;

  const handleAddProgram = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (programs.find(p => p.data().name === program)) {
        throw new Error('A program with that name already exists.');
      }
      const docRef = await programsRef.add({
        name: program,
        transferRatiosByPartner: {}
      });
      console.log(`${program} (${docRef.id}) was added successfully.`);
      getPrograms();
    } catch (error) {
      console.log(`${program} was not added successfully.`, error);
    }
  };

  const handleProgramChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgram(event.target.value);
  };

  return (
    <form onSubmit={handleAddProgram}>
      <h3>Add Program</h3>
      <label>
        Program Name
        <input type="text" onChange={handleProgramChange} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
