import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/es/integration/react';
import storageSession from 'redux-persist/lib/storage/session';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

const persistConfig = {
    key: 'root',
    storage: storageSession
};
const middleware = [thunk];
(process.env.NODE_ENV.trim() !== 'production') && middleware.push(createLogger());
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middleware));
store.subscribe(() => store.getState());
const persistor = persistStore(store);
ReactDOM.render(
    <Provider store = {store}>
        <PersistGate persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>, document.getElementById('root'));
// registerServiceWorker(); //no offline
