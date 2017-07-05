/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';


function Html({ content, title, assetsMap, state }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="stylesheet" href={assetsMap['main.css']} />
        <title>{title}</title>
      </head>
      <body>
        <div id="root">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <script
          dangerouslySetInnerHTML={{ __html: `window.__APOLLO_STATE__=${JSON.stringify(state)};` }}
          charSet="UTF-8"
        />
        <script src={assetsMap['main.js']} />
      </body>
    </html>
  );
}

Html.propTypes = {
  content: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  assetsMap: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  title: PropTypes.string,
};

Html.defaultProps = {
  title: 'Project App',
};


export default Html;
