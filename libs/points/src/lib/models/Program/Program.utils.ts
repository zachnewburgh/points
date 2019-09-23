import { CollectionReference } from 'firebase/firebase-firestore';
import { Program } from './Program.constants';

export const getPrograms = async (
  programsRef: CollectionReference,
  setPrograms: (programs: Array<Program>) => void
) => {
  const programs = await programsRef.orderBy('name').get();
  setPrograms(programs.docs);
};