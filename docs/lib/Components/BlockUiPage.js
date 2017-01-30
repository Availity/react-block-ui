/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Helmet from 'react-helmet';

import BlockUiExample from '../examples/BlockUi';
const BlockUiExampleSource = require('!!raw!../examples/BlockUi.js');
import BlockUiCustomLoaderExample from '../examples/BlockUiCustomLoader';
const BlockUiCustomLoaderExampleSource = require('!!raw!../examples/BlockUiCustomLoader.js');
import BlockUiNoChildrenExample from '../examples/BlockUiNoChildren';
const BlockUiNoChildrenExampleSource = require('!!raw!../examples/BlockUiNoChildren.js');
import BlockUiFocusExample from '../examples/BlockUiFocus';
const BlockUiFocusExampleSource = require('!!raw!../examples/BlockUiFocus.js');

export default class BlockUiPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="BlockUi" />
        <h3>BlockUi</h3>
        <p>
          This is the basic ability. Wrap a section with the <code>BlockUi</code> component and set the <code>blocking</code>
          prop to <code>true</code> to block the UI/children (and show the loader) or <code>false</code> to allow user interaction
          with the UI/children.
        </p>
        <div className="docs-example">
          <BlockUiExample />
        </div>
        <pre>
          <PrismCode className="language-jsx">
            {BlockUiExampleSource}
          </PrismCode>
        </pre>

        <h3>Using external/custom loader</h3>
        <p>
          You do not have to use the default loader that comes with this library, you can pass anything you want. Pass JSX
          to render or a component to the <code>loader</code> prop to use it. In the exmaple below, we are using the fancy
          {' '}<a href="https://github.com/ConnorAtherton/loaders.css">Loaders.css</a> via the convenient{' '}
          <a href="https://github.com/jonjaques/react-loaders">react-loaders</a> library. Use the select input to change
          the loader you see.
        </p>
        <div className="docs-example">
          <BlockUiCustomLoaderExample />
        </div>
        <pre>
          <PrismCode className="language-jsx">
            {BlockUiCustomLoaderExampleSource}
          </PrismCode>
        </pre>

        <h3>Focus / Keyboard Navigation</h3>
        <p>
          Unlike other block ui libraries, you cannot tab into a blocked area. Just try to trigger a button while blocking. Focus management also is applied. If the active focus was on an element within the blocked area, it will be added back to the element when blocking stops. If the user changes focus during blocking, it will not interrupt their flow.
        </p>
        <div className="docs-example">
          <BlockUiFocusExample />
        </div>
        <pre>
          <PrismCode className="language-jsx">
            {BlockUiFocusExampleSource}
          </PrismCode>
        </pre>

        <h3>Do not render children while blocking</h3>
        <p>
          Setting the <code>renderChildren</code> prop to <code>false</code> will prevent the children from rendering while
          blocking. This is useful when the children depend on information which is still loading and would provide a poor
          user experience if rendered without the data which is still being requested/loading.
        </p>
        <div className="docs-example">
          <BlockUiNoChildrenExample />
        </div>
        <pre>
          <PrismCode className="language-jsx">
            {BlockUiNoChildrenExampleSource}
          </PrismCode>
        </pre>
      </div>
    );
  }
}
