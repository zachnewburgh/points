import React, { ChangeEvent, FormEvent } from 'react';
import {
  QuerySnapshot,
  CollectionReference
} from 'firebase/firebase-firestore';
import './Delete.scss';

interface Props {
  setProgramToDelete: (id: string) => void;
  getPrograms: () => void;
  programs: Array<QuerySnapshot>;
  programsRef: CollectionReference;
  programToDelete: string;
}

export default (props: Props) => {
  const {
    setProgramToDelete,
    programsRef,
    programs,
    programToDelete,
    getPrograms
  } = props;

  const handleDeleteChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setProgramToDelete(event.target.value);
  };

  const handleDeleteProgram = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const deleteRef = programs.find(program => program.id === programToDelete);
    try {
      await programsRef.doc(programToDelete).delete();
      console.log(`${deleteRef.data().name} successfully deleted.`);
      getPrograms();
    } catch (error) {
      console.log(`${deleteRef.data().name} failed to delete.`);
    }
  };

  return (
    <form onSubmit={handleDeleteProgram}>
      <h3>Delete a Program</h3>
      <label>
        Program
        <select onChange={handleDeleteChange} value={programToDelete} required>
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
      <button type="submit">Submit</button>
    </form>
  );
};
