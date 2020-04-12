import React from 'react';
import { useAsync } from 'react-async';
import Typography from '@material-ui/core/Typography';
import { searchPersons, Person } from '../../services/persons';
import Loader from '../../components/Loader';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '../Link';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemAvatar, Avatar } from '@material-ui/core';

const useStyles = makeStyles({
  loader: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    width: '30px',
    height: '30px',
  },
  dialogContent: {
    minHeight: '135px',
    paddingTop: '1rem',
  },
  employee: {
    display: 'flex',
    width: '100%',
  },
  inline: {
    display: 'inline',
  },
});

const Search = () => {
  const classes = useStyles();
  const [filter, setFilter] = React.useState('');
  const [open, setOpen] = React.useState(false);

  // @ts-ignore
  const personsResult = useAsync({
    promiseFn: open && filter ? searchPersons : false,
    query: {
      search: filter,
    },
    watch: filter,
  });

  const handleClose = () => {
    setFilter('');
    personsResult.setData([]);
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={(event) => setOpen(true)}>
        <SearchIcon />
      </IconButton>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="search-dialog-title"
      >
        {personsResult.isLoading && (
          <div className={classes.loader}>
            <Loader />
          </div>
        )}
        <DialogTitle id="search-dialog-title">Search</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            autoComplete="off"
            fullWidth={true}
            variant="outlined"
            label="Search by employee or group name"
            value={filter}
            name="filter"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
          <List>
            {filter &&
              (personsResult.data && personsResult.data.length > 0 ? (
                personsResult.data.map((person: Person) => (
                  <ListItem button alignItems="flex-start" key={`person-${person.id}`}>
                    <Link
                      href={`/employees/details/${person.id}`}
                      className={classes.employee}
                      onClick={handleClose}
                    >
                      <ListItemAvatar>
                        <Avatar alt={person.name} src={person.photo} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={person.name}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              {person.group?.name}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </Link>
                  </ListItem>
                ))
              ) : (
                <Typography className={`no-data`} id="no-data">
                  No employee found
                </Typography>
              ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} id="dialog-search-close" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Search;
