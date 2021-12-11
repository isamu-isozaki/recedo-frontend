/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: Endpoints for wishlist
Created:  2021-08-28T17:45:21.275Z
Modified: !date!
Modified By: Isamu Isozaki
*/

import api from './index';

export function getWishlist(wishlistId) {
    return api.get('/v1/wishlist', { params : { wishlistId} });
}

export function getWishlists({params} = {}) {
    return api.get('/v1/wishlist/me', {params});
}
export function getWishlistItems(wishlistItemIds) {
    return api.get('/v1/wishlist/items', {params: {wishlistItemIds}});
}

export function searchWishlistItem(name) {
    return api.get('/v1/wishlist/searchItem', { params: { name } } );
}

export function putItemName(wishlistId, wishlistItemId, newName) {
    return api.put('/v1/wishlist/itemName', { wishlistId, wishlistItemId, newName });
}

export function deleteWishlist(wishlistId) {
    return api.delete('/v1/wishlist', { params: {wishlistId} });
}

export function deleteWishlistItem(wishlistId, wishlistItemId) {
    return api.delete('/v1/wishlist/item', { params : {wishlistId, wishlistItemId }});
}

export function postWishlist(name, groupId) {
    return api.post('/v1/wishlist', { name, groupId });
}

export function postWishlistItem(wishlistId, name) {
    return api.post('/v1/wishlist/item', { wishlistId, name });
}