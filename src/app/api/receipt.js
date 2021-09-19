/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: Endpoints for preference
Created:  2021-08-28T17:45:21.275Z
Modified: !date!
Modified By: Isamu Isozaki
*/

import api from './index';

export function getReceipt({receiptId} = {}) {
    return api.get('/v1/receipt', { params: { receiptId } });
}

export function getReceipts({params} = {}) {
    return api.get('/v1/receipt/me', {params});
}

export function updateItemPrice({ receiptItemId, price } = {}) {
    return api.put('/v1/receipt/price', { receiptItemId, price });
}

export function updateItemQuantity({ receiptItemId, quantity } = {}) {
    return api.put('/v1/receipt/quantity', { receiptItemId, quantity });
}

export function setWishlistItem({ receiptItemId, wishlistItemId } = {}) {
    return api.put('/v1/receipt/setWishlistItem', { receiptItemId, wishlistItemId });
}

export function deleteReceipt({ receiptId }  = {}) {
    return api.delete('/v1/receipt', { receiptId } );
}

export function deleteReceiptItem({ receiptId, receiptItemId } = {}) {
    return api.delete('/v1/receipt/item', { receiptId, receiptItemId });
}

export function postReceipt({ payerId, wishlistId, receiptImg, tax }  = {}) {
    return api.post('/v1/receipt', { payerId, wishlistId, receiptImg, tax });
}

export function postReceiptItems({ receiptId, receiptItems } = {}) {
    return api.post('/v1/receipt/item', { receiptId, receiptItems });
}