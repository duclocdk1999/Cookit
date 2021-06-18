import { all } from 'redux-saga/effects';
// import globalSaga from 'containers/Landers/saga';
// import homeSaga from 'containers/Home/saga';
// import {
//   productDetailSaga,
//   relateProductSaga,
// } from 'containers/ProductDetail/saga';
// import categorySaga from 'containers/Categories/saga';
// import searchSaga from 'containers/Search/saga';
// import authenSaga from 'containers/Authentication/saga';

// import checkoutSaga from 'containers/Checkout/saga';
// import accountSaga from 'containers/Account/saga';
// import membershipSaga from 'containers/Membership/saga';
// import modalsSaga from 'containers/Modals/saga';
// import promotionSaga from 'containers/Promotion/saga';
import loginSaga from '../containers/LoginScreen/saga'
import homescreenSaga from '../containers/HomeScreen/saga'

export default function* rootSaga() {
  yield all([
      loginSaga(),
      homescreenSaga(),
    // globalSaga(),
    // homeSaga(),
    // productDetailSaga(),
    // relateProductSaga(),
    // searchSaga(),
    // relateProductSaga(),
    // categorySaga(),
    // authenSaga(),
    // checkoutSaga(),
    // accountSaga(),
    // membershipSaga(),
    // modalsSaga(),
    // promotionSaga(),
  ]);
}
