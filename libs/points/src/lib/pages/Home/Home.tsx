import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button
} from '@material-ui/core';
import { useStyles, cards } from './Home.constants';
import './Home.scss';

export default () => {
  const classes = useStyles({});

  return (
    <section className="home">
      {cards.map((card, index) => (
        <Card className={classes.card} key={index}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={card.img.alt}
              height="140"
              image={card.img.url}
              title={card.img.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {card.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {card.body}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              {card.action}
            </Button>
          </CardActions>
        </Card>
      ))}
    </section>
  );
};
