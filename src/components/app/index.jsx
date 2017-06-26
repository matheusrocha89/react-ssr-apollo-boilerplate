import React from 'react';
import PropTypes from 'prop-types';

import Routes from '../../routes';

const App = ({ isMobile }) => (
  <div className="App">
    <Routes isMobile={isMobile} />
  </div>
);

App.propTypes = {
  isMobile: PropTypes.bool,
};

App.defaultProps = {
  isMobile: false,
};

export default App;
