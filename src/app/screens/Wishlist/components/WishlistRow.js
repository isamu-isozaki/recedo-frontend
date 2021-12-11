/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-08-22T23:24:43.919Z
Modified: !date!
Modified By: modifier
*/
import { connect } from 'react-redux'
import React, {useState} from 'react';
import {
    Spacer,
    Flex,
    Text,
    Button,
    Input,
    useDisclosure,
    IconButton,
} from '@chakra-ui/react';
import {
    DeleteIcon,
} from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import WishlistModal from './WishlistModal';
import { removeWishlist } from 'app/store/wishlist';
import { loadTransactions } from 'app/store/transaction';


function WishlistRow({
    wishlist,
    removeWishlist,
    loadTransactions,
}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const wishlistTime = new Date(wishlist.createdAt).toLocaleDateString("en-US");

    return (
        <>
            <Flex direction='row' marginTop={3}  justifyContent='center'>
                <Flex>{`${wishlistTime}-${wishlist.name}`}</Flex>
                <Spacer />
                <Button onClick={onOpen}>Select</Button>
                <IconButton marginLeft={5} aria-label="Delete wishlist" icon={<DeleteIcon />} onClick={async () => {
                    await removeWishlist(wishlist._id)
                    loadTransactions()
                }} />
            </Flex>
            <WishlistModal wishlist={wishlist} isOpen={isOpen} onClose={onClose} />
        </>
    )
}

WishlistRow.propTypes = {
    wishlist: PropTypes.object,
    removeWishlist: PropTypes.func,
    loadTransactions: PropTypes.func,
}

export default connect(
    null, 
    {
        removeWishlist,
        loadTransactions
    },
)(WishlistRow);