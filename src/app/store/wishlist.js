/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-08-28T23:54:32.711Z
Modified: !date!
Modified By: modifier
*/

import {
    getWishlist,
    getWishlists,
    getWishlistItems,
    searchWishlistItem,
    putItemName,
    deleteWishlist,
    deleteWishlistItem,
    postWishlist,
    postWishlistItem,
} from 'app/api/wishlist';
import {UPDATE_PREFERENCE_SUCCESS} from './preference'
import _ from 'lodash'
export const LOAD_WISHLIST_SUCCESS = 'LOAD_WISHLIST_SUCCESS';
export const LOAD_WISHLISTS_SUCCESS = 'LOAD_WISHLISTS_SUCCESS';
export const LOAD_WISHLIST_ITEMS_SUCCESS = 'LOAD_WISHLIST_ITEMS_SUCCESS';
export const UPDATE_WISHLIST_ITEM_NAME_SUCCESS = 'UPDATE_WISHLIST_ITEM_NAME_SUCCESS';
export const REMOVE_WISHLIST_SUCCESS = 'REMOVE_WISHLIST_SUCCESS';
// Simply remove from wishlist
export const REMOVE_WISHLIST_ITEM_SUCCESS = 'REMOVE_WISHLIST_ITEM_SUCCESS';
export const CREATE_WISHLIST_SUCCESS = 'CREATE_WISHLIST_SUCCESS';
export const CREATE_WISHLIST_ITEM_SUCCESS = 'CREATE_WISHLIST_ITEM_SUCCESS';
export const WISHLIST_FAIL = 'WISHLIST_FAIL';


const initialState = {
    isInitializing: true,
    byId: {},
    allIds: [],
    itemById: {},
    itemAllIds: [],
    deepUpdate: true,
    error: false,
};

export default function wishlistReducer(state = initialState, 
{type, payload}) 
{
    switch (type) {
        case LOAD_WISHLIST_SUCCESS: {
            const {wishlist} = payload
            return {...state, byId: {...state.byId, [wishlist._id]: wishlist}, allIds: [...state.allIds, wishlist._id]}
        }
        case LOAD_WISHLISTS_SUCCESS: {
            const {wishlists} = payload
            return {...state, byId: {...state.byId, ...wishlists}, allIds: [...state.allIds, ...Object.keys(wishlists)]}
        }
        case LOAD_WISHLIST_ITEMS_SUCCESS: {
            const {wishlistItems} = payload
            return {...state, itemById: {...state.itemById, ...wishlistItems}, itemAllIds: [...state.itemAllIds, ...Object.keys(wishlistItems)], isInitializing: false}
        }
        case UPDATE_WISHLIST_ITEM_NAME_SUCCESS: {
            const { wishlistId, wishlistItemId, wishlistItem}= payload
            const newById = state.byId
            newById[wishlistId] = {...newById[wishlistId], wishlistItemIds: [...newById[wishlistId].wishlistItemIds.filter(itemId => itemId !== wishlistItemId), wishlistItem._id]}
            const newItemById = {...state.itemById, [wishlistItem._id]: wishlistItem}
            const newItemAllIds = [...state.itemAllIds, wishlistItem._id]
            return {...state, byId: newById, itemById: newItemById, itemAllIds: newItemAllIds}
        }
        case REMOVE_WISHLIST_SUCCESS: {
            const {wishlistId} = payload
            const newById = state.byId
            delete newById[wishlistId]
            const newAllIds = state.allIds.filter(itemId=> itemId !== wishlistId)
            return {...state, byId: newById, allIds: newAllIds}
        }
        case REMOVE_WISHLIST_ITEM_SUCCESS: {
            const {wishlistId, wishlistItemId} = payload
            const newById = state.byId
            newById[wishlistId] = {...newById[wishlistId], wishlistItemIds: [...newById[wishlistId].wishlistItemIds.filter(itemId => itemId !== wishlistItemId)]}
            return {...state, byId: newById, deepUpdate: !state.deepUpdate}   
        }
        case CREATE_WISHLIST_SUCCESS: {
            const {wishlist} = payload
            return {...state, byId: {...state.byId, [wishlist._id]: wishlist}, allIds: [...state.allIds, wishlist._id]}
        }
        case CREATE_WISHLIST_ITEM_SUCCESS: {
            const {wishlistId, wishlistItem} = payload
            const newById = state.byId
            newById[wishlistId] = {...newById[wishlistId], wishlistItemIds: [...newById[wishlistId].wishlistItemIds, wishlistItem._id]}
            const newItemById = {...state.itemById, [wishlistItem._id]: wishlistItem}
            const newItemAllIds = [...state.itemAllIds, wishlistItem._id]
            return {...state, byId: newById, itemById: newItemById, itemAllIds: newItemAllIds, deepUpdate: !state.deepUpdate}
        }
        case WISHLIST_FAIL: {
            console.log(type)
            return state
        }
        default:
            return state;
    }
}

export function loadWishlist(wishlistId) {
    return async (dispatch, getState) => {
        try {
            const state = getState()
            if(state.wishlist.allIds.includes(wishlistId)) {
                return state.wishlist.byId[wishlistId]
            }
            const { payload } = await getWishlist(wishlistId);
            const { wishlist } = payload
            dispatch({ type: LOAD_WISHLIST_SUCCESS, payload: {wishlist}})
            return wishlist
        } catch(e) {
            dispatch({ type: WISHLIST_FAIL, payload: {} });
        }
    }
}

export function loadWishlists() {
    return async (dispatch) => {
        try {
            const { payload } = await getWishlists();
            const { wishlists } = payload
            dispatch({ type: LOAD_WISHLISTS_SUCCESS, payload: {wishlists}})
            return wishlists
        } catch(e) {
            dispatch({ type: WISHLIST_FAIL, payload: {} });
        }
    }
}

export function loadWishlistItemsByIds(wishlistItemIds) {
    return async (dispatch) => {
        try {
            const { payload } = await getWishlistItems(wishlistItemIds)
            const { wishlistItems } = payload
            dispatch({ type: LOAD_WISHLIST_ITEMS_SUCCESS, payload: {wishlistItems} })
            return wishlistItems
        } catch(e) {
            console.log(e)
            dispatch({ type: WISHLIST_FAIL, payload: {} });
        }
    }
}

export function loadWishlistItemsByName(name) {
    return async (dispatch) => {
        try {
            const { payload } = await searchWishlistItem(name)
            const { wishlistItems } = payload
            dispatch({ type: LOAD_WISHLIST_ITEMS_SUCCESS, payload: {wishlistItems} })
            return Object.keys(wishlistItems)
        } catch(e) {
            dispatch({ type: WISHLIST_FAIL, payload: {} });
        }
    }
}

export function updateWishlistItem(wishlistId, wishlistItemId, newName) {
    return async (dispatch) => {
        try {
            const { payload } = await putItemName(wishlistId, wishlistItemId, newName)
            const { wishlistItem } = payload
            dispatch({ type: UPDATE_WISHLIST_ITEM_NAME_SUCCESS, payload: {wishlistId, wishlistItemId, wishlistItem} })
            return wishlistItem
        } catch(e) {
            dispatch({ type: WISHLIST_FAIL, payload: {} });
        }
    }
}

export function removeWishlist(wishlistId) {
    return async (dispatch) => {
        try {
            await deleteWishlist(wishlistId)
            dispatch({ type: REMOVE_WISHLIST_SUCCESS, payload: {wishlistId}})
        } catch(e) {
            dispatch({ type: WISHLIST_FAIL, payload: {} });
        }
    }
}

export function removeWishlistItem(wishlistId, wishlistItemId) {
    return async (dispatch) => {
        try {
            await deleteWishlistItem(wishlistId, wishlistItemId)
            dispatch({ type: REMOVE_WISHLIST_ITEM_SUCCESS, payload: {wishlistId, wishlistItemId}})
        } catch(e) {
            console.log(e)
            dispatch({ type: WISHLIST_FAIL, payload: {} });
        }
    }
}

export function createWishlist(name, groupId) {
    return async (dispatch) => {
        try {
            const {payload} = await postWishlist(name, groupId)
            const {wishlist} = payload
            dispatch({ type: CREATE_WISHLIST_SUCCESS, payload: {wishlist}})
        } catch(e) {
            console.log(e)
            dispatch({ type: WISHLIST_FAIL, payload: {} });
        }
    }
}

export function createWishlistItem(wishlistId, name) {
    return async (dispatch) => {
        try {
            const {payload} = await postWishlistItem(wishlistId, name)
            const { wishlistItem, preference } = payload
            dispatch({ type: CREATE_WISHLIST_ITEM_SUCCESS, payload: {wishlistId, wishlistItem}})
            dispatch({ type: UPDATE_PREFERENCE_SUCCESS, payload: { preference }})
        } catch(e) {
            console.log(e)
            dispatch({ type: WISHLIST_FAIL, payload: {} });
        }
    }
}