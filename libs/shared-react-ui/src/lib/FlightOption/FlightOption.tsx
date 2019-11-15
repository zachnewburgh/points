import React from 'react';
import { Card } from '@material-ui/core';
import './FlightOption.scss';

interface Props {
  name: string;
  itinerary: string;
  points: number;
}

export default (props: Props) => {
  const { name, itinerary, points } = props;

  return (
    <Card className="flight">
      <div className="flight__content">
        <div className="flight__content__program">{name}</div>
        <div className="flight__content__itinerary">{itinerary}</div>
        <div className="flight__content__points">{points}</div>
      </div>
    </Card>
  );
};
