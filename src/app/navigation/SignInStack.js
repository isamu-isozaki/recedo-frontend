/**
 * Author: Isamu Isozaki
 */
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar';

import Settings from '../screens/Settings';
import Dashboard from '../screens/Dashboard';
import SendNotification from '../screens/Dashboard/SendNotification';

import Mail from '../screens/Mail';
import EmailSettings from 'app/screens/Settings/EmailSettings';
import TranslationSettings from 'app/screens/Settings/TranslationSettings';
import ClientEmailSettings from 'app/screens/Settings/ClientEmailSettings';

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
          <Route path='/setting'>
            <Settings/>
          </Route>
          <Route path='/mail'>
            <Mail/>
          </Route>
          <Route path='/notification'>
            <SendNotification/>
          </Route>
          <Route path='/setting-1/email-settings'>
            <EmailSettings/>
          </Route>
          <Route path='/setting-1/translation-settings'>
            <TranslationSettings/>
          </Route>
          <Route path='/setting-1/client-email-settings'>
            <ClientEmailSettings/>
          </Route>
        </Switch></div>
    </BrowserRouter>
  );
}


export default SignInStack;
