/**
 * Author: Isamu Isozaki
 */
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar';

import Settings from '../screens/Settings';
import Dashboard from '../screens/Dashboard';
import Wishlist from '../screens/Wishlist';


/**
 * Set up routes to each component
 */
function SignInStack() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Dashboard/>
          </Route>
          <Route path='/settings'>
            <Settings/>
          </Route>
          <Route path='/wishlist'>
            <Wishlist/>
          </Route>
        </Switch></div>
    </BrowserRouter>
  );
}


export default SignInStack;
