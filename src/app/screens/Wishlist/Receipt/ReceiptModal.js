/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-09-26T23:40:33.689Z
Modified: !date!
Modified By: modifier
*/
import { connect } from 'react-redux'
import React, {useState} from 'react';
import ImageUploader from 'app/components/ImageUploader';
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
} from '@chakra-ui/react';

import PropTypes from 'prop-types';
import CreateReceiptModal from './components/CreateReceiptModal';
import DefaultReceiptModal from './components/DefaultReceiptModal';

function ReceiptModal({
    byId,
    allIds,
    wishlistId,
    isOpen,
    onClose,
}) {
    let receipt = null
    for(const receiptIdIdx in allIds) {
        const receiptId = allIds[receiptIdIdx]
        const wishlistReceipt = byId[receiptId]
        if(wishlistReceipt && wishlistReceipt.wishlistId === wishlistId) {
            receipt = wishlistReceipt
            break
        }
    }
    return (
        receipt ? (
            <DefaultReceiptModal isOpen={isOpen} onClose={onClose} receipt={receipt} />
        ) :
        (
            <CreateReceiptModal isOpen={isOpen} onClose={onClose} wishlistId={wishlistId}/>
        )
        
    )
}

ReceiptModal.propTypes = {
    byId: PropTypes.object,
    allIds: PropTypes.array,
    wishlistId: PropTypes.string,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
}

const mapStateToProps = (state) => ({
    byId: state.receipt.byId,
    allIds: state.receipt.allIds,
    deepUpdate: state.receipt.deepUpdate,
});

export default connect(
    mapStateToProps, 
    {},
)(ReceiptModal);