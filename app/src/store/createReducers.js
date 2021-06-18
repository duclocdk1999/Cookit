import { combineReducers } from 'redux';
import loginReducer from '../containers/LoginScreen/reducer';
import homepageReducer from '../containers/HomeScreen/reducer'
// import globalReducer from 'containers/Landers/reducer';
// import homeReducer from 'containers/Home/reducer';
// import categoryReducer from 'containers/Categories/reducer';
// import productReducer from 'containers/ProductDetail/reducer';
// import searchReducer from 'containers/Search/reducer';
// import authenReducer from 'containers/Authentication/reducer';
// import checkoutReducer from 'containers/Checkout/reducer';
// import accountReducer from 'containers/Account/reducer';
// import membershipReducer from 'containers/Membership/reducer';
// import modalsReducer from 'containers/Modals/reducer';
// import promotionReducer from 'containers/Promotion/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
      login: loginReducer,
      homescreen: homepageReducer,
    // global: globalReducer,
    // home: homeReducer,
    // product: productReducer,
    // search: searchReducer,
    // category: categoryReducer,
    // authen: authenReducer,
    // checkout: checkoutReducer,
    // account: accountReducer,
    // membership: membershipReducer,
    // modals: modalsReducer,
    // promotion: promotionReducer,
  });

  return rootReducer;
}
