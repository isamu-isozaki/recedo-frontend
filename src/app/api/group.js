/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: Endpoints for group
Created:  2021-08-28T17:45:21.275Z
Modified: !date!
Modified By: Isamu Isozaki
*/

import api from './index';

export function getGroups({params} = {}) {
    return api.get('/v1/group', {params});
}

export function putInvite({ groupId, invitedUserIds } = {}) {
    return api.put('/v1/group/invite', {groupId, invitedUserIds });
}
  
export function putCancelInvite({ groupId, userId } = {}) {
    return api.put('/v1/group/cancelInvite', { groupId, userId });
}

export function putAcceptInvite({ groupId } = {}) {
    return api.put('/v1/group/acceptInvite', { groupId });
}

export function putKickMember({ groupId, userId } = {}) {
    return api.put('/v1/group/kick', { groupId, userId });
}

export function putLeaveGroup({ groupId } = {}) {
    return api.put('/v1/group/leave', { groupId});
}

export function postGroup({ name, invitedUserIds } = {}) {
    return api.post('/v1/group', { name, invitedUserIds});
}