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
    IconButton,
    Button,
    Input,
    useDisclosure,
} from '@chakra-ui/react';
import {
    removeWishlistItem
} from 'app/store/wishlist';
import {
    updatePreference
} from 'app/store/preference';
import { loadTransactions } from 'app/store/transaction';
import {
    DeleteIcon,
} from '@chakra-ui/icons';
import PropTypes from 'prop-types';

function WishlistItemRow({
    wishlistItem,
    wishlist,
    preferenceById,
    preferenceAllIds,
    removeWishlistItem,
    updatePreference,
    loadTransactions
}) {
    if(!wishlistItem || !wishlist || !preferenceById || !preferenceAllIds) {
        return null;
    }
    const wishlistTime = new Date(wishlist.createdAt).getTime()
    const wishlistItemPreferenceIds = preferenceAllIds.filter(preferenceId => preferenceById[preferenceId].wishlistItemId === wishlistItem._id)
    const wishlistItemPreferenceId = wishlistItemPreferenceIds[0]
    const wishlistItemPreference = preferenceById[wishlistItemPreferenceId]
    if(!wishlistItemPreference) {
        return null;
    }
    wishlistItemPreference.fromTimes = wishlistItemPreference.fromTimes.map(fromTime=> new Date(fromTime).getTime())
    const initWant = wishlistItemPreference.initWant
    let fromTimeIndex = -1
    for(const idx in wishlistItemPreference.fromTimes) {
        const fromTime = wishlistItemPreference.fromTimes[idx]
        // Fromtime is always sorted
        if(fromTime <= wishlistTime) {
            fromTimeIndex += 1
        } else {
            break
        }
    }
    const noChange = (fromTimeIndex % 2) === 0
    const currentWant = noChange || fromTimeIndex === -1  ? initWant : !initWant
    const preferenceButton = (<Button marginRight={3} onClick={async () => {
        await updatePreference(wishlist._id, wishlistItem._id, !currentWant)
        loadTransactions()
    }}>{currentWant ? "Want" : "Don't want"}</Button>)
    return (
        <>
            <Flex direction='row' marginTop={3}>
                <Text  fontSize="1xl">{wishlistItem.name}</Text>
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
                {preferenceButton}
                <IconButton aria-label="Delete item" icon={<DeleteIcon />} onClick={() => removeWishlistItem(wishlist._id, wishlistItem._id)} />
            </Flex>
        </>
    )
}

WishlistItemRow.propTypes = {
    wishlistItem: PropTypes.object,
    wishlist: PropTypes.object,
    preferenceById: PropTypes.object,
    preferenceAllIds: PropTypes.array,
    removeWishlistItem: PropTypes.func,
    updatePreference: PropTypes.func,
    loadTransactions: PropTypes.func,
}

const mapStateToProps = (state) => ({
    preferenceById: state.preference.byId,
    preferenceAllIds: state.preference.allIds,
    deepUpdate: state.preference.deepUpdate
});

export default connect(
    mapStateToProps, 
    {
        removeWishlistItem,
        updatePreference,
        loadTransactions
    },
)(WishlistItemRow);