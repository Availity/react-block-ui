import React from 'react';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { Alert } from 'reactstrap';
import Footer from './Footer';
import Nav from './Nav';
import createStore from '../examples/ReduxStore';

const store = createStore({});

export default (props) => {
  return (
    <div className="wrapper">
      <Helmet
        titleTemplate="React Block UI - %s"
        title="Block the user from interacting with your UI"
        defaultTitle="Block the user from interacting with your UI"
        meta={[
            {'name': 'description', 'content': 'React Block UI - easy way to block the user from interacting with your UI.'},
            {'property': 'og:type', 'content': 'article'},
        ]}
      />
      <Alert color="warning" className="mb-0 text-center">
        Deprecation Notice: This package is no longer supported. Please switch to <a className="alert-link" href="https://www.npmjs.com/package/@availity/block-ui">@availity/block-ui</a>.
      </Alert>
      <Nav/>
      <Provider store={store}>
        {props.children}
      </Provider>
      <Footer/>
    </div>
  );
};
