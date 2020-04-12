import React from 'react';
import * as H from 'history';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import Home from './pages/Home';
import Employees from './pages/Employees';
import Layout from './components/Layout';
import CreateEmployee from './pages/Employees/Create';
import DetailsEmployee from './pages/Employees/Details';

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
        <Route exact={true} path="/" render={() => <Home />} />
        <Route exact={true} path="/employees" render={() => <Employees />} />
        <Route exact={true} path="/employees/add" render={() => <CreateEmployee />} />
        <Route
          exact={true}
          path="/employees/details/:id"
          render={({ match }: RouteComponentProps<{ id: string }>) => (
            <DetailsEmployee id={match.params.id} />
          )}
        />
      </Layout>
    </Switch>
  );
};

export default Routes;
