import React, { FormEvent, ChangeEvent } from 'react';
import {
  QuerySnapshot,
  CollectionReference
} from 'firebase/firebase-firestore';

import './Create.scss';
import { Program } from '@points/shared-models';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextInput, PrimaryButton } from '@points/shared-react-ui';

interface Props {
  programs: Array<QuerySnapshot>;
  program: string;
  programsRef: CollectionReference;
  setProgram: (program: string) => void;
  getPrograms: (
    programsRef: CollectionReference,
    setPrograms: (programs: Array<Program>) => void
  ) => void;
  setPrograms: (programs: Array<Program>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    dense: {
      marginTop: theme.spacing(2)
    },
    button: {
      margin: theme.spacing(1)
    }
  })
);

export default (props: Props) => {
  const {
    programs,
    program,
    programsRef,
    getPrograms,
    setProgram,
    setPrograms
  } = props;
  const classes = useStyles({});

  const handleAddProgram = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (programs.find((p: Program) => p.data().name === program)) {
        throw new Error('A program with that name already exists.');
      }
      const docRef = await programsRef.add({
        name: program,
        transferRatiosByPartner: {}
      });
      console.log(`${program} (${docRef.id}) was added successfully.`);
      getPrograms(programsRef, setPrograms);
    } catch (error) {
      console.log(`${program} was not added successfully.`, error);
    }
  };

  const handleProgramChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProgram(event.target.value);
  };

  return (
    <form onSubmit={handleAddProgram}>
      <h3>Add Program</h3>
      <TextInput
        handleOnChange={handleProgramChange}
        label="Program Name"
        id="program-name"
        helperText="Add a Program Name"
      />
      <PrimaryButton type="submit" />
    </form>
  );
};
