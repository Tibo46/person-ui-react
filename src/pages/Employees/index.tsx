import React from 'react';
import { useAsync } from 'react-async';
import Typography from '@material-ui/core/Typography';
import { searchPersons, Person } from '../../services/persons';
import Loader from '../../components/Loader';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { TextField, CardMedia, makeStyles, Theme, createStyles } from '@material-ui/core';
import Link from '../../components/Link';
import NoPhoto from '../../images/no-photo.jpg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      marginBottom: '2rem',
    },
    photo: {
      minHeight: '300px',
      objectPosition: 'top',
    },
  })
);

const Employees = () => {
  const classes = useStyles();
  const [filter, setFilter] = React.useState('');

  // @ts-ignore
  const personsResult = useAsync({
    promiseFn: searchPersons,
    query: {
      search: filter,
    },
    watch: filter,
  });

  return (
    <>
      <Typography variant="h1">All your employees</Typography>
      <TextField
        className={classes.search}
        autoComplete="off"
        fullWidth={true}
        variant="outlined"
        label="Start typing to filter employees"
        value={filter}
        name="filter"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />

      <div className={`container`}>
        <Grid container={true} spacing={1}>
          {personsResult.isLoading ? (
            <Loader />
          ) : personsResult.data && personsResult.data.length > 0 ? (
            personsResult.data.map((person: Person, index: number) => (
              <Grid item={true} key={`party-${index}`} xl={3} md={4} sm={6} xs={12}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      className={classes.photo}
                      component="img"
                      alt="Contemplative Reptile"
                      height="140"
                      image={person.photo ? person.photo : NoPhoto}
                      title="Contemplative Reptile"
                    />
                    <Link href={`employees/details/${person.id}`}>
                      <CardContent>
                        <Typography gutterBottom variant="h2">
                          {person.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {person.group?.name}
                        </Typography>
                      </CardContent>
                    </Link>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography className={`no-data`}>
              There is no employee yet. Please add a new one.
            </Typography>
          )}
        </Grid>
      </div>
    </>
  );
};

export default Employees;
