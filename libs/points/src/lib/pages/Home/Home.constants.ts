import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: '400px',
      margin: '1% 3%'
    }
  })
);

export const cards = [
  {
    img: {
      alt: 'Grassy moutain with road',
      url:
        'https://images.pexels.com/photos/2082949/pexels-photo-2082949.jpeg?cs=srgb&dl=clouds-daylight-environment-2082949.jpg&fm=jpg',
      title: 'Plan a trip'
    },
    title: 'Plan a trip',
    body: `Identify the most efficient use of your hard-earned points and
        discover routes that would maximize their value.`,
    action: 'Trip'
  },
  {
    img: {
      alt: 'Foreign cash',
      url:
        'https://images.pexels.com/photos/69866/pexels-photo-69866.jpeg?cs=srgb&dl=boarding-pass-euro-ticket-69866.jpg&fm=jpg',
      title: 'Review your balances'
    },
    title: 'Review your balances',
    body: `Check out your program balances and learn what they're worth
        across every available partner program.`,
    action: 'Programs'
  },
  {
    img: {
      alt: 'Wallet with money',
      url:
        'https://images.pexels.com/photos/929288/pexels-photo-929288.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      title: 'Earn a bonus'
    },
    title: 'Earn a bonus',
    body: `Explore credit card offerings to view valuable benefits and
        fast-track your point earnings.`,
    action: 'Cards'
  },
  {
    img: {
      alt: 'Journal with glasses',
      url:
        'https://images.pexels.com/photos/269923/pexels-photo-269923.jpeg?cs=srgb&dl=adventure-antique-blank-269923.jpg&fm=jpg',
      title: 'Read the blog'
    },
    title: 'Read the blog',
    body: `Be the first to find out about program changes, transfer
        bonuses, and travel musts.`,
    action: 'Blog'
  }
];
