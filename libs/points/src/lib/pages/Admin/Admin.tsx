import { ProgramCreate, ProgramUpdate, ProgramDelete } from '../../models';
import {
  QuerySnapshot,
  CollectionReference
} from 'firebase/firebase-firestore';
import React from 'react';
import { Program } from '@points/shared-models';

interface Props {
  programs: Array<QuerySnapshot>;
  program: string;
  programsRef: CollectionReference;
  setProgram: (program: string) => void;
  getPrograms: (
    programsRef: CollectionReference,
    setPrograms: (programs: Array<Program>) => void
  ) => void;
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
  setPrograms: (programs: Array<Program>) => void;
  setProgramToDelete: (id: string) => void;
  programToDelete: string;
}

export default (props: Props) => {
  const {
    programs,
    program,
    programsRef,
    getPrograms,
    setPrograms,
    setProgram,
    from,
    to,
    fromRatio,
    toRatio,
    programToEdit,
    setFrom,
    setTo,
    setFromRatio,
    setToRatio,
    setNewName,
    newName,
    setProgramToEdit,
    setProgramToDelete,
    programToDelete
  } = props;

  return (
    <section className="admin">
      <ProgramCreate
        programs={programs}
        program={program}
        programsRef={programsRef}
        getPrograms={getPrograms}
        setProgram={setProgram}
        setPrograms={setPrograms}
      />

      <ProgramUpdate
        from={from}
        programs={programs}
        to={to}
        fromRatio={fromRatio}
        toRatio={toRatio}
        programToEdit={programToEdit}
        setFrom={setFrom}
        setFromRatio={setFromRatio}
        setTo={setTo}
        setToRatio={setToRatio}
        programsRef={programsRef}
        getPrograms={getPrograms}
        setPrograms={setPrograms}
        setNewName={setNewName}
        newName={newName}
        setProgramToEdit={setProgramToEdit}
      />

      <ProgramDelete
        setProgramToDelete={setProgramToDelete}
        getPrograms={getPrograms}
        setPrograms={setPrograms}
        programsRef={programsRef}
        programs={programs}
        programToDelete={programToDelete}
      />
    </section>
  );
};
