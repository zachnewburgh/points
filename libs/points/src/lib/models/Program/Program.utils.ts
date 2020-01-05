import { CollectionReference } from 'firebase/firebase-firestore';
import { Program } from '@points/shared-models';
import { FirebaseOrder } from '@points/firebase';

export const getPrograms = async (
  programsRef: CollectionReference,
  setPrograms: (programs: Program[]) => void
) => {
  const programs = await programsRef.orderBy(FirebaseOrder.Name).get();
  setPrograms(programs.docs);
};
