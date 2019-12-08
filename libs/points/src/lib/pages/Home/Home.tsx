import React, { ChangeEvent } from 'react';
import { Autocomplete } from '@points/shared-react-ui';
import './Home.scss';
import { airports } from './Airports.constants';
import { FlightOption } from '@points/shared-react-ui';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
  arriving: string;
  departing: string;
  program: string;
  programs: { ids: string[]; entities: Program[] };
  user: any;
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

  const tableHeaders = Object.keys(user.balances).map((key, index) => {
    const program = realPrograms.entities[key];
    return program && <th key={index}>{program.name}</th>;
  });

  const tableBody = points.map((point, index) => (
    <tr key={index}>
      <td>{point.name}</td>
      {point.children.map((child, idx) => (
        <td key={idx}>{child}</td>
      ))}
    </tr>
  ));

  return (
    <section className="home">
      <table>
        <thead>
          <tr>
            <th />
            {tableHeaders}
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>

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
