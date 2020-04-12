import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loader: {
      position: 'relative',
      height: '150px',
      width: '150px',
      maxWidth: '100%',
      maxHeight: '100%',
      background: '#EDF0F3',
      borderRadius: '50%',
      margin: '0 auto',
      boxShadow:
        'inset -7px -7px 25px 0 rgba(237, 240, 243, 0.5), inset 7px 7px 25px 0 rgba(0, 0, 0, 0.5)',
      '&:before': {
        content: "''",
        position: 'absolute',
        height: '130px',
        width: '130px',
        maxWidth: 'calc(100% - 10px)',
        maxHeight: 'calc(100% - 10px)',
        background: '#EDF0F3',
        borderRadius: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        boxShadow: '-7px -7px 25px 0 rgba(237, 240, 243, 0.9), 7px 7px 25px 0 rgba(0, 0, 0, 0.3)',
      },
      '&:after': {
        content: "''",
        position: 'absolute',
        height: '150px',
        width: '150px',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '15px solid #EF4F84',
        borderRight: 'solid 15px transparent',
        borderTop: 'solid 15px transparent',
        borderLeft: 'solid 15px transparent',
        animation: '$spin 0.5s infinite linear',
      },
    },

    '@keyframes spin': {
      '0%': {
        transform: 'translate(-50%, -50%) rotate(0deg)',
      },
      '100%': {
        transform: 'translate(-50%, -50%) rotate(360deg)',
      },
    },
  })
);

const Loader: React.FC = () => {
  const classes = useStyles();

  return <div className={classes.loader} />;
};

export default Loader;
