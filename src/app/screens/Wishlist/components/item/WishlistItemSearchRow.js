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
} from '@chakra-ui/react';
import {createWishlistItem} from 'app/store/wishlist';
import PropTypes from 'prop-types';

function WishlistItemSearchRow({
    wishlist,
    wishlistItem,
    createWishlistItem,
    onClose,
}) {
    if(!wishlistItem) {
        return null;
    }
    const canAdd = !wishlist.wishlistItemIds.includes(wishlistItem._id)
    return (
        <>
            <Flex direction='row' marginTop={3}>
                <Text  fontSize="1xl">{wishlistItem.name}</Text>
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                {
                    canAdd && <Button onClick={() => {
                        createWishlistItem(wishlist._id, wishlistItem.name)
                        onClose()
                    }}>Add</Button>
                }
            </Flex>
        </>
    )
}

WishlistItemSearchRow.propTypes = {
    wishlistItem: PropTypes.object,
    wishlist: PropTypes.object,
    createWishlistItem: PropTypes.func,
    onClose: PropTypes.func,
}

export default connect(
    null, 
    {
        createWishlistItem
    },
)(WishlistItemSearchRow);