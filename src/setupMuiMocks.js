import React from 'react';

// To remove all the numbers from the generated classNames
// so it won't break the snapshots every time we add/remove an element
jest.mock('@material-ui/styles/createGenerateClassName/createGenerateClassName', () => {
  const mockCreateGenerateClassName = () => {
    return (rule, styleSheet) => {
      if (styleSheet && styleSheet.options.classNamePrefix) {
        return `${styleSheet.options.classNamePrefix}-${rule.key}`;
      }

      return rule.key;
    };
  };

  return mockCreateGenerateClassName;
});

jest.mock('@material-ui/core/Card', () => (props) => <mui-card {...props} />);
jest.mock('@material-ui/core/CardContent', () => (props) => <mui-card-content {...props} />);
jest.mock('@material-ui/core/CardActionArea', () => (props) => <mui-card-action {...props} />);
jest.mock('@material-ui/core/CardHeader', () => ({ children, title, ...props }) => (
  <mui-card-header {...props}>
    {title}
    {children}
  </mui-card-header>
));
jest.mock('@material-ui/core/AppBar', () => (props) => <mui-app-bar {...props} />);
jest.mock('@material-ui/core/Toolbar', () => (props) => <mui-toolbar {...props} />);
jest.mock('@material-ui/core/Drawer', () => (props) => <mui-drawer {...props} />);

jest.mock('@material-ui/core/ListItem', () => (props) => <mui-list-item {...props} />);
jest.mock('@material-ui/core/ListItemText', () => (props) => <mui-list-item-text {...props} />);
jest.mock('@material-ui/core/ListItemIcon', () => (props) => <mui-list-item-icon {...props} />);

jest.mock('@material-ui/core/Grid', () => (props) => <mui-grid {...props} />);

jest.mock('@material-ui/core/Button', () => (props) => <mui-button {...props} />);
jest.mock('@material-ui/core/IconButton', () => (props) => <mui-icon-button {...props} />);
jest.mock('@material-ui/icons/Search', () => (props) => <mui-icon-search {...props} />);

jest.mock('@material-ui/core/Dialog', () => ({ open, ...props }) =>
  open ? <mui-dialog open={open} {...props} /> : null
);
jest.mock('@material-ui/core/DialogContent', () => (props) => <mui-dialog-content {...props} />);
jest.mock('@material-ui/core/DialogActions', () => (props) => <mui-dialog-actions {...props} />);
