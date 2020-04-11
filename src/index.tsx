import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import getClientConfig from './utils/clientConfig';

async function prepareEnv() {
  window.ENV_DATA = getClientConfig();
}

(async () => {
  await prepareEnv();
  ReactDOM.render(<App />, document.getElementById('root'));
})();
