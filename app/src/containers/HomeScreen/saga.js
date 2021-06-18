import { url } from '../../utils/global-constant'
import request from '../../utils/request'
import { call, put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import * as constants from './constants';
import { getAccessToken } from '../../utils/request'


function* onLoadCart() {
    requestUrl = url + '/cart/getListRecipeInCart'
    try {
        const res = yield call(request, requestUrl, {
            method: 'GET',
            headers: {
                'Authorization': getAccessToken()
            }
        });
        console.log(res)
        yield put(actions.loadCartSuccess(res))
    } catch(err) {
        alert(err)
        yield put(actions.loadCartFailed(err))
    }
}


function* onLoadCartInfo() {
    requestUrl = url + '/cart/getCartInformation'
    try {
        const res = yield call(request, requestUrl, {
            method: 'GET',
            headers: {
                'Authorization': getAccessToken()
            }
        });
        console.log(res)
        yield put(actions.loadCartInfoSuccess(res))
    } catch(err) {
        alert(err)
        yield put(actions.loadCartInfoFailed(err))
    }
}

function* onLoadRecipe() {
    requestUrl = url + '/recipe/allRecipes'
    try {
        const res = yield call(request, requestUrl, {
            method: 'GET',
        });
        console.log(res.recipes)
        yield put(actions.loadRecipeSuccess(res.recipes))
    } catch(err) {
        alert(err)
        yield put(actions.loadRecipeFailed(err))
    }
}

function* onLoadPopularRecipe() {
    requestUrl = url + '/recipe/popularRecipes'
    try {
        const res = yield call(request, requestUrl, {
            method: 'GET',
        });
        console.log("Popular:")
        console.log(res.recipes)
        yield put(actions.loadPopularRecipeSuccess(res.recipes))
    } catch(err) {
        alert(err)
        yield put(actions.loadPopularRecipeFailed(err))
    }
}

function* onLoadFavoriteRecipe() {
    requestUrl = url + '/recipe/yourFavoriteRecipes'
    try {
        const res = yield call(request, requestUrl, {
            method: 'GET',
            headers: {
                'Authorization': getAccessToken()
            }
        });
        console.log("Favorite:")
        console.log(res.recipes)
        yield put(actions.loadFavoriteRecipeSuccess(res.recipes))
    } catch(err) {
        alert(err)
        yield put(actions.loadFavoriteRecipeFailed(err))
    }
}

function* onLoadMyRecipe() {
    requestUrl = url + '/recipe/yourRecipes'
    try {
        const res = yield call(request, requestUrl, {
            method: 'GET',
            headers: {
                'Authorization': getAccessToken()
            }
        });
        console.log("My:")
        console.log(res.recipes)
        yield put(actions.loadMyRecipeSuccess(res.recipes))
    } catch(err) {
        alert(err)
        yield put(actions.loadMyRecipeFailed(err))
    }
}

function* onLoadResult(action) {
    requestUrl = url + '/search/recipe/' + action.payload
    try {
        const res = yield call(request, requestUrl, {
            method: 'GET',
            headers: {
                'Authorization': getAccessToken()
            }
        });
        console.log(res.recipes)
        yield put(actions.onHideLoader())
        yield put(actions.onSearchRecipeSuccess(res.recipes ? res.recipes : []))
    } catch(err) {
        alert(err)
        yield put(actions.onHideLoader())
        yield put(actions.onSearchRecipeFailed(err))
    }
}

export default function* homescreenSaga() {
    yield takeLatest(constants.LOAD_CART, onLoadCart)
    yield takeLatest(constants.LOAD_CART_INFO, onLoadCartInfo)
    yield takeLatest(constants.LOAD_RECIPE, onLoadRecipe)
    yield takeLatest(constants.LOAD_POPULAR_RECIPE, onLoadPopularRecipe)
    yield takeLatest(constants.LOAD_FAVORITE_RECIPE, onLoadFavoriteRecipe)
    yield takeLatest(constants.LOAD_MY_RECIPE, onLoadMyRecipe)
    yield takeLatest(constants.LOAD_RESULT, onLoadResult)
}