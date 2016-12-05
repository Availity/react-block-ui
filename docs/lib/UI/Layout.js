import React from 'react';
import Helmet from 'react-helmet';
import Footer from './Footer';
import Nav from './Nav';
import { Provider } from 'react-redux'
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
            {"name": "description", "content": "React Block UI - easy way to block the user from interacting with your UI."},
            {"property": "og:type", "content": "article"}
        ]}/>
      <Nav/>
      <Provider store={store}>
        {props.children}
      </Provider>
      <Footer/>
    </div>
  );
};
