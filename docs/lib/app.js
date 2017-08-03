import 'bootstrap-css';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { createHistory } from 'history';
import { Router, RouterContext, match, useRouterHistory, createMemoryHistory } from 'react-router';
import routes from './routes';
import Helmet from 'react-helmet';

// Client render (optional):
if (typeof document !== 'undefined') {
  const history = useRouterHistory(createHistory)({ basename: window.basename });
  const outlet = document.getElementById('app');
  ReactDOM.render(<Router onUpdate={() => window.scrollTo(0, 0)} history={history} routes={routes} />, outlet)
}

// Exported static site renderer:
export default (locals, callback) => {
  const basename = locals.basename.substr(0, locals.basename.length - 1);
  match({ routes, location: locals.path, basename }, (error, redirectLocation, renderProps) => {
    var url;

    if (redirectLocation && redirectLocation.pathname) {
      url = redirectLocation.pathname;
      callback(null, `<!DOCTYPE html>
      <html>
      <head><link rel="canonical" href="${basename}${url}"/>
      <meta http-equiv="content-type" content="text/html; charset=utf-8" />
      <meta http-equiv="refresh" content="0;url=${basename}${url}" />
      </head>
      </html>`);
    }
    const body = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
    const head = Helmet.rewind();
    let markup = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          ${head.title.toString()}
          ${head.meta.toString()}
          <link rel=icon href="${basename}/assets/favicon.ico">
          <link rel="stylesheet" href="${basename}/assets/style.css"/>
          <link rel="stylesheet" href="${basename}/assets/docs.css"/>
        </head>
        <body>
          <div id="app">${body}</div>
          <script src="${basename}/assets/prism.js" data-manual></script>
          <script>window.basename = '${basename}';</script>
          <script src="${basename}/bundle.js"></script>
        </body>
      </html>`;
    callback(null, markup);
  });
};
