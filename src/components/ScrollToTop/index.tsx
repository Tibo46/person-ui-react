import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

class ScrollToTop extends React.Component<RouteComponentProps> {
  public componentDidMount() {
    window.scrollTo(0, 0);
  }

  public componentDidUpdate(prevProps: RouteComponentProps) {
    if (prevProps.location && this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  public render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
