import React, { ChangeEvent } from 'react';
import { Autocomplete } from '@points/shared-react-ui';
import './Home.scss';
import { airports } from './Airports.constants';
import { FlightOption } from '@points/shared-react-ui';
import { RouteComponentProps } from 'react-router-dom';
import { User } from '@points/shared-models';

interface Props extends RouteComponentProps {
  arriving: string;
  departing: string;
  program: string;
  programs: { ids: string[]; entities: Program[] };
  user: User;
  setArriving: (airportName: string) => void;
  setDeparting: (airportName: string) => void;
  setProgram: (program: string) => void;
  login: () => void;
}

interface Airport {
  name: string;
  code: string;
}

interface Program {
  name: string;
}

export default (props: Props) => {
  const {
    departing,
    arriving,
    setArriving,
    setDeparting,
    setProgram,
    program,
    programs: realPrograms,
    user
  } = props;

  const programs = [
    { name: 'Aeroplan' },
    { name: 'United' },
    { name: 'Delta' },
    { name: 'Southwest' }
  ];

  const getAirportLabel = ({ name, code }: Airport) => `${name} (${code})`;

  const handleDepartureChange = (_: ChangeEvent, airport: Airport) =>
    setDeparting(airport && airport.code);

  const handleArrivalChange = (_: ChangeEvent, airport: Airport) =>
    setArriving(airport && airport.code);

  const handleRouteClick = (name: string) => {
    const newProgram = name === program ? null : name;
    setProgram(newProgram);
  };

  const travelForm = (
    <div className="home__form__airports">
      <Autocomplete
        options={airports}
        getOptionLabel={getAirportLabel}
        onChange={handleDepartureChange}
        label="From"
      />
      <Autocomplete
        options={airports}
        getOptionLabel={getAirportLabel}
        onChange={handleArrivalChange}
        label="To"
      />
    </div>
  );

  const flightOptions =
    departing &&
    arriving &&
    programs.map(({ name }: Program, index: number) => (
      <FlightOption
        key={index}
        name={name}
        itinerary={`${departing}-${arriving}`}
        points={100 + index}
        onClick={() => handleRouteClick(name)}
        isSelected={name === program}
      />
    ));

  const points = realPrograms.ids.map(id => ({
    name: realPrograms.entities[id].name,
    children: Object.keys(user.balances).map(key => {
      const ratio = realPrograms.entities[key].transferRatiosByPartner[id] || 0;
      const numPoints = user.balances[key];
      return ratio * numPoints;
    })
  }));

  let table;
  if (realPrograms.ids.length) {
    const rows = Object.keys(user.balances).reduce((map, id) => {
      const transferPartnersMap =
        realPrograms.entities[id].transferRatiosByPartner;
      const partnerIDs = Object.keys(transferPartnersMap);
      partnerIDs.forEach(ID => {
        const transferPoints = Math.floor(
          transferPartnersMap[ID] * user.balances[id]
        );
        if (map[ID]) {
          const { current = 0, transfer: existingTransfer = 0 } = map[ID];
          const transfer = existingTransfer + transferPoints;
          const total = current + transfer;
          map[ID] = { current, transfer, total };
        } else {
          const current = 0;
          const transfer = transferPoints;
          const total = transferPoints;
          map[ID] = { current, transfer, total };
        }
      });
      const current = user.balances[id];
      const transfer = map[id] ? map[id].transfer : 0;
      const total = current + transfer;
      return { ...map, [id]: { current, transfer, total } };
    }, {});
    console.log(rows);

    const tableHeaders = ['Current', 'Transfers', 'Total'].map(
      (header, index) => <th key={index}>{header}</th>
    );

    const tableBody = Object.keys(rows).map((key, index) => (
      <tr key={index}>
        <td>{realPrograms.entities[key].name}</td>
        {Object.keys(rows[key]).map((rowKey, idx) => (
          <td key={idx}>{rows[key][rowKey]}</td>
        ))}
      </tr>
    ));

    table = (
      <table>
        <thead>
          <tr>
            <th />
            {tableHeaders}
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    );
  }

  return (
    <section className="home">
      {table}
      <h1>Where would you like to go?</h1>
      <form className="home__form">
        <div className="home__form__container">{travelForm}</div>
      </form>
      <div className="home__results">
        <div className="flight__options">{flightOptions}</div>
      </div>
    </section>
  );
};
