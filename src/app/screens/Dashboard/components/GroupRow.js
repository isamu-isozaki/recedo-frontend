/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-09-14T02:41:29.227Z
Modified: !date!
Modified By: modifier
*/

import React from 'react';
import {
    Spacer,
    Flex,
    Text,
    Button,
    UnorderedList,
    Stack,
} from '@chakra-ui/react';
import { cancelInvite, acceptInvite, selectGroup, kickMember, leaveGroup,} from 'app/store/group';
import { connect } from 'react-redux'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { IconButton } from "@chakra-ui/react"
import PropTypes from 'prop-types';

function GroupRow({
    group,
    selectedGroup,
    users,
    user,
    cancelInvite,
    acceptInvite,
    selectGroup,
    kickMember,
    isInvite,
}) {
    const isSelected = group._id === selectedGroup
    const groupUserElems = isSelected ? 
    group.userIds.map(userId => <Flex key={userId}>{`- ${users[userId].nameFirst} ${users[userId].nameLast}`}</Flex>)
    : null
    const invitedUserElems = isSelected ? 
    group.invitedUserIds.map(userId => <Flex key={userId}>{`- ${users[userId].nameFirst} ${users[userId].nameLast}`}</Flex>)
    : null
    const usersView =  isSelected ? (
        <Flex direction='row'>
            <Flex direction='column'>
                <Text fontSize='18px'>Users</Text>
                <Flex direction='row'>
                    <Flex direction='column'>
                        {groupUserElems}
                    </Flex>
                </Flex>
                <Text fontSize='18px'>Invites</Text>
                <Flex direction='row'>
                    <Flex direction='column'>
                        {invitedUserElems}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    ) : null
    const selectGroupButton = !isSelected && !isInvite ? (
        <Button  size="sm" variant="solid" marginLeft={5} onClick={()=>selectGroup(group._id)}>Select</Button>
    ) : null
    const acceptInviteButton = isInvite ? (
        <IconButton size="sm" aria-label="Accept Invite" marginLeft={5} icon={<CheckIcon />} onClick={() => acceptInvite(group._id, user._id)}/>
    ) : null
    const cancelInviteButton = isInvite ? (
        <IconButton size="sm" aria-label="Cancel Invite" marginLeft={3} icon={<CloseIcon />} onClick={() => cancelInvite(group._id, user._id)}/>
    ) : null
    return (
        <Flex direction='row'>
            <Flex direction='column'>
                <Text fontSize='20px'>{group.name}</Text>
                {usersView}
            </Flex>
            <Spacer />
            {selectGroupButton}
            {acceptInviteButton}
            {cancelInviteButton}
        </Flex>
    )
}

GroupRow.propTypes = {
    group: PropTypes.object,
    selectedGroup: PropTypes.string,
    users: PropTypes.object,
    user: PropTypes.object,
    cancelInvite: PropTypes.func,
    acceptInvite: PropTypes.func,
    selectGroup: PropTypes.func,
    kickMember: PropTypes.func,
    leaveGroup: PropTypes.func,
    isInvite: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    selectedGroup:state.group.selectedGroup, 
    deepUpdate: state.group.deepUpdate,
    users: state.auth.byId, 
    user: state.auth.user,
});

export default connect(
    mapStateToProps, 
    { 
        cancelInvite,
        acceptInvite,
        selectGroup,
        kickMember,
        leaveGroup,
    },
)(GroupRow);