import React from 'react';
import { QuerySnapshot } from 'firebase/firebase-firestore';

import './Read.scss';

interface Props {
  programs: Array<QuerySnapshot>;
}

export default (props: Props) => {
  const { programs } = props;

  return (
    <ul>
      {programs.map(program => {
        const { name, transferRatiosByPartner } = program.data();
        return (
          <li key={program.id}>
            {name} | Transfers: {Object.keys(transferRatiosByPartner).length}
          </li>
        );
      })}
    </ul>
  );
};
