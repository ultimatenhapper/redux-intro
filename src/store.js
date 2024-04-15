import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from 'redux-thunk';

import customerReducer from './features/customer/customerSlice';
import accountReducer from './features/account/accountSlice';

const rootReducer = combineReducers({ account: accountReducer, customer: customerReducer})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;