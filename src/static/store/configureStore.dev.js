/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';
import DevTools from '../containers/Root/DevTools';
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase';

export default function configureStore(initialState, history) {
  const firebaseConfig = {
    apiKey: 'AIzaSyCEGrB5pNfGqz_dgXCVuNVL_oBHZatf03E',
    authDomain: "tour-monkeys.firebaseapp.com",
    databaseURL: "https://tour-monkeys.firebaseio.com",
    storageBucket: "tour-monkeys.appspot.com",
  }
  // react-redux-firebase options
  const config = {
    userProfile: 'users', // firebase root where user profiles are stored
    enableLogging: false, // enable/disable Firebase's database logging
  }


  firebase.initializeApp(firebaseConfig) // <- new to v2.*.*

    const logger = createLogger();

    // Build the middleware for intercepting and dispatching navigation actions
    const reduxRouterMiddleware = routerMiddleware(history);

    const middleware = applyMiddleware(thunk, logger, reduxRouterMiddleware);

    const middlewareWithDevTools = compose(
        middleware,
        DevTools.instrument()
    );


      // Add redux Firebase to compose
      const createStoreWithFirebase = compose(
        reactReduxFirebase(firebase, config)
      )(createStore)

      // Create store with reducers and initial state

    // Add the reducer to your store on the `router` key
    // Also apply our middleware for navigating
    //const store = createStore(rootReducer, initialState, middlewareWithDevTools);
      const store = createStoreWithFirebase(rootReducer, initialState, middlewareWithDevTools)

    if (module.hot) {
        module.hot
            .accept('../reducers', () => {
                const nextRootReducer = require('../reducers/index'); // eslint-disable-line global-require

                store.replaceReducer(nextRootReducer);
            });
    }

    return store;
}
