/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-08-23T00:54:31.052Z
Modified: !date!
Modified By: modifier
*/

import React, {useState, useEffect} from 'react';

import { connect } from 'react-redux';
import {loadUsersByEmail} from 'app/store/auth';
import PropTypes from 'prop-types';
import {
    Flex,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import {
    SearchIcon,
} from '@chakra-ui/icons';
import UserRow from './UserRow';


function UserSearchBar({ users, loadUsersByEmail }) {
    const [searchEmail, setSearchEmail] = useState('')
    const [userIds, setUserIds] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            try {
                const loadedUserIds = await loadUsersByEmail(searchEmail)
                setUserIds(loadedUserIds)
            } 
            catch(e) {
                console.log({e})
            }
        }, 1000)
    
        return () => clearTimeout(delayDebounceFn)
      }, [searchEmail])
    // Search for users
    const loadedUsers = userIds.map(userId => users[userId])
    const userRows = loadedUsers.map(user => <UserRow key={user._id} user={user} />)
    return (
        <>
            <Button onClick={onOpen}>
                <InputGroup>
                    <Input isReadOnly={true} placeholder="Put email" />
                    <InputRightElement
                    pointerEvents="none">
                        <SearchIcon />
                    </InputRightElement>
                </InputGroup>
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Inviting User Search</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Flex direction='column'>
                            <InputGroup>
                                <Input onChange={(e) => setSearchEmail(e.target.value)} placeholder="Put email to invite" />
                                <InputRightElement
                                pointerEvents="none">
                                    <SearchIcon />
                                </InputRightElement>
                            </InputGroup>
                            <Flex direction='column' marginTop={5}>
                                {userRows}
                            </Flex>
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

UserSearchBar.propTypes = {
    users: PropTypes.object,
    loadUsersByEmail: PropTypes.func,
}

const mapStateToProps = (state) => ({ users: state.auth.byId, });

export default connect(
    mapStateToProps,
    {loadUsersByEmail}
)(UserSearchBar);