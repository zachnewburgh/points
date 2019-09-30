import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import './PrimaryButton.scss';

export interface PrimaryButtonProps {
  type?: 'button' | 'reset' | 'submit';
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1)
    }
  })
);

export const PrimaryButton = (props: PrimaryButtonProps) => {
  const { type } = props;
  const classes = useStyles({});

  return (
    <Button
      type={type}
      variant="contained"
      color="primary"
      className={classes.button}
    >
      Submit
    </Button>
  );
};

export default PrimaryButton;
