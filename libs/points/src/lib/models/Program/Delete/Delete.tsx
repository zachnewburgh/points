import React, { ChangeEvent, FormEvent } from 'react';
import {
  QuerySnapshot,
  CollectionReference
} from 'firebase/firebase-firestore';
import './Delete.scss';
import { Program } from '../Program.constants';

interface Props {
  setProgramToDelete: (id: string) => void;
  programs: Array<QuerySnapshot>;
  programsRef: CollectionReference;
  programToDelete: string;
  getPrograms: (
    programsRef: CollectionReference,
    setPrograms: (programs: Array<Program>) => void
  ) => void;
  setPrograms: (programs: Array<Program>) => void;
}

export default (props: Props) => {
  const {
    setProgramToDelete,
    programsRef,
    programs,
    programToDelete,
    getPrograms,
    setPrograms
  } = props;

  const handleDeleteChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setProgramToDelete(event.target.value);
  };

  const handleDeleteProgram = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const deleteRef = programs.find(
      ({ id }: Program) => id === programToDelete
    );
    try {
      await programsRef.doc(programToDelete).delete();
      console.log(`${deleteRef.data().name} successfully deleted.`);
      getPrograms(programsRef, setPrograms);
    } catch (error) {
      console.log(`${deleteRef.data().name} failed to delete.`);
    }
  };

  const programOptions = programs.map((program: Program) => {
    const { name } = program.data();
    return (
      <option value={program.id} key={program.id}>
        {name}
      </option>
    );
  });

  const selectProgram = (
    <label>
      Program
      <select onChange={handleDeleteChange} value={programToDelete} required>
        <option value="" disabled>
          ---
        </option>
        {programOptions}
      </select>
    </label>
  );

  return (
    <form onSubmit={handleDeleteProgram}>
      <h3>Delete a Program</h3>
      {selectProgram}
      <button type="submit">Submit</button>
    </form>
  );
};
