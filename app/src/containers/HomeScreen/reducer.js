import produce from 'immer';

import * as constants from './constants';
import images from '../../Themes/Images'

export const initialState = {
    listPopular: [],
    listRecipe: [],
    listFavorite: [],
    listMyRecipe: [],
    cart: [],
    isShow: false,
    resultSearch: [],
    cartInfo: null,
};

const reducer = (state = initialState, action) => {
        switch (action.type) {
            case constants.LOAD_CART: {
                return state;
            }
            case constants.LOAD_CART_SUCCESS: {
                return {
                    ...state,
                    cart: action.payload
                }
            }
            case constants.LOAD_CART_FAILED: {
                return state;
            }
            case constants.LOAD_CART_INFO: {
                return state;
            }
            case constants.LOAD_CART_INFO_SUCCESS: {
                return {
                    ...state,
                    cartInfo: action.payload
                }
            }
            case constants.LOAD_CART_INFO_FAILED: {
                return state;
            }
            case constants.LOAD_RECIPE: {
                return state;
            }
            case constants.LOAD_RECIPE_SUCCESS: {
                return {
                    ...state,
                    listRecipe: action.payload
                }
            }
            case constants.LOAD_RECIPE_FAILED: {
                return state;
            }
            case constants.LOAD_POPULAR_RECIPE: {
                return state;
            }
            case constants.LOAD_POPULAR_RECIPE_SUCCESS: {
                return {
                    ...state,
                    listPopular: action.payload
                }
            }
            case constants.LOAD_POPULAR_RECIPE_FAILED: {
                return state;
            }
            case constants.LOAD_FAVORITE_RECIPE: {
                return state;
            }
            case constants.LOAD_FAVORITE_RECIPE_SUCCESS: {
                return {
                    ...state,
                    listFavorite: action.payload
                }
            }
            case constants.LOAD_FAVORITE_RECIPE_FAILED: {
                return state;
            }
            case constants.LOAD_MY_RECIPE: {
                return state;
            }
            case constants.LOAD_MY_RECIPE_SUCCESS: {
                return {
                    ...state,
                    listMyRecipe: action.payload
                }
            }
            case constants.LOAD_MY_RECIPE_FAILED: {
                return state;
            }
            case constants.SHOW_LOADER: {
                return {
                    ...state,
                    isShow: true
                }
            }
            case constants.HIDE_LOADER: {
                return {
                    ...state,
                    isShow: false
                }
            }
            case constants.LOAD_RESULT: {
                return state;
            }
            case constants.LOAD_RESULT_SUCCESS: {
                return {
                    ...state,
                    resultSearch: action.payload
                }
            }
            case constants.LOAD_RESULT_FAILED: {
                return state
            }
            default: {
                return state;
            }
        }
}


export default reducer;