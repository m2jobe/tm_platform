/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';
import DevTools from '../containers/Root/DevTools';
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase'


export default function configureStore(initialState, history) {
  const firebaseConfig = {
    apiKey: "AIzaSyCEGrB5pNfGqz_dgXCVuNVL_oBHZatf03E",
    authDomain: "tour-monkeys.firebaseapp.com",
    databaseURL: "https://tour-monkeys.firebaseio.com",
    projectId: "tour-monkeys",
    storageBucket: "tour-monkeys.appspot.com",
    messagingSenderId: "740014348124"
  }

  // react-redux-firebase config
  const rrfConfig = {
    userProfile: 'users', // firebase root where user profiles are stored
    attachAuthIsReady: true, // attaches auth is ready promise to store
    firebaseStateName: 'firebase' // should match the reducer name ('firebase' is default)
  }
  // initialize firebase instance
  firebase.initializeApp(firebaseConfig) // <- new to v2.*.*

  // initialize firestore
  // firebase.firestore() // <- needed if using firestore

  // Add reduxReduxFirebase enhancer when making store creator
  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    // reduxFirestore(firebase) // <- needed if using firestore
  )(createStore)

    const logger = createLogger();

    // Build the middleware for intercepting and dispatching navigation actions
    const reduxRouterMiddleware = routerMiddleware(history);

    const middleware = applyMiddleware(thunk, logger, reduxRouterMiddleware);

    const middlewareWithDevTools = compose(
        middleware,
        DevTools.instrument()
    );

    // Add the reducer to your store on the `router` key
    // Also apply our middleware for navigating
    const store = createStoreWithFirebase(rootReducer, initialState, middlewareWithDevTools);

    if (module.hot) {
        module.hot
            .accept('../reducers', () => {
                const nextRootReducer = require('../reducers/index'); // eslint-disable-line global-require

                store.replaceReducer(nextRootReducer);
            });
    }

    store.firebaseAuthIsReady.then(() => {
      console.log('Auth has loaded') // eslint-disable-line no-console
    })
    return store;
}
