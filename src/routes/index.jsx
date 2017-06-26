import React from 'react';
import { Route, Switch } from 'react-router';

import {
  IndexPage,
} from '../pages';

const Routes = props => (
  <Switch>
    <Route exact path="/" render={() => <IndexPage {...props} />} />
  </Switch>
);

Routes.propTypes = {
  isMobile: React.PropTypes.bool,
};

Routes.defaultProps = {
  isMobile: false,
};

export default {
  Routes,
};
