import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import Home from './Home';
import BlockUiPage from './Components/BlockUiPage';
import ReduxBlockUiPage from './Components/ReduxBlockUiPage';
import NotFound from './NotFound';
import Components from './Components';
import UI from './UI';

const routes = (
  <Route path="/" component={ UI.Layout }>
    <IndexRoute component={ Home } />
    <Route path="/components/" component={Components}>
      <IndexRedirect to="blockui/" />
      <Route path="blockui/" component={ BlockUiPage } />
      <Route path="reduxblockui/" component={ ReduxBlockUiPage } />
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
