import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import ReactChartkick from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
