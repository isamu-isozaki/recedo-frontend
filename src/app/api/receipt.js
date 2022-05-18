/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: Endpoints for preference
Created:  2021-08-28T17:45:21.275Z
Modified: !date!
Modified By: Isamu Isozaki
*/

import api from './index';

export function getJson(receiptId) {
    return api.get('/v1/receipt/json', { params: { receiptId } });
}

export function getReceipt(receiptId) {
    return api.get('/v1/receipt', { params: { receiptId } });
}

export function getReceipts({params} = {}) {
    return api.get('/v1/receipt/me', {params});
}

export function searchProductNames(name) {
    return api.get('/v1/receipt/searchProductNames', {params: {name}});
}

export function putItemPrice(receiptItemId, price) {
    return api.put('/v1/receipt/price', { receiptItemId, price });
}

export function putItemQuantity(receiptItemId, quantity) {
    return api.put('/v1/receipt/quantity', { receiptItemId, quantity });
}

export function putPayer(receiptId, payerId) {
    return api.put('/v1/receipt/payer', { receiptId, payerId });
}

export function putTax(receiptId, tax) {
    return api.put('/v1/receipt/tax', { receiptId, tax });
}

export function putTotalCost(receiptId, totalCost) {
    return api.put('/v1/receipt/totalCost', { receiptId, totalCost });
}

export function setWishlistItem(receiptItemId, wishlistItemId) {
    return api.put('/v1/receipt/setWishlistItem', { receiptItemId, wishlistItemId });
}

export function deleteReceipt(receiptId) {
    return api.delete('/v1/receipt', { params: {receiptId} } );
}

export function deleteReceiptItem(receiptId, receiptItemId) {
    return api.delete('/v1/receipt/item', { params: {receiptId, receiptItemId} });
}

export function postReceipt(data) {
    return api.post('/v1/receipt', data);
}

export function postReceiptImg(data) {
    return api.post('/v1/receipt/img', data);
}

export function postReceiptItem(receiptId, receiptItem) {
    return api.post('/v1/receipt/item', { receiptId, receiptItem });
}