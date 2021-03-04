import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

import './index.css';
import App from './App';
import configureStore from './store';
import { csrfFetch, restoreCSRF } from './store/csrf';
import * as sessionActions from './store/session';

const store = configureStore();
const client = new ApolloClient({
    uri: 'https://localhost:5000',
    cache: new InMemoryCache(),
});

client
    .query({
        query: gql`
            query users(id:5) {username
            }
        `,
    })
    .then((result) => console.log(result));

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
