/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-08-23T00:54:31.052Z
Modified: !date!
Modified By: modifier
*/

import React, {useState, useEffect} from 'react';

import { connect } from 'react-redux';
import {loadReceiptItemsByName, loadProductNames, createReceiptItem} from 'app/store/receipt';
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
} from '@chakra-ui/react';
import {
    SearchIcon,
} from '@chakra-ui/icons';
import ProductNameRow from './ProductNameRow';


function CreateReceiptItemModal({ itemById, createReceiptItem, loadProductNames, receipt, receiptNotEditable }) {
    const [searchName, setSearchName] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [itemIds, setItemIds] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            try {
                const loadedItemIds = await loadProductNames(searchName)
                setItemIds(loadedItemIds)
            } 
            catch(e) {
                console.log({e})
            }
        }, 1000)
    
        return () => clearTimeout(delayDebounceFn)
      }, [searchName])
    const selectProductName = (name) => {
        setSearchName(name)
    }
    const loadedItems = itemIds.map(itemId => itemById[itemId])
    const itemRows = loadedItems.map(productName => <ProductNameRow key={productName._id} productName={productName} selectProductName={selectProductName} />)
    return (
        <>
            <Button isDisabled={receiptNotEditable} onClick={onOpen} marginTop={4}>
                Create Receipt Item
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Create Receipt Item</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Flex direction='column'>
                            <InputGroup>
                                <Input onChange={(e) => setSearchName(e.target.value)} value={searchName} placeholder="Put Product Name" />
                                <InputRightElement
                                pointerEvents="none">
                                    <SearchIcon />
                                </InputRightElement>
                            </InputGroup>
                            <Flex direction='column' marginTop={5}>
                                {itemRows}
                            </Flex>
                            <Text>Price</Text>
                            <InputGroup width='100%' justifyContent='center'>
                                <InputLeftAddon>$</InputLeftAddon>
                                <NumberInput onChange={(val) => setPrice(val)}  precision={2} width='100%'>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </InputGroup>
                            <Text>Quantity</Text>
                            <InputGroup width='100%' justifyContent='center'>
                                <NumberInput onChange={(val) => setQuantity(val)}  precision={2} width='100%'>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </InputGroup>
                            <Button marginTop={4} onClick={() => {
                                createReceiptItem(receipt._id, {name: searchName, price: Number(price), quantity: parseInt(quantity)})
                            }}>Create</Button>
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

CreateReceiptItemModal.propTypes = {
    itemById: PropTypes.object,
    loadProductNames: PropTypes.func,
    createReceiptItem: PropTypes.func,
    receipt: PropTypes.object,
    receiptNotEditable: PropTypes.bool,
}

const mapStateToProps = (state) => ({ itemById: state.receipt.productNameById, });

export default connect(
    mapStateToProps,
    {
        loadProductNames,
        createReceiptItem
    }
)(CreateReceiptItemModal);