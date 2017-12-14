import React from 'react';
import ReactDOM from 'react-dom';
import { ChatApplication } from './components/ChatApplication';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ChatApplication />, document.getElementById('root'));
registerServiceWorker();
