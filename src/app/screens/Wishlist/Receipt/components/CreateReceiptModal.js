/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-09-26T23:40:33.689Z
Modified: !date!
Modified By: modifier
*/
import { connect } from 'react-redux'
import React, {useState} from 'react';
import { createReceipt } from 'app/store/receipt';
import { loadTransactions } from 'app/store/transaction';

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
    InputGroup
} from '@chakra-ui/react';

import PropTypes from 'prop-types';

function CreateReceiptModal({
    isOpen,
    onClose,
    wishlistId,
    usersById,
    groupById,
    selectedGroup,
    createReceipt,
    loadTransactions,
}) {
    const group = groupById[selectedGroup]
    const groupUserIds = group.userIds
    const groupUsers = groupUserIds.map(userId => usersById[userId])
    const [imgs, setImgs] = useState([])
    const [payerId, setPayerId] = useState(groupUserIds[0])
    const [totalCost, setTotalCost] = useState(0)
    const [tax, setTax] = useState(0)
    const canCreate = (totalCost > 0) && (tax >= 0) && groupUserIds.includes(payerId) && (totalCost > tax)  && (imgs.length > 0)
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Create Receipt</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Flex direction='column'>
                            <FormControl as="fieldset">
                                <ImageUploader imgs={imgs} setImgs={setImgs}/>
                                <FormLabel as="legend">Select Payer</FormLabel>
                                <Flex direction='row' justifyContent='center'>
                                    <RadioGroup onChange={setPayerId} defaultValue={groupUserIds[0]}>
                                        <Stack spacing="24px">
                                            {
                                                groupUsers.map(
                                                    user => {
                                                        return (
                                                            <Radio key={user._id} value={user._id}>
                                                                {`${user.nameFirst} ${user.nameLast}`}
                                                            </Radio>
                                                        )
                                                    }
                                                )
                                            }
                                        </Stack>
                                    </RadioGroup>
                                </Flex>
                                
                                <FormLabel as="legend">Input Total Cost</FormLabel>
                                <InputGroup width='100%' justifyContent='center'>
                                    <InputLeftAddon>$</InputLeftAddon>
                                    <NumberInput onChange={(val) => setTotalCost(Number(val))} width='100%'>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </InputGroup>
                                <FormLabel as="legend">Input Tax</FormLabel>
                                <InputGroup width='100%' justifyContent='center'>
                                    <InputLeftAddon>$</InputLeftAddon>
                                    <NumberInput onChange={(val) => setTax(Number(val))} width='100%'>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </InputGroup>
                                
                                <Flex direction='row' justifyContent='center' marginTop={4}>
                                    <Button 
                                        isDisabled={!canCreate}
                                        onClick={async () => {
                                            let data = new FormData()
                                            data.append('payerId', payerId)
                                            data.append('wishlistId', wishlistId)
                                            data.append('totalCost', totalCost)
                                            data.append('tax', tax)
                                            data.append('receiptImg', imgs[0].file, imgs[0].preview)
                                            await createReceipt(data)
                                            loadTransactions()
                                        }}
                                    >
                                        Create Receipt
                                    </Button>
                                </Flex>
                            </FormControl>
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

CreateReceiptModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    wishlistId: PropTypes.string,
    usersById: PropTypes.object,
    groupById: PropTypes.object,
    selectedGroup: PropTypes.string,
    createReceipt: PropTypes.func,
    loadTransactions: PropTypes.func,
}

const mapStateToProps = (state) => ({
    usersById: state.auth.byId,
    groupById: state.group.byId,
    selectedGroup: state.group.selectedGroup,
});

export default connect(
    mapStateToProps, 
    {
        createReceipt,
        loadTransactions
    },
)(CreateReceiptModal);