import React, { ChangeEvent } from 'react';
import {
  FormControl,
  FormHelperText,
  TextField,
  MenuItem
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import './Select.scss';

export interface SelectProps {
  handleOnChange: (event: ChangeEvent) => void;
  label: string;
  id: string;
  value?: string | number;
  helperText: string;
  options: Array<{ label: string; value: any }>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
    dense: {
      marginTop: theme.spacing(2)
    },
    menu: {
      width: 300
    }
  })
);

export const Select = (props: SelectProps) => {
  const { handleOnChange, label, id, helperText, value, options } = props;
  const classes = useStyles({});

  return (
    <FormControl>
      <TextField
        select
        id={id}
        label={label}
        className={clsx(classes.textField, classes.dense)}
        value={value}
        margin="dense"
        variant="outlined"
        onChange={handleOnChange}
        SelectProps={{
          MenuProps: {
            className: classes.menu
          }
        }}
      >
        {options.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
      <FormHelperText id={`${id}-helper-text`}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default Select;
