import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import './index.css';
import App from './App';
import configureStore from './store';
import { csrfFetch, restoreCSRF } from './store/csrf';
import * as sessionActions from './store/session';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
    restoreCSRF();
    window.csrfFetch = csrfFetch;
    window.store = store;
    window.sessionActions = sessionActions;
}

function Root() {
    return (
        <Provider store={store}>
            <HelmetProvider>
                <BrowserRouter>
                    <App>
                        <Helmet>
                            <title>Squadron</title>
                        </Helmet>
                    </App>
                </BrowserRouter>
            </HelmetProvider>
        </Provider>
    );
}

ReactDOM.hydrate(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById('root')
);
