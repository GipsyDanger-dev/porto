import { Writable } from 'node:stream';
import { renderToPipeableStream, renderToStaticMarkup } from 'react-dom/server';
import App from './App';

export const render = () => new Promise((resolve, reject) => {
  let renderError;
  // Resolve lazy modules first, then emit markup without Suspense replacement scripts.
  const output = new Writable({
    write(chunk, encoding, callback) { callback(); },
  });
  const { pipe, abort } = renderToPipeableStream(<App />, {
    onAllReady() { pipe(output); },
    onShellError(error) { clearTimeout(timeout); reject(error); },
    onError(error) { renderError = error; },
  });
  const timeout = setTimeout(() => {
    abort();
    reject(new Error('Static rendering did not finish within 30 seconds.'));
  }, 30000);
  output.on('finish', () => {
    clearTimeout(timeout);
    if (renderError) reject(renderError);
    else {
      try { resolve(renderToStaticMarkup(<App />)); }
      catch (error) { reject(error); }
    }
  });
  output.on('error', error => {
    clearTimeout(timeout);
    reject(error);
  });
});
