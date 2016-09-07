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
        title="Form Validation for reactstrap"
        defaultTitle="Form Validation for reactstrap"
        meta={[
            {"name": "description", "content": "React Block UI - easy to use form validation for reactstrap"},
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
