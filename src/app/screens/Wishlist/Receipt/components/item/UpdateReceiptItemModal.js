/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-08-23T00:54:31.052Z
Modified: !date!
Modified By: modifier
*/

import React, {useState, useEffect} from 'react';

import { connect } from 'react-redux';
import {updateItemPrice, updateItemQuantity, updateWishlistItem} from 'app/store/receipt';
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
    Text,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    InputLeftAddon,
    FormHelperText,
} from '@chakra-ui/react';
import {
    SearchIcon,
} from '@chakra-ui/icons';

import WishlistItemRow from './WishlistItemRow'
import { loadTransactions } from 'app/store/transaction'

function UpdateReceiptItemModal({ isOpen, onClose, receiptItem, receipt, wishlistById, wishlistItemById, updateItemPrice, updateItemQuantity, updateWishlistItem, loadTransactions }) {
    const [linkedWishlistItemId, setLinkedWishlistItemId] = useState(receiptItem.wishlistItemId)
    const [wishlistItemName, setWishlistItemName] = useState(linkedWishlistItemId !== '' ? wishlistItemById[linkedWishlistItemId].name : '')
    const [price, setPrice] = useState(receiptItem.price)
    const [quantity, setQuantity] = useState(receiptItem.quantity)
    const [itemIds, setItemIds] = useState([])
    const wishlistItemIds = wishlistById[receipt.wishlistId].wishlistItemIds
    const wishlistItems = wishlistItemIds.map(wishlistItemId => wishlistItemById[wishlistItemId])
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            try {
                let loadedItemIds = []
                wishlistItems.forEach(wishlistItem => {
                    if(wishlistItem.name.includes(wishlistItemName)) {
                        loadedItemIds = [...loadedItemIds, wishlistItem._id]
                    }
                })
                setItemIds(loadedItemIds)
            } 
            catch(e) {
                console.log({e})
            }
        }, 1000)
    
        return () => clearTimeout(delayDebounceFn)
      }, [wishlistItemName])
    const setWishlistItem = (wishlistItemId) => {
        setLinkedWishlistItemId(wishlistItemId)
        setWishlistItemName(wishlistItemById[wishlistItemId].name)
    }
    const loadedWishlistItems = itemIds.map(loadedItemId => wishlistItemById[loadedItemId])
    const loadedWishlistItemRowElems = loadedWishlistItems.map(
        wishlistItem => <WishlistItemRow key={wishlistItem._id} wishlistItem={wishlistItem} setWishlistItem={setWishlistItem} />
    )
    const wishlistItemIdChanged = receiptItem.wishlistItemId !== linkedWishlistItemId
    const priceChanged = receiptItem.price !== price
    const quantityChanged = receiptItem.quantity !== quantity
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
            <ModalContent>
                <ModalHeader>Update Receipt Item: {receiptItem.name}</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Flex direction='column'>
                        <InputGroup>
                            <Input
                                borderColor={linkedWishlistItemId !== '' && "green.400"}
                                onChange={(e) => setWishlistItemName(e.target.value)} 
                                value={wishlistItemName} 
                                placeholder="Put Wishlist Item Name" />
                            <InputRightElement
                            pointerEvents="none">
                                <SearchIcon />
                            </InputRightElement>
                        </InputGroup>
                        <Flex direction='column' marginTop={5}>
                            {loadedWishlistItemRowElems}
                        </Flex>
                        {linkedWishlistItemId !== '' && <FormHelperText>Wishlist Item Set</FormHelperText>}
                        <Text>Price</Text>
                        <InputGroup width='100%' justifyContent='center'>
                            <InputLeftAddon>$</InputLeftAddon>
                            <NumberInput value={price} onChange={(val) => setPrice(val)} width='100%'>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </InputGroup>
                        <Text>Quantity</Text>
                        <InputGroup width='100%' justifyContent='center' step={1}>
                            <NumberInput value={quantity} onChange={(val) => setQuantity(val)} width='100%'>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </InputGroup>
                        <Button marginTop={4} isDisabled={!wishlistItemIdChanged && !priceChanged && !quantityChanged} onClick={() => {
                            if(wishlistItemIdChanged) {
                                updateWishlistItem(receipt._id, receiptItem._id, linkedWishlistItemId)
                            }
                            if(priceChanged) {
                                updateItemPrice(receipt._id, receiptItem._id, Number(price))
                            }
                            if(quantityChanged) {
                                updateItemQuantity(receipt._id, receiptItem._id, parseInt(quantity))
                            }
                            if(receipt.finishedTransaction) {
                                loadTransactions()
                            }
                        }}>Submit</Button>
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

UpdateReceiptItemModal.propTypes = {
    wishlistById: PropTypes.object,
    wishlistItemById: PropTypes.object,
    loadProductNames: PropTypes.func,
    createReceiptItem: PropTypes.func,
    receiptItem: PropTypes.object,
    onClose: PropTypes.func,
    isOpen: PropTypes.bool,
    receipt: PropTypes.object,
    updateItemPrice: PropTypes.func, 
    updateItemQuantity: PropTypes.func, 
    updateWishlistItem: PropTypes.func,
    loadTransactions: PropTypes.func
}

const mapStateToProps = (state) => ({ wishlistById: state.wishlist.byId, wishlistItemById: state.wishlist.itemById});

export default connect(
    mapStateToProps,
    {
        updateItemPrice,
        updateItemQuantity,
        updateWishlistItem,
        loadTransactions
    }
)(UpdateReceiptItemModal);