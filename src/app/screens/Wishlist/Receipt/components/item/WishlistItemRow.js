/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-10-19T16:54:29.190Z
Modified: !date!
Modified By: modifier
*/
import React, {useState} from 'react';
import {
    Spacer,
    Flex,
    Text,
    IconButton,
    Button,
    Input,
    useDisclosure,
} from '@chakra-ui/react';
import {
    CheckIcon
} from '@chakra-ui/icons';
import PropTypes from 'prop-types';
function WishlistItemRow({
    wishlistItem,
    setWishlistItem
}) {
    return (
        <>
            <Flex direction='row' marginTop={3}>
                <Text  fontSize="1xl">{wishlistItem.name}</Text>
                <Spacer />
                <IconButton aria-label="Select product name" icon={<CheckIcon />} onClick={() => {setWishlistItem(wishlistItem._id)}} />
            </Flex>
        </>
    )
}

WishlistItemRow.propTypes = {
    wishlistItem: PropTypes.object,
    setWishlistItem: PropTypes.func,
}
export default WishlistItemRow