/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-09-12T15:29:41.966Z
Modified: !date!
Modified By: modifier
*/
import React, {useState} from 'react';
import { createGroup, leaveGroup } from 'app/store/group';
import { connect } from 'react-redux';
import GroupRow from './GroupRow';
import {
    Spacer,
    Flex,
    Text,
    Button,
    Input,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Heading,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

function Group({
    byId,
    groupIds,
    invitedGroupIds,
    selectedGroup,
    createGroup,
    leaveGroup,
}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupName, setGroupName] = useState('')

    const groups = groupIds.map(groupId => byId[groupId])
    const invitedGroups = invitedGroupIds.map(groupId => byId[groupId])
    const groupElems = groups.map(group => (
        <GroupRow
            key={group._id}
            group={group}
        />
    ))
    const inviteGroupElems = invitedGroups.map(group => (
        <GroupRow
            key={group._id}
            group={group}
            isInvite={true}
        />
    ))
    return (
        <>
            <Flex direction='column'>
                <Flex direction='column'>
                    <Heading as="h4" size="md">Groups</Heading>
                    <Flex direction='row'>
                        <Spacer />
                        <Flex direction='column'>
                            {groupElems}
                        </Flex>
                        <Spacer />
                    </Flex>
                </Flex>
                <Flex direction='column'>
                    <Heading as="h4" size="md">Invites</Heading>
                    <Flex direction='row'>
                        <Spacer />
                        <Flex direction='column'>
                            {inviteGroupElems}
                        </Flex>
                        <Spacer />
                    </Flex>          
                </Flex>
                <Button onClick={onOpen} marginTop={3}>Create Group</Button>
                <Button onClick={()=>leaveGroup(selectedGroup)} marginTop={3}>Leave Group</Button>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Group Creation</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Flex direction='column'>
                            <Input onChange={(e) => setGroupName(e.target.value)} placeholder="Put group name" />
                            <Button onClick={()=>{
                                createGroup(groupName, []) 
                                onClose()
                            }}>Create Group</Button>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}
Group.propTypes = {
    byId: PropTypes.object,
    groupIds: PropTypes.array,
    invitedGroupIds: PropTypes.array,
    selectedGroup: PropTypes.string,
    createGroup: PropTypes.func, 
    leaveGroup: PropTypes.func,
}
const mapStateToProps = (state) => ({
    byId: state.group.byId, 
    groupIds: state.group.groupIds, 
    invitedGroupIds: state.group.invitedGroupIds,
    selectedGroup: state.group.selectedGroup
});

export default connect(
    mapStateToProps, 
    {
        createGroup,
        leaveGroup
    },
)(Group);