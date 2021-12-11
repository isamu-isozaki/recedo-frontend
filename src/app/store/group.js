/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-08-28T17:30:44.844Z
Modified: !date!
Modified By: modifier
*/

import {
    getGroups,
    putInvite,
    putCancelInvite,
    putAcceptInvite,
    putKickMember,
    putLeaveGroup,
    postGroup,
} from 'app/api/group';
import 'firebase/auth'
import _ from 'lodash'
export const LOAD_GROUP_SUCCESS = 'LOAD_GROUP_SUCCESS';
export const INVITE_SUCCESS = 'INVITE_SUCCESS';
export const CANCEL_INVITE_SUCCESS = 'CANCEL_INVITE_SUCCESS';
export const ACCEPT_INVITE_SUCCESS = 'ACCEPT_INVITE_SUCCESS';
export const SELECT_GROUP_SUCCESS = 'SELECT_GROUP_SUCCESS';
export const KICK_MEMBER_SUCCESS = 'KICK_MEMBER_SUCCESS';
export const LEAVE_GROUP_SUCCESS = 'LEAVE_GROUP_SUCCESS';
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
export const GROUP_FAIL = 'GROUP_FAIL';





const initialState = {
    isInitializing: true,
    byId: {},
    groupIds: [],
    invitedGroupIds: [],
    selectedGroup: null,
    deepUpdate: true,
    error: false,
};

export default function groupReducer(state = initialState, 
{type, payload}) 
{
    switch (type) {
        case LOAD_GROUP_SUCCESS: {
            const { groups, invitedGroups } = payload
            let selectedGroup = null;
            if(Object.keys(groups).length > 0) {
                selectedGroup = Object.keys(groups)[0]
            }
            return {...state, isInitializing: false, byId: {...groups, ...invitedGroups}, groupIds: Object.keys(groups), invitedGroupIds: Object.keys(invitedGroups), selectedGroup };
        }
        case INVITE_SUCCESS: {
            const {groupId, invitedUserId} = payload
            let { invitedUserIds } = state.byId[groupId]
            invitedUserIds = [...invitedUserIds, invitedUserId]
            let newById = {...state.byId}
            newById[groupId]['invitedUserIds'] = invitedUserIds

            return {
                ...state,
                byId: newById,
                deepUpdate: !state.deepUpdate
            };
        }
        case CANCEL_INVITE_SUCCESS: {
            const {groupId, invitedUserId} = payload
            let { invitedUserIds } = state.byId[groupId]
            invitedUserIds = invitedUserIds.filter(userId => userId !== invitedUserId)
            invitedUserIds = _.omitBy(invitedUserIds, {_id: invitedUserId})
            let newById = {...state.byId}
            newById[groupId]['invitedUserIds'] = invitedUserIds
            const newInvitedGroupIds = state.invitedGroupIds.filter(id => id !== groupId)

            return {
                ...state,
                byId: newById,
                invitedGroupIds: newInvitedGroupIds
            };
        }
        case ACCEPT_INVITE_SUCCESS: {
            const {groupId, userId} = payload
            let { invitedUserIds, userIds } = state.byId[groupId]
            invitedUserIds = invitedUserIds.filter(id => id !== userId)
            userIds = [...userIds, userId]
            let newById = {...state.byId}
            newById[groupId]['invitedUserIds'] = invitedUserIds
            newById[groupId]['userIds'] = userIds
            const newGroupIds = [...state.groupIds, groupId]
            const newInvitedGroupIds = state.invitedGroupIds.filter(id => id !== groupId)
            return {
                ...state,
                byId: newById,
                groupIds: newGroupIds,
                invitedGroupIds: newInvitedGroupIds
            };
        }
        case SELECT_GROUP_SUCCESS: {
            const {id} = payload
            return {
                ...state,
                selectedGroup: id
            };
        }
        case KICK_MEMBER_SUCCESS: {
            const {groupId, userId} = payload
            let { userIds } = state.byId[groupId]
            userIds = userIds.filter(id => id !== userId)
            let newById = {...state.byId}
            newById[groupId]['userIds'] = userIds
            return {
                ...state,
                byId: newById,
                deepUpdate: !state.deepUpdate
            };
        }
        case LEAVE_GROUP_SUCCESS: {
            const {groupId} = payload
            const newById = _.omitBy({...state.byId}, {_id: groupId})
            const newGroupIds = state.groupIds.filter(id => id !== groupId)
            const newSelectedGroup = newGroupIds && newGroupIds[0]
            return {
                ...state,
                byId: newById,
                groupIds: newGroupIds,
                deepUpdate: !state.deepUpdate,
                selectedGroup: newSelectedGroup,
            };
        }
        case CREATE_GROUP_SUCCESS: {
            const {group} = payload
            let newById = {...state.byId, [group._id]: group}
            let newGroupIds = [...state.groupIds, group._id]
            return {
                ...state,
                byId: newById,
                groupIds: newGroupIds,
                selectedGroup: group._id,
            };
        }
        case GROUP_FAIL: {
            console.log(type)
            return state
        }
        default:
            return state;
    }
}

/**
 * 
 * @param {object} param0
 * Load groups of user
 */
export function loadGroups({params} = {}) {
    return async (dispatch) => {
        try {
            const { payload } = await getGroups({ params });
            const { groups, invitedGroups } = payload;
            dispatch({ type: LOAD_GROUP_SUCCESS, payload: { groups, invitedGroups } });
            return { groups, invitedGroups }
        }
        catch (e) {
            console.log(e)
            dispatch({ type: GROUP_FAIL, payload: {} });
            return e
        }
    }
}

export function invite(groupId, invitedUserId) {
    return async (dispatch) => {
        try {
            const { payload } = await putInvite({ groupId, invitedUserIds: [invitedUserId] });
            dispatch({ type: INVITE_SUCCESS, payload: { groupId, invitedUserId } });
            return {groupId, invitedUserId}
        }
        catch (e) {
            dispatch({ type: GROUP_FAIL, payload: {} });
            return e
        }
    }
}

export function cancelInvite(groupId, userId) {
    return async (dispatch) => {
        try {
            await putCancelInvite({ groupId, userId });
            dispatch({ type: CANCEL_INVITE_SUCCESS, payload: { groupId, invitedUserId: userId } });
            return { groupId, invitedUserId: userId }
        }
        catch (e) {
            console.log(e)
            dispatch({ type: GROUP_FAIL, payload: {} });
            return e
        }
    }
}

export function acceptInvite(groupId, userId) {
    return async (dispatch) => {
        try {
            const { payload } = await putAcceptInvite({ groupId });
            dispatch({ type: ACCEPT_INVITE_SUCCESS, payload: { groupId, userId } });
            return { groupId }
        }
        catch (e) {
            dispatch({ type: GROUP_FAIL, payload: {} });
            return e
        }
    }
}

export function selectGroup(id) {
    return async (dispatch, getState) => {
        try {
            const state = getState()
            if(!state.group.groupIds.includes(id)) {
                throw Error('Id not present')
            }
            dispatch({ type: SELECT_GROUP_SUCCESS, payload: { id } });
            return id
        }
        catch (e) {
            dispatch({ type: GROUP_FAIL, payload: {} });
            return e
        }
    }
}


export function kickMember(groupId, userId) {
    return async (dispatch) => {
        try {
            const { payload } = await putKickMember({ groupId, userId })
            dispatch({ type: KICK_MEMBER_SUCCESS, payload: { groupId, userId } });
            return {groupId, userId}
        }
        catch (e) {
            dispatch({ type: GROUP_FAIL, payload: {} });
            return e
        }
    }
}

export function leaveGroup(groupId) {
    return async (dispatch) => {
        try {
            const { payload } = await putLeaveGroup({ groupId })
            dispatch({ type: LEAVE_GROUP_SUCCESS, payload: { groupId } });
            return {groupId}
        }
        catch (e) {
            dispatch({ type: GROUP_FAIL, payload: {} });
            return e
        }
    }
}

export function createGroup(name, invitedUserIds) {
    return async (dispatch) => {
        try {
            const { payload } = await postGroup({ name, invitedUserIds })
            const { group } = payload
            dispatch({ type: CREATE_GROUP_SUCCESS, payload: { group } });
            return {name, invitedUserIds}
        }
        catch (e) {
            dispatch({ type: GROUP_FAIL, payload: {} });
            return e
        }
    }
}