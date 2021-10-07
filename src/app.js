import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';

// Styles
import { colors } from './styles/index';

// Navigator
import Routes from './routes';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.main} />
      <Routes />
    </>
  );
};

export default App;
