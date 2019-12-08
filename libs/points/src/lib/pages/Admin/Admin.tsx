import { ProgramCreate, ProgramUpdate, ProgramDelete } from '../../models';
import React from 'react';
import { Program } from '@points/shared-models';

interface Props {
  programs: Program[];
  addProgram: (name: string) => void;
  updateProgram: (ID: string, update: Partial<Program>) => void;
  deleteProgram: (id: string) => void;
}

export default (props: Props) => {
  const { programs, addProgram, updateProgram, deleteProgram } = props;

  return (
    <section className="admin">
      <ProgramCreate programs={programs} addProgram={addProgram} />
      <ProgramUpdate programs={programs} updateProgram={updateProgram} />
      <ProgramDelete programs={programs} deleteProgram={deleteProgram} />
    </section>
  );
};
