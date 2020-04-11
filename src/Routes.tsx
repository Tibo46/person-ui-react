import React from 'react';
import * as H from 'history';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import Home from './pages/Home';
import Employees from './pages/Employees';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

export interface RouteUrl extends H.Location {
  query: Record<string, string>;
}

export interface RouteProps<Params extends { [K in keyof Params]?: string } = {}>
  extends Omit<RouteComponentProps<Params>, 'location'> {
  url: RouteUrl;
}

const Routes: React.FC = () => {
  return (
    <Switch>
      <Layout>
        <Route
          exact={true}
          path="/"
          render={() => (
            <RenderPage key="Home">
              <Home />
            </RenderPage>
          )}
        />
        <Route
          exact={true}
          path="/employees"
          render={() => (
            <RenderPage key="Employees">
              <Employees />
            </RenderPage>
          )}
        />
      </Layout>
    </Switch>
  );
};

const RenderPage: React.FC = ({ children }) => {
  let content = children;
  return <ScrollToTop>{content}</ScrollToTop>;
};

export default Routes;
