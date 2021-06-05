/**
 * Author: Isamu Isozaki
 */
import React from 'react';
import AuthNavigator from './app/navigation/AuthNavigator';
import initApp from './app/config/firebase';

/**
 * Initialize firebase and go to AuthNavigator
 */
function App() {
  initApp();
  return (
    <AuthNavigator/>
  );
}

export default App;
