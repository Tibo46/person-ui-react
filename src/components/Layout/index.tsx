import React from 'react';
import clsx from 'clsx';

import Link from '../Link';
import Logo from '../../images/logo.png';

import Drawer from '@material-ui/core/Drawer';
import { makeStyles, createStyles, Theme, useMediaQuery } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from './Menu';
import Search from '../Search';

const drawerWidth = 87;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    title: {
      fontSize: '1rem',
      flexGrow: 1,
      '& a': { color: '#fff' },
    },
    searchBtn: {
      position: 'fixed',
      top: '5px',
      right: '5px',
      zIndex: 99,
    },
    homeLink: {
      width: '100%',
      display: 'block',
      textAlign: 'center',
      marginTop: '5px',
    },
    logo: {
      width: '70px',
      borderRadius: '50%',
      padding: '5px',
      background: '#EF4F84',
      boxShadow: 'inset 6px 6px 12px #bf3f6a, inset -6px -6px 12px #ff5f9e',
    },
    drawer: {
      zIndex: theme.zIndex.drawer + 1,
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      transition: 'width .3s ease',
      marginLeft: '10px',
      top: '10px',
      bottom: '10px',
      height: 'auto',
      '&:hover': {
        width: '250px',
        '& > div': {
          width: '250px',
          transition: 'width .3s ease',
        },
      },
      '& > div': {
        width: drawerWidth,
        overflow: 'hidden',
        transition: 'width .3s ease',
        borderRadius: '50px',
        marginLeft: '10px',
        top: '10px',
        bottom: '10px',
        height: 'auto',
        background: '#edf0f3',
        boxShadow: '-6px -6px 12px #bec0c2, 6px 6px 12px #ffffff',
      },
    },
    toolbar: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    container: {
      flexGrow: 1,
      padding: '0rem 4rem 2rem 4rem',
    },
    listButton: {
      padding: '0',
    },
    listItemLink: {
      display: 'flex',
      color: 'rgba(0,0,0,0.84)',
      padding: '1rem 0',
      alignItems: 'center',
    },
    listItemIcon: {
      width: drawerWidth,
      display: 'flex',
    },
    listIcon: {
      flexGrow: 1,
    },
    [theme.breakpoints.down('sm')]: {
      root: {
        flexDirection: 'column',
      },
      container: {
        padding: '0rem 2rem 2rem 2rem',
      },
      mobileHeader: {
        position: 'sticky',
        marginLeft: '10px',
        marginRight: '10px',
        top: '10px',
        zIndex: 999,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '56px',
        background: '#edf0f3',
        boxShadow: '0px 5px 4px #c9cccf, 2px -3px 9px rgba(255, 255, 255, 0.36)',
        padding: '5px 10px',
      },
      mobileBtns: {
        display: 'flex',
      },
      homeLink: {
        marginTop: 0,
        display: 'flex',
      },
      logo: {
        width: '50px',
      },
      profileBtn: {
        position: 'static',
      },
    },
  })
);

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  const [mobileDrawerIsOpen, setMobileDrawerIsOpen] = React.useState(false);

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <div className={classes.root}>
      <header className={classes.mobileHeader}>
        {isMobile && (
          <div className={classes.mobileBtns}>
            <Link href="/" className={classes.homeLink}>
              <img src={Logo} alt="PartyPlannr logo" className={classes.logo} />
            </Link>
            <IconButton
              onClick={() => {
                setMobileDrawerIsOpen(true);
              }}
              className={clsx(classes.menuButton, {
                [classes.hide]: mobileDrawerIsOpen,
              })}
            >
              <MenuIcon />
            </IconButton>
          </div>
        )}
        <div className={classes.searchBtn}>
          <Search />
        </div>
      </header>
      {isMobile ? (
        <Drawer
          anchor="left"
          open={mobileDrawerIsOpen}
          onClose={() => {
            setMobileDrawerIsOpen(false);
          }}
        >
          <Menu
            onLinkClicked={() => {
              setMobileDrawerIsOpen(false);
            }}
          />
        </Drawer>
      ) : (
        <Drawer variant="permanent" className={classes.drawer}>
          <div className={classes.toolbar}>
            <Link href="/" className={classes.homeLink}>
              <img src={Logo} alt="Logo" className={classes.logo} />
            </Link>
          </div>
          <Divider />
          <Menu />
        </Drawer>
      )}
      <main className={classes.container}>{children}</main>
    </div>
  );
};

export default Layout;
