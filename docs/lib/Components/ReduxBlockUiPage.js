/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Helmet from 'react-helmet';

import ReduxBlockUiExample from '../examples/ReduxBlockUi';
const ReduxBlockUiExampleSource = require('!!raw!../examples/ReduxBlockUi.js');
const ReduxMiddlewareSource = require('!!raw!../examples/ReduxStore');

export default function ReduxBlockUi  () {
  return (
    <div>
      <Helmet title="ReduxBlockUi" />
      <h3>ReduxBlockUi</h3>
      <p>
        This is an advanced feature which is opinionated to work specifically with react-redux. It involves a little more
        setup as it depends on middleware being used in the redux store. The middleware is provided and only needs to be
        registered (see below).
      </p>
      <p>
        Notice the import is coming from a separate file directly; <code>import ReduxBlockUi from 'react-block-ui/redux'</code>.
        This is done to keep the standard library light for the developers who only want <code>BlockUi</code> and do
        not use redux and/or do not want <code>ReduxBlockUi</code>.
      </p>
      <div className="docs-example">
        <ReduxBlockUiExample />
      </div>
      <pre>
        <PrismCode className="language-jsx">
          {ReduxBlockUiExampleSource}
        </PrismCode>
      </pre>
      <h4>Properties</h4>
      <p>
        <code>block</code> and <code>unblock</code> are the main props here, <code>blocking</code> is just a passthrough
        to allow you to force the blocking UI to show. Both <code>block</code> and <code>unblock</code> props accept a
        string which will be compared to the redux action's type, a RegExp which will be <code>test</code>ed against
        the redux action's type. You can all pass a function which will be executed passing the entire action. The function
        must return <code>true</code> for the block or unbock to happend (depending on which prop the function is passed to).
        Finally, you can pass an array containing any combination of those things.
      </p>
      <pre>
        <PrismCode className="language-jsx">
{`ReduxBlockUi.propTypes = {
  blocking: PropTypes.bool,
  block: PropTypes.oneOfType([
    PropTypes.instanceOf(RegExp),
    PropTypes.string,
    PropTypes.array,
    PropTypes.func,
  ]),
  unblock: PropTypes.oneOfType([
    PropTypes.instanceOf(RegExp),
    PropTypes.string,
    PropTypes.array,
    PropTypes.func,
  ]),
  onChange: PropTypes.func,
};`}
        </PrismCode>
      </pre>

      <h3>BlockUiMiddleware</h3>
      <p>
        This is the middleware piece which is key to allowing <code>ReduxBlockUi</code> to work the way it does. Here
        is an example of how you might apply the middleware and where to import it from.
      </p>
      <pre>
        <PrismCode className="language-jsx">
          {ReduxMiddlewareSource}
        </PrismCode>
      </pre>
    </div>
  );
}
