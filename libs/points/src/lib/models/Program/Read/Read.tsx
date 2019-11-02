import React from 'react';

import './Read.scss';
import { Paper, Typography } from '@material-ui/core';

interface Props {
  name: string;
  className: string;
  handleClick?: () => void;
}

export default (props: Props) => {
  const { name, handleClick, className } = props;

  return (
    <Paper className={className} onClick={handleClick}>
      <Typography
        variant="h6"
        component="h6"
        className="account__details__name"
        noWrap={true}
      >
        {name}
      </Typography>
      <Typography component="p">There's a lot to say about {name}!</Typography>
    </Paper>
  );
};
