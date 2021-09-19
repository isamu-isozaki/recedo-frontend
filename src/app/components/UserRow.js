/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: User row component
Created:  2021-09-13T03:05:26.924Z
Modified: 2021-09-13T03:06:41.541Z
Modified By: Isamu Isozaki
*/
import React, {useState, useEffect} from 'react';
import { invite } from 'app/store/group';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    Avatar, 
    Spacer,
    Flex,
    Text,
    IconButton,
} from '@chakra-ui/react';

import {
    CheckIcon,
} from '@chakra-ui/icons';

function UserRow({ user, groups, selectedGroupId, invite }) {
    const selectedGroup = groups[selectedGroupId]
    const canInvite = selectedGroup && !selectedGroup.userIds.includes(user._id) && !selectedGroup.invitedUserIds.includes(user._id)
    const inviteUser = () => {
        if(!selectedGroup) {
            return
        }
        if(selectedGroup.userIds.includes(user._id)) {
            return
        }
        if(selectedGroup.invitedUserIds.includes(user._id)) {
            return
        }
        invite(selectedGroup._id, user._id) 
    }
    const inviteIcon = canInvite ? (
    <IconButton
        colorScheme="blue"
        aria-label="Invite"
        icon={<CheckIcon />}
        onClick={inviteUser}
    />
    ) : <Spacer />
    
    return (
        <Flex direction='row' align='center'>
            <Avatar name={`${user.nameFirst} ${user.nameLast}`} />
            <Spacer />
            <Flex direction='column'>
                <Text fontSize="1xl">{`${user.nameFirst} ${user.nameLast}`}</Text>
                <Text fontSize="1xl">{user.email}</Text>
            </Flex>
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            {inviteIcon}
        </Flex>
    )
}
UserRow.propTypes = {
    user: PropTypes.object,
    groups: PropTypes.object,
    selectedGroupId: PropTypes.string,
    invite: PropTypes.func
}
const mapStateToProps = (state) => ({ groups: state.group.byId, selectedGroupId: state.group.selectedGroup});

export default connect(
    mapStateToProps,
    {invite}
)(UserRow);