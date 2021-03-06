/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-09-26T23:40:33.689Z
Modified: !date!
Modified By: modifier
*/
import { connect } from 'react-redux'
import React, {useState, useRef} from 'react';
import ImageUploader from 'app/components/ImageUploader';
import JsonUploader from 'app/components/JsonUploader';
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
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    Stack,
    FormHelperText,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    InputLeftAddon,
    InputGroup,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react'

import {createReceiptImg, createReceiptItem, updatePayer, updateTax, updateTotalCost} from 'app/store/receipt'
import {loadWishlist} from 'app/store/wishlist';
import {loadReceipt} from 'app/store/receipt';


import PropTypes from 'prop-types'
import CreateReceiptItemModal from './item/CreateReceiptItemModal'
import ReceiptItemRow from './item/ReceiptItemRow'
import {getJson} from 'app/api/receipt'

function DefaultReceiptModal({
    receipt,
    isOpen,
    onClose,
    usersById,
    groupById,
    selectedGroup,
    createReceiptImg,
    createReceiptItem,
    updatePayer, 
    updateTax, 
    updateTotalCost,
    loadWishlist,
    loadReceipt
}) {
    const group = groupById[selectedGroup]
    const [imgs, setImgs] = useState([])
    const groupUserIds = group.userIds
    const groupUsers = groupUserIds.map(userId => usersById[userId])
    const [payerId, setPayerId] = useState(receipt.payerId)
    const [totalCost, setTotalCost] = useState(receipt.totalCost)
    const [tax, setTax] = useState(receipt.tax)
    const canUpload = imgs && imgs.length > 0
    const canUpdateParams = receipt.payerId !== payerId || receipt.totalCost !== totalCost || receipt.tax !== tax
    // totalCost+tax+more uploads
    const itemIds = Object.keys(receipt.receiptItems)
    const receiptItems = itemIds.map(itemId => receipt.receiptItems[itemId])
    let receiptItemTotal = 0
    receiptItems.forEach(receiptItem => {
        receiptItemTotal+=Number((receiptItem.price*receiptItem.quantity).toFixed(2))
    })
    const receiptNotEditable = receipt.finishedTransaction
    
    const uploadJson = async (file) => {
        const json = JSON.parse(await file.text())
        if(!!json['items'] & !!json['prices'] & !!json['quantities'] & (json['items'].length === json['prices'].length) & (json['prices'].length === json['quantities'].length)){
            const items = json['items']
            const prices = json['prices']
            const quantities = json['quantities']
            for(let i=0; i<items.length; i++){
                await createReceiptItem(receipt._id, {name: items[i], price: Number(prices[i]), quantity: Number(quantities[i])})
            }
            // Load wishlist items
            await loadWishlist(receipt.wishlistId);
            await loadReceipt(receipt._id);
        }
    }

    const downloadReceipt = async () => {
        const {payload} = await getJson(receipt._id)
        const blob = new Blob([JSON.stringify(payload)], {type: "application/json"})
        const a = document.createElement('a')
        a.download = payload['payer']['nameFirst']+'_'+payload['wishlist']['name']+'.json'
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()   
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
            <ModalContent maxW="60rem">
                <ModalHeader>Receipt</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <FormControl as="fieldset">
                        <Flex direction='column'>
                            <ImageUploader imgs={imgs} setImgs={setImgs}/>
                            <Button marginTop={5} isDisabled={!canUpload} onClick={() => {
                                let data = new FormData()
                                data.append('receiptId', receipt._id)
                                data.append('receiptImg', imgs[0].file, imgs[0].preview)
                                createReceiptImg(data)
                            }}>Upload Image</Button>
                        
                            <FormLabel as="legend">Select Payer</FormLabel>
                            <Flex direction='row' justifyContent='center'>
                                <RadioGroup onChange={setPayerId} defaultValue={receipt.payerId}>
                                    <Stack spacing="24px">
                                        {
                                            groupUsers.map(
                                                user => {
                                                    return (
                                                        <Radio key={user._id} value={user._id} isDisabled={receiptNotEditable}>
                                                            {`${user.nameFirst} ${user.nameLast}`}
                                                        </Radio>
                                                    )
                                                }
                                            )
                                        }
                                    </Stack>
                                </RadioGroup>
                            </Flex>
                            
                            <FormLabel as="legend">Input Subtotal Cost(Without tax)</FormLabel>
                            <InputGroup width='100%' justifyContent='center'>
                                <InputLeftAddon>$</InputLeftAddon>
                                <NumberInput isDisabled={receiptNotEditable} defaultValue={receipt.totalCost} onChange={(val) => setTotalCost(Number(val))} width='100%'>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </InputGroup>
                            <FormLabel as="legend">Input Tax/Fees(Can be negative)</FormLabel>
                            <InputGroup width='100%' justifyContent='center'>
                                <InputLeftAddon>$</InputLeftAddon>
                                <NumberInput isDisabled={receiptNotEditable} defaultValue={receipt.tax} onChange={(val) => setTax(Number(val))} width='100%'>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </InputGroup>
                            
                            <Flex direction='row' justifyContent='center' marginTop={4}>
                                <Button 
                                isDisabled={!canUpdateParams || receiptNotEditable}
                                onClick={() => {
                                    if(receipt.payerId !== payerId) {
                                        updatePayer(receipt._id, payerId)
                                    }
                                    if(receipt.tax !== tax) {
                                        updateTax(receipt._id, tax)
                                    }
                                    if(receipt.totalCost !== totalCost) {
                                        updateTotalCost(receipt._id, totalCost)
                                    }
                                }}>Submit Changes</Button>
                            </Flex>
                            <FormLabel as="legend">Receipt Items</FormLabel>
                            {receiptNotEditable && <Button onClick={downloadReceipt}>Download recipt</Button>}
                            <JsonUploader uploadJson={uploadJson} canUpload={!receiptNotEditable} />
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Item Name</Th>
                                        <Th>Price</Th>
                                        <Th>Quantity</Th>
                                        <Th>Total</Th>
                                        <Th>Wishlist Item</Th>
                                        <Th>Edit</Th>
                                        <Th>Delete</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {receiptItems.map(receiptItem => <ReceiptItemRow key={receiptItem._id} receiptItem={receiptItem} receipt={receipt} receiptNotEditable={receiptNotEditable} />)}
                                </Tbody>
                            </Table>
                            <Text>${(receipt.totalCost-receiptItemTotal).toFixed(2)} unaccounted for by items</Text>
                            <CreateReceiptItemModal  receiptNotEditable={receiptNotEditable} receipt={receipt} />
                        </Flex>
                    </FormControl>
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

DefaultReceiptModal.propTypes = {
    receipt: PropTypes.object,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    usersById: PropTypes.object,
    groupById: PropTypes.object,
    selectedGroup: PropTypes.string,
    createReceiptImg: PropTypes.func,
    createReceiptItem: PropTypes.func,
    updatePayer: PropTypes.func,
    updateTax: PropTypes.func,
    updateTotalCost: PropTypes.func,
    loadWishlist: PropTypes.func,
    loadReceipt: PropTypes.func,

}

const mapStateToProps = (state) => ({
    usersById: state.auth.byId,
    groupById: state.group.byId,
    selectedGroup: state.group.selectedGroup,
    deepUpdate: state.receipt.deepUpdate,
});

export default connect(
    mapStateToProps, 
    {
        createReceiptImg,
        updatePayer, 
        updateTax, 
        updateTotalCost,
        createReceiptItem,
        loadWishlist,
        loadReceipt
    },
)(DefaultReceiptModal);