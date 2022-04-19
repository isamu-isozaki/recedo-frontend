/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-09-26T23:40:33.689Z
Modified: !date!
Modified By: modifier
*/
import { connect } from 'react-redux'
import React, {useState} from 'react';
import { createWishlist } from 'app/store/wishlist';
import WishlistItemRow from './item/WishlistItemRow';
import WishlistItemSearchBar from './item/WishlistItemSearchBar';
import {
    Spacer,
    Flex,
    Text,
    Button,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';

import PropTypes from 'prop-types';
import ReceiptButton from 'app/screens/Wishlist/Receipt';

function WishlistModal({
    itemById,
    wishlist,
    isOpen,
    onClose,
}) {
    const noDuplicateWishlistItems = [...new Set(wishlist.wishlistItemIds)];
    const wishlistItems = noDuplicateWishlistItems.map(itemId => itemById[itemId])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                <ModalContent>
                    <ModalHeader>
                        <Flex direction='row'>
                            <Text>{wishlist.name}</Text>
                            <Spacer />
                            <Spacer />
                            <Spacer />
                            <Spacer />
                            <Spacer />
                            <ReceiptButton wishlistId={wishlist._id} />
                            <Spacer />
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Flex direction='column'>
                            <WishlistItemSearchBar wishlist={wishlist}/>
                            {wishlistItems.map(wishlistItem => <WishlistItemRow wishlistItem={wishlistItem} wishlist={wishlist} key={wishlistItem._id}/>)}
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
    )
}

WishlistModal.propTypes = {
    itemById: PropTypes.object,
    wishlist: PropTypes.object,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
}

const mapStateToProps = (state) => ({
    itemById: state.wishlist.itemById,
});

export default connect(
    mapStateToProps, 
    {},
)(WishlistModal);