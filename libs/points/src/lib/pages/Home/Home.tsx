import { Program, User } from '@points/shared-models';
import { ProgramEntities } from '@points/shared-react-state';
import { Autocomplete, FlightOption } from '@points/shared-react-ui';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import React, { ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { BalancesTable } from '../../components/BalancesTable';
import { airports } from './Airports.constants';
import './Home.scss';

interface Props extends RouteComponentProps {
  arriving: string;
  departing: string;
  program: string;
  programs: { ids: string[]; entities: ProgramEntities };
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

  let table: JSX.Element;
  if (realPrograms.ids.length) {
    table = (
      <BalancesTable
        balances={user.balances}
        programs={realPrograms.entities}
      />
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
