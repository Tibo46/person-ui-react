import React from 'react';

import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventNoteIcon from '@material-ui/icons/EventNote';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import Link from '../../Link';

const drawerWidth = 87;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listButton: {
      padding: '0',
    },
    listItemLink: {
      display: 'flex',
      color: 'rgba(0,0,0,0.84)',
      padding: '1rem 2rem 1rem 0',
      alignItems: 'center',
      width: '100%',
    },
    listItemIcon: {
      width: drawerWidth,
      display: 'flex',
    },
    listIcon: {
      flexGrow: 1,
    },
  })
);

const Menu: React.FC<{ onLinkClicked?: any }> = ({ onLinkClicked }) => {
  const classes = useStyles();

  return (
    <>
      <List>
        <ListItem className={classes.listButton} button key="persons">
          <Link
            href="/employees"
            className={classes.listItemLink}
            onClick={() => {
              onLinkClicked && onLinkClicked();
            }}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <EventNoteIcon className={classes.listIcon} />
            </ListItemIcon>
            <ListItemText primary="All Employees" />
          </Link>
        </ListItem>
        <ListItem className={classes.listButton} button key="createEmployee">
          <Link
            href="/employees/add"
            className={classes.listItemLink}
            onClick={() => {
              onLinkClicked && onLinkClicked();
            }}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <EventAvailableIcon className={classes.listIcon} />
            </ListItemIcon>
            <ListItemText primary="Add Employee" />
          </Link>
        </ListItem>
      </List>
    </>
  );
};

export default Menu;
