/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { PrismCode } from 'react-prism';
import Helmet from 'react-helmet';

import BlockUiExample from '../examples/BlockUi';
import BlockUiCustomLoaderExample from '../examples/BlockUiCustomLoader';
import BlockUiCustomMessageExample from '../examples/BlockUiCustomMessage';
import BlockUiNoChildrenExample from '../examples/BlockUiNoChildren';
import BlockUiKeepInViewExample from '../examples/BlockUiKeepInView';
import BlockUiFocusExample from '../examples/BlockUiFocus';
const BlockUiExampleSource = require('!!raw!../examples/BlockUi.js');
const BlockUiCustomLoaderExampleSource = require('!!raw!../examples/BlockUiCustomLoader.js');
const BlockUiCustomMessageExampleSource = require('!!raw!../examples/BlockUiCustomMessage.js');
const BlockUiNoChildrenExampleSource = require('!!raw!../examples/BlockUiNoChildren.js');
const BlockUiKeepInViewExampleSource = require('!!raw!../examples/BlockUiKeepInView.js');
const BlockUiFocusExampleSource = require('!!raw!../examples/BlockUiFocus.js');

export default function BlockUiPage() {
  return (
    <div>
      <Helmet title="BlockUi" />
      <h3>BlockUi</h3>
      <p>
        This is the basic ability. Wrap a section with the <code>BlockUi</code> component and set the
        <code>blocking</code> prop to <code>true</code> to block the UI/children (and show the loader) or
        <code>false</code> to allow user interaction with the UI/children.
      </p>
      <div className="docs-example">
        <BlockUiExample />
      </div>
      <pre>
        <PrismCode className="language-jsx">
          {BlockUiExampleSource}
        </PrismCode>
      </pre>

      <h4>Properties</h4>
      <p>
        <code>blocking</code> is the main props here, allowing you to show the blocking UI. When it is <code>true</code>
        the blocking UI will be shown, when it is <code>false</code> the blocking UI will not be shown. For the rest of
        the props, see their examples/demos below.
      </p>
      <pre>
        <PrismCode className="language-jsx">
{`BlockUi.propTypes = {
  blocking: PropTypes.bool,
  keepInView: PropTypes.bool,
  children: PropTypes.node,
  renderChildren: PropTypes.bool, // default to true
  className: PropTypes.string,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  loader: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
  tag: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};`}
        </PrismCode>
      </pre>

      <h3>Custom Loading Message</h3>
      <p>
        You can provide a message which will appear above the loading indicate by using the <code>message</code> prop.
      </p>
      <div className="docs-example">
        <BlockUiCustomMessageExample />
      </div>
      <pre>
        <PrismCode className="language-jsx">
          {BlockUiCustomMessageExampleSource}
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
        Unlike other block ui libraries, you cannot tab into a blocked area. Just try to trigger a button while
        blocking. Focus management also is applied. If the active focus was on an element within the blocked area, it
        will be added back to the element when blocking stops. If the user changes focus during blocking, it will not
        interrupt their flow.
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
        Setting the <code>renderChildren</code> prop to <code>false</code> will prevent the children from rendering
        while blocking. This is useful when the children depend on information which is still loading and would provide
        a poor user experience if rendered without the data which is still being requested/loading.
      </p>
      <div className="docs-example">
        <BlockUiNoChildrenExample />
      </div>
      <pre>
        <PrismCode className="language-jsx">
          {BlockUiNoChildrenExampleSource}
        </PrismCode>
      </pre>

      <h3>Keep the loader (and message) in view</h3>
      <p>
        If you have a large/long section which you are blocking, you may notice that the loader/message isn't always in
        the viewport and thus is not visible to the user. To help with this, you can pass the <code>keepInView</code>
        prop. When <code>keepInView</code> is true, the loader will center itself within the part of the blocked container
        which is in the viewport. Note: This only affect vertical scrolling.
        Click the "Toggle Block" button in the example below and scroll down.
      </p>
      <div className="docs-example">
        <BlockUiKeepInViewExample />
      </div>
      <pre>
        <PrismCode className="language-jsx">
          {BlockUiKeepInViewExampleSource}
        </PrismCode>
      </pre>
    </div>
  );
}
