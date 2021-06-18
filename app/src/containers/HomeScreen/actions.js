import * as constant from './constants'


// LOGIN ACTION

export function loadCart() {
  return {
    type: constant.LOAD_CART,
  }
}

export function loadCartSuccess(payload) {
  return {
    type: constant.LOAD_CART_SUCCESS,
    payload
  }
}

export function loadCartFailed(err) {
  return {
    type: constant.LOAD_CART_FAILED,
    err
  }
}

export function loadCartInfo() {
  return {
    type: constant.LOAD_CART_INFO,
  }
}

export function loadCartInfoSuccess(payload) {
  return {
    type: constant.LOAD_CART_INFO_SUCCESS,
    payload
  }
}

export function loadCartInfoFailed(err) {
  return {
    type: constant.LOAD_CART_INFO_FAILED,
    err
  }
}

export function loadRecipe() {
  return {
    type: constant.LOAD_RECIPE,
  }
}

export function loadRecipeSuccess(payload) {
  return {
    type: constant.LOAD_RECIPE_SUCCESS,
    payload
  }
}

export function loadRecipeFailed(err) {
  return {
    type: constant.LOAD_RECIPE_FAILED,
    err
  }
}

export function loadPopularRecipe() {
  return {
    type: constant.LOAD_POPULAR_RECIPE,
  }
}

export function loadPopularRecipeSuccess(payload) {
  return {
    type: constant.LOAD_POPULAR_RECIPE_SUCCESS,
    payload
  }
}

export function loadPopularRecipeFailed(err) {
  return {
    type: constant.LOAD_POPULAR_RECIPE_FAILED,
    err
  }
}

export function loadFavoriteRecipe() {
  return {
    type: constant.LOAD_FAVORITE_RECIPE,
  }
}

export function loadFavoriteRecipeSuccess(payload) {
  return {
    type: constant.LOAD_FAVORITE_RECIPE_SUCCESS,
    payload
  }
}

export function loadFavoriteRecipeFailed(err) {
  return {
    type: constant.LOAD_FAVORITE_RECIPE_FAILED,
    err
  }
}

export function loadMyRecipe() {
  return {
    type: constant.LOAD_MY_RECIPE,
  }
}

export function loadMyRecipeSuccess(payload) {
  return {
    type: constant.LOAD_MY_RECIPE_SUCCESS,
    payload
  }
}

export function loadMyRecipeFailed(err) {
  return {
    type: constant.LOAD_MY_RECIPE_FAILED,
    err
  }
}

export function onSearchRecipe(payload) {
  return {
    type: constant.LOAD_RESULT,
    payload
  }
}

export function onSearchRecipeSuccess(payload) {
  return {
    type: constant.LOAD_RESULT_SUCCESS,
    payload
  }
}

export function onSearchRecipeFailed(err) {
  return {
    type: constant.LOAD_RESULT_FAILED,
    err
  }
}

export function onShowLoader() {
  return {
    type: constant.SHOW_LOADER
  }
}

export function onHideLoader() {
  return {
    type: constant.HIDE_LOADER
  }
}