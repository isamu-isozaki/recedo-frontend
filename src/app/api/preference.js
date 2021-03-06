/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: Endpoints for preference
Created:  2021-08-28T17:45:21.275Z
Modified: !date!
Modified By: Isamu Isozaki
*/

import api from './index';

export function getPreferences({params} = {}) {
    return api.get('/v1/preference', {params});
}

export function getUserPreferences(groupId, userId) {
    // Don't implement for now
    return api.get('/v1/preference/user', { params: { groupId, userId } } );
}

export function putPreference(wishlistId, wishlistItemId, want) {
    return api.put('/v1/preference', { wishlistId, wishlistItemId, want });
}