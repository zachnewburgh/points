import React, { FormEvent, ChangeEvent, useState } from 'react';
import './Create.scss';
import { Program } from '@points/shared-models';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TextInput, PrimaryButton } from '@points/shared-react-ui';

interface Props {
  programs: Program[];
  addProgram: (program: string) => void;
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
  const { programs, addProgram } = props;
  const [programName, setProgramName] = useState();

  const handleAddProgram = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addProgram(programName);
  };

  const handleProgramChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProgramName(event.target.value);
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
