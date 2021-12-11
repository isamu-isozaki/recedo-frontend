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
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react';
import {
    DeleteIcon,
    EditIcon,
} from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {removeReceiptItem} from 'app/store/receipt';
import UpdateReceiptItemModal from './UpdateReceiptItemModal';
function ReceiptItemRow({
    receipt,
    receiptItem,
    wishlistItemById,
    removeReceiptItem,
    receiptNotEditable
}) {
    const wishlistItem = receiptItem.wishlistItemId !== '' ? wishlistItemById[receiptItem.wishlistItemId] : 'not set'
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Tr marginTop={3}>
                <Td  fontSize="1xl">{receiptItem.name}</Td>
                <Td  fontSize="1xl">${receiptItem.price.toFixed(2)}</Td>
                <Td  fontSize="1xl">{receiptItem.quantity}</Td>
                <Td  fontSize="1xl">${(receiptItem.price*receiptItem.quantity).toFixed(2)}</Td>
                <Td  fontSize="1x1">{wishlistItem.name}</Td>
                <Td><IconButton isDisabled={receiptNotEditable} aria-label="Edit item" icon={<EditIcon />} onClick={onOpen} /></Td>
                <Td><IconButton isDisabled={receiptNotEditable} marginLeft={4} aria-label="Delete item" icon={<DeleteIcon />} onClick={() => {removeReceiptItem(receipt._id, receiptItem._id)}} /></Td>
                <Td><UpdateReceiptItemModal isOpen={isOpen} onClose={onClose} receiptItem={receiptItem} receipt={receipt} /></Td>
            </Tr>
        </>
    )
}
ReceiptItemRow.propTypes = {
    receipt: PropTypes.object,
    receiptItem: PropTypes.object,
    wishlistItemById: PropTypes.object,
    removeReceiptItem: PropTypes.func,
    receiptNotEditable: PropTypes.bool,
}
const mapStateToProps = (state) => ({
    wishlistItemById: state.wishlist.itemById,
});

export default connect(
    mapStateToProps, 
    {
        removeReceiptItem
    },
)(ReceiptItemRow);