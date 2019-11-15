import React, { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

interface Option {
  [key: string]: any;
}
interface Props {
  options: Array<Option>;
  label: string;
  onChange: (event: ChangeEvent, value: Option) => void;
  getOptionLabel: (option: Option) => string;
}

export default (props: Props) => {
  const { options, label, onChange, getOptionLabel } = props;
  return (
    <Autocomplete
      options={options}
      getOptionLabel={getOptionLabel}
      onChange={onChange}
      style={{ width: '100%' }}
      renderInput={params => (
        <TextField {...params} label={label} variant="outlined" fullWidth />
      )}
    />
  );
};
