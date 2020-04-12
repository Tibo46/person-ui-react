import React from 'react';
import Link from '../../components/Link';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    covid: {
      marginTop: '1rem',
    },
  })
);

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h1">Welcome to Employee Manager</Typography>
      <Typography variant="h2">Manage your employees easily</Typography>
      <Typography variant="body1">
        You can use the search button on the top right corner to look for any specific employee or
        group of employees.
        <br />
        To see all of them, use the <Link href="/employees">Employee page</Link>.
        <br />
        If you have a new hire, don't forget to add him/her into the system via the{' '}
        <Link href="/employees/add">Employee Create page</Link>!
      </Typography>
      <Typography variant="body2" className={classes.covid}>
        Don't forget to <Link href="https://www.gov.uk/coronavirus">stay home</Link>!
      </Typography>
    </div>
  );
};

export default Home;
