/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Helmet from 'react-helmet';

import LoaderExample from '../examples/Loader';
const LoaderExampleSource = require('!!raw!../examples/Loader.js');

export default function LoaderPage() {
  return (
    <div>
      <Helmet title="Loader" />
      <h3>Loader</h3>
      <p>
        This is a little bonus, it is the raw loader which appears when blocking (The 3 green circles). It currently
        lives within this project and thus is exposed for you to use. Please note that this may eventually (though, unlikely)
        be moved to it's own project
      </p>
      <div className="docs-example">
        <LoaderExample />
      </div>
      <pre>
        <PrismCode className="language-jsx">
          {LoaderExampleSource}
        </PrismCode>
      </pre>
    </div>
  );
}
