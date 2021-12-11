/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-08-22T23:24:43.919Z
Modified: !date!
Modified By: modifier
*/
import React, {useState} from 'react';
import { createWishlist } from 'app/store/wishlist';
import WishlistRow from './components/WishlistRow';
import { connect } from 'react-redux';
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
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

function Wishlist({
    byId,
    allIds,
    createWishlist,
    selectedGroup
}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = useState('')
    const wishlists = allIds.map(wishlistId => byId[wishlistId])
    const groupWishlists = wishlists.filter(wishlist => wishlist.groupId === selectedGroup)
    const wishlistElems = groupWishlists.map(wishlist => <WishlistRow wishlist={wishlist} key={wishlist._id} />)
    return (
        <>
            <Flex direction='row'>
                <Spacer />
                <Flex direction='column' justifyContent='center'  width='25%'>
                    {wishlistElems.reverse()}
                    <Flex direction='row'>
                        <Spacer />
                            {
                                selectedGroup ?
                                (
                                    <Button  marginTop={5} onClick={onOpen}>Create Wishlist</Button>
                                ) : (
                                    <Text>Select a group</Text>
                                ) 
                            }
                        <Spacer />
                    </Flex>
                </Flex>
                <Spacer />
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Create wishlist</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Flex direction='column'>
                            <Input onChange={(e)=>setName(e.target.value)} placeholder='Put wishlist postfix name' marginTop={3} />
                            <Button onClick={()=>{
                                createWishlist(name, selectedGroup)
                                onClose()
                            }} marginTop={4}>Create Wishlist</Button>
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

Wishlist.propTypes = {
    byId: PropTypes.object,
    allIds: PropTypes.array,
    createWishlist: PropTypes.func,
    selectedGroup: PropTypes.string,
}
const mapStateToProps = (state) => ({
    byId: state.wishlist.byId,
    allIds: state.wishlist.allIds,
    selectedGroup: state.group.selectedGroup,
    deepUpdate: state.wishlist.deepUpdate
});

export default connect(
    mapStateToProps, 
    {
        createWishlist
    },
)(Wishlist);