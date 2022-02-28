/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-08-28T23:54:32.711Z
Modified: !date!
Modified By: modifier
*/

import {
    getReceipt,
    getReceipts,
    searchProductNames,
    putItemPrice,
    putItemQuantity,
    putPayer,
    putTax,
    putTotalCost,
    setWishlistItem,
    deleteReceipt,
    deleteReceiptItem,
    postReceipt,
    postReceiptImg,
    postReceiptItem,
} from 'app/api/receipt';
import _ from 'lodash'
export const LOAD_RECEIPT_SUCCESS = 'LOAD_RECEIPT_SUCCESS';
export const LOAD_RECEIPTS_SUCCESS = 'LOAD_RECEIPTS_SUCCESS';
export const LOAD_PRODUCT_NAMES_SUCCESS = 'LOAD_PRODUCT_NAMES_SUCCESS';
export const UPDATE_ITEM_PRICE_SUCCESS = 'UPDATE_ITEM_PRICE_SUCCESS';
export const UPDATE_ITEM_QUANTITY_SUCCESS = 'UPDATE_ITEM_QUANTITY_SUCCESS';
export const UPDATE_WISHLIST_ITEM_SUCCESS = 'UPDATE_WISHLIST_ITEM_SUCCESS';
export const UPDATE_PAYER_SUCCESS = 'UPDATE_PAYER_SUCCESS';
export const UPDATE_TAX_SUCCESS = 'UPDATE_TAX_SUCCESS';
export const UPDATE_TOTAL_COST_SUCCESS = 'UPDATE_TOTAL_COST_SUCCESS';
export const REMOVE_RECEIPT_SUCCESS = 'REMOVE_RECEIPT_SUCCESS';
export const REMOVE_RECEIPT_ITEM_SUCCESS = 'REMOVE_RECEIPT_ITEM_SUCCESS';
export const CREATE_RECEIPT_SUCCESS = 'CREATE_RECEIPT_SUCCESS';
export const CREATE_RECEIPT_IMG_SUCCESS = 'CREATE_RECEIPT_IMG_SUCCESS';
export const CREATE_RECEIPT_ITEM_SUCCESS = 'CREATE_RECEIPT_ITEM_SUCCESS';
export const RECEIPT_FAIL = 'RECEIPT_FAIL';


const initialState = {
    isInitializing: true,
    byId: {},
    allIds: [],
    productNameById: {},
    productNameAllIds: [],
    error: false,
    deepUpdate: true,
}

const computeFinishedTransaction = (receipt) => {
    const itemIds = Object.keys(receipt.receiptItems)
    const receiptItems = itemIds.map(itemId => receipt.receiptItems[itemId])
    let receiptItemTotal = 0
    let allItemsSet = true
    receiptItems.forEach(receiptItem => {
        receiptItemTotal+=Number((receiptItem.price*receiptItem.quantity).toFixed(2))
        allItemsSet = allItemsSet && receiptItem.wishlistItemSet
    })
    return allItemsSet && (receiptItemTotal.toFixed(2) === receipt.totalCost.toFixed(2))
}

export default function receiptReducer(state = initialState, 
{type, payload}) 
{
    switch (type) {
        case LOAD_RECEIPT_SUCCESS: {
            const {receipt} = payload
            return {...state, byId: {...state.byId, [receipt._id]: receipt}, allIds: [...state.allIds, receipt._id]};
        }
        case LOAD_RECEIPTS_SUCCESS: {
            const {receipts} = payload
            return {...state, byId: {...state.byId, ...receipts}, allIds: Object.keys(receipts), isInitializing: false};
        }
        case LOAD_PRODUCT_NAMES_SUCCESS: {
            const { productNames } = payload
            const productNameById = {...state.productNameById, ...productNames}
            return {...state, productNameById, productNameAllIds: Object.keys(productNameById) }
        }
        case UPDATE_ITEM_PRICE_SUCCESS: {
            const { receiptId, receiptItemId, price } = payload
            const newById = state.byId
            const receiptItems = newById[receiptId].receiptItems
            for(let i = 0; i < receiptItems.length; i++) {
                if(receiptItemId === receiptItems[i]._id) {
                    newById[receiptId].receiptItems[i].price = price
                }
            }
            const finishedTransaction = computeFinishedTransaction(newById[receiptId])
            newById[receiptId].finishedTransaction = finishedTransaction
            return {...state, byId: newById, deepUpdate: !state.deepUpdate}
        }
        case UPDATE_ITEM_QUANTITY_SUCCESS: {
            const { receiptId, receiptItemId, quantity } = payload
            const newById = state.byId
            const receiptItems = newById[receiptId].receiptItems
            for(let i = 0; i < receiptItems.length; i++) {
                if(receiptItemId === receiptItems[i]._id) {
                    newById[receiptId].receiptItems[i].quantity = quantity
                }
            }
            const finishedTransaction = computeFinishedTransaction(newById[receiptId])
            newById[receiptId].finishedTransaction = finishedTransaction
            return {...state, byId: newById, deepUpdate: !state.deepUpdate}
        }
        case UPDATE_WISHLIST_ITEM_SUCCESS: {
            const { receiptId, receiptItemId, wishlistItemId } = payload
            const newById = state.byId
            const receiptItems = newById[receiptId].receiptItems
            for(let i = 0; i < receiptItems.length; i++) {
                if(receiptItemId === receiptItems[i]._id) {
                    newById[receiptId].receiptItems[i].wishlistItemId = wishlistItemId
                    newById[receiptId].receiptItems[i].wishlistItemSet = true
                }
            }
            
            const finishedTransaction = computeFinishedTransaction(newById[receiptId])
            newById[receiptId].finishedTransaction = finishedTransaction
            return {...state, byId: newById, deepUpdate: !state.deepUpdate}
        }
        case UPDATE_PAYER_SUCCESS: {
            const { receiptId, payerId } = payload
            const newById = state.byId
            newById[receiptId].payerId = payerId
            return {...state, byId: newById, deepUpdate: !state.deepUpdate}
        }
        case UPDATE_TAX_SUCCESS: {
            const { receiptId, tax } = payload
            const newById = state.byId
            newById[receiptId].tax = tax
            return {...state, byId: newById, deepUpdate: !state.deepUpdate}
        }
        case UPDATE_TOTAL_COST_SUCCESS: {
            const { receiptId, totalCost } = payload
            const newById = state.byId
            newById[receiptId].totalCost = totalCost
            return {...state, byId: newById, deepUpdate: !state.deepUpdate}
        }
        case REMOVE_RECEIPT_SUCCESS: {
            const { receiptId } = payload
            const newById = state.byId
            delete newById[receiptId]
            return {...state, byId: newById}
        }
        case REMOVE_RECEIPT_ITEM_SUCCESS: {
            const { receiptId, receiptItemId } = payload
            const newById = state.byId
            delete newById[receiptId].receiptItems[receiptItemId]
            return {...state, byId: newById, deepUpdate: !state.deepUpdate}
        }
        case CREATE_RECEIPT_SUCCESS: {
            const { receipt } = payload
            const newById = {...state.byId, [receipt._id]: receipt}
            const newAllIds = Object.keys(newById)

            return {...state, byId: newById, allIds: newAllIds, deepUpdate: !state.deepUpdate}
        }
        case CREATE_RECEIPT_IMG_SUCCESS: {
            const { receipt } = payload
            const newById = {...state.byId, [receipt._id]: receipt}

            return {...state, byId: newById, deepUpdate: !state.deepUpdate}
        }
        case CREATE_RECEIPT_ITEM_SUCCESS: {
            const { receiptId, receiptItems} = payload
            const newById = state.byId
            newById[receiptId].receiptItems = receiptItems
            return {...state, byId: newById, deepUpdate: !state.deepUpdate}
        }
        case RECEIPT_FAIL: {
            console.log(type)
            return state
        }
        default:
            return state;
    }
}

export function loadReceipt(receiptId) {
    return async (dispatch, getState) => {
        try {
            const state = getState()
            if(state.receipt.allIds.includes(receiptId)) {
                return state.receipt.byId[receiptId]
            }
            const { payload } = await getReceipt(receiptId);
            const { receipt } = payload
            dispatch({ type: LOAD_RECEIPT_SUCCESS, payload: {receipt}})
            return receipt
        } catch(e) {
            dispatch({ type: RECEIPT_FAIL, payload: {} });
        }
    }
}

export function loadReceipts() {
    return async (dispatch) => {
        try {
            const { payload } = await getReceipts();
            const { receipts } = payload
            dispatch({ type: LOAD_RECEIPTS_SUCCESS, payload: {receipts}})
            return receipts
        } catch(e) {
            dispatch({ type: RECEIPT_FAIL, payload: {} });
        }
    }
}

export function loadProductNames(name) {
    return async (dispatch) => {
        try {
            const { payload } = await searchProductNames(name);
            const { productNames } = payload
            dispatch({ type: LOAD_PRODUCT_NAMES_SUCCESS, payload: {productNames}})
            return Object.keys(productNames)
        } catch(e) {
            dispatch({ type: RECEIPT_FAIL, payload: {} });
        }
    }
}

export function updateItemPrice(receiptId, receiptItemId, price) {
    return async (dispatch) => {
        try {
            const { payload } = await putItemPrice(receiptItemId, price)
            const {receiptItem} = payload
            dispatch({ type: UPDATE_ITEM_PRICE_SUCCESS, payload: {receiptId, receiptItemId, price} })
            return receiptItem
        } catch(e) {
            console.log({e})
            dispatch({ type: RECEIPT_FAIL, payload: {} });
        }
    }
}

export function updateItemQuantity(receiptId, receiptItemId, quantity) {
    return async (dispatch) => {
        try {
            const { payload } = await putItemQuantity(receiptItemId, quantity)
            const {receiptItem} = payload
            dispatch({ type: UPDATE_ITEM_QUANTITY_SUCCESS, payload: {receiptId, receiptItemId, quantity} })
            return receiptItem
        } catch(e) {
            console.log({e})
            dispatch({ type: RECEIPT_FAIL, payload: {} });
        }
    }
}

export function updateWishlistItem(receiptId, receiptItemId, wishlistItemId) {
    return async (dispatch) => {
        try {
            // On every call of updating wishlistItem, call loadTransactions from the server
            await setWishlistItem(receiptItemId, wishlistItemId)
            dispatch({ type: UPDATE_WISHLIST_ITEM_SUCCESS, payload: {receiptId, receiptItemId, wishlistItemId} })
        } catch(e) {
            console.log({e})
            dispatch({ type: RECEIPT_FAIL, payload: {} });
        }
    }
}

export function updatePayer(receiptId, payerId) {
    return async (dispatch) => {
        try {
            await putPayer(receiptId, payerId)
            dispatch({ type: UPDATE_PAYER_SUCCESS, payload: {receiptId, payerId} })
        } catch(e) {
            dispatch({ type: RECEIPT_FAIL, payload: {} });
        }
    }
}

export function updateTax(receiptId, tax) {
    return async (dispatch) => {
        try {
            await putTax(receiptId, tax)
            dispatch({ type: UPDATE_TAX_SUCCESS, payload: {receiptId, tax} })
        } catch(e) {
            dispatch({ type: RECEIPT_FAIL, payload: {} });
        }
    }
}

export function updateTotalCost(receiptId, totalCost) {
    return async (dispatch) => {
        try {
            await putTotalCost(receiptId, totalCost)
            dispatch({ type: UPDATE_TOTAL_COST_SUCCESS, payload: {receiptId, totalCost} })
        } catch(e) {
            dispatch({ type: RECEIPT_FAIL, payload: {} });
        }
    }
}

export function removeReceipt(receiptId) {
    return async (dispatch) => {
        try {
            await deleteReceipt(receiptId)
            dispatch({ type: REMOVE_RECEIPT_SUCCESS, payload: {receiptId}})
        } catch(e) {
            dispatch({ type: RECEIPT_FAIL, payload: {} });
        }
    }
}

export function removeReceiptItem(receiptId, receiptItemId) {
    return async (dispatch) => {
        try {
            await deleteReceiptItem(receiptId, receiptItemId)
            dispatch({ type: REMOVE_RECEIPT_ITEM_SUCCESS, payload: {receiptId, receiptItemId}})
        } catch(e) {
            dispatch({ type: RECEIPT_FAIL, payload: {} });
        }
    }
}

export function createReceipt(data) {
    return async (dispatch) => {
        try {
            const {payload} = await postReceipt(data)
            const {receipt} = payload
            dispatch({ type: CREATE_RECEIPT_SUCCESS, payload: {receipt}})
        } catch(e) {
            console.log(e)
            dispatch({ type: RECEIPT_FAIL, payload: {} });
        }
    }
}

export function createReceiptImg(data) {
    return async (dispatch) => {
        try {
            const {payload} = await postReceiptImg(data)
            const {receipt} = payload
            dispatch({ type: CREATE_RECEIPT_IMG_SUCCESS, payload: {receipt}})
        } catch(e) {
            console.log(e)
            dispatch({ type: RECEIPT_FAIL, payload: {} });
        }
    }
}

export function createReceiptItem(receiptId, receiptItem) {
    return async (dispatch) => {
        try {
            const {payload} = await postReceiptItem(receiptId, receiptItem)
            const { receipt } = payload
            dispatch({ type: CREATE_RECEIPT_ITEM_SUCCESS, payload: {receiptId, receiptItems: receipt.receiptItems }})
            return receipt
        } catch(e) {
            dispatch({ type: RECEIPT_FAIL, payload: {} });
        }
    }
}
