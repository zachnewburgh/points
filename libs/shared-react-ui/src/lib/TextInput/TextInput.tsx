import React, { ChangeEvent } from 'react';
import { FormControl, FormHelperText, TextField } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import './TextInput.scss';

export interface TextInputProps {
  handleOnChange: (event: ChangeEvent) => void;
  label: string;
  id: string;
  value?: string | number;
  helperText: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    dense: {
      marginTop: theme.spacing(2)
    }
  })
);

export const TextInput = (props: TextInputProps) => {
  const { handleOnChange, label, id, helperText, value } = props;
  const classes = useStyles({});

  return (
    <FormControl>
      <TextField
        id={id}
        label={label}
        className={clsx(classes.textField, classes.dense)}
        value={value}
        margin="dense"
        variant="outlined"
        onChange={handleOnChange}
      />
      <FormHelperText id={`${id}-helper-text`}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default TextInput;
