import React, { ChangeEvent } from 'react';
import { Autocomplete } from '@points/shared-react-ui';
import './Home.scss';
import { airports } from './Airports.constants';
import { FlightOption } from '@points/shared-react-ui';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
  arriving: string;
  departing: string;
  setArriving: (airportName: string) => void;
  setDeparting: (airportName: string) => void;
}

interface Airport {
  name: string;
  code: string;
}

interface Program {
  name: string;
}

export default (props: Props) => {
  const { departing, arriving, setArriving, setDeparting } = props;

  const programs = [
    { name: 'Aeroplan' },
    { name: 'United' },
    { name: 'Delta' },
    { name: 'Southwest' }
  ];

  const getAirportLabel = ({ name, code }: Airport) => `${name} (${code})`;

  const handleDepartureChange = (_: ChangeEvent, { code }: Airport) =>
    setDeparting(code);

  const handleArrivalChange = (_: ChangeEvent, { code }: Airport) =>
    setArriving(code);

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
      />
    ));

  return (
    <section className="home">
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
