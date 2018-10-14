/* eslint-env node, jest, browser */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { shallow } from 'enzyme';

import App from '../App.jsx';

it('renders without crashing', () => {
  shallow(<App />);
});
