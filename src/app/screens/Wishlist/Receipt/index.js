/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-08-22T23:24:43.919Z
Modified: !date!
Modified By: modifier
*/
import React, {useState} from 'react';
import { createWishlist } from 'app/store/wishlist';
import ReceiptModal from './ReceiptModal';
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

function ReceiptButton({
    wishlistId
}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>Goto receipt</Button>
            <ReceiptModal isOpen={isOpen} onClose={onClose} wishlistId={wishlistId}/>
        </>
    )
}

ReceiptButton.propTypes = {
    wishlistId: PropTypes.string,
}

export default connect(
    null, 
    {},
)(ReceiptButton);