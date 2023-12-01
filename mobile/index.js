import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name} from '../package.json';

const Main = () => {
    return <App/>;
};

AppRegistry.registerComponent(name, () => Main);
