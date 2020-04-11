import React from 'react';

import { Link as ReactRouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  link: {
    textDecoration: 'none'
  }
});

interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  tabIndex?: number;
  href: string;
}

const Link: React.FC<IProps> = ({ className, href, children, ...props }) => {
  const classes = useStyles();

  if (/:\/\//.test(href)) {
    return (
      <a {...props} className={`${classes.link} ${className}`} href={href}>
        {children}
      </a>
    );
  } else {
    return (
      <ReactRouterLink {...props} className={`${classes.link} ${className}`} to={href}>
        {children}
      </ReactRouterLink>
    );
  }
};

export default Link;
