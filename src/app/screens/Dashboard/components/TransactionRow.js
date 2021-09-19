/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-09-19T00:36:17.194Z
Modified: !date!
Modified By: modifier
*/
import React, {useState} from 'react';
import { pay } from 'app/store/transaction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Spacer,
    Flex,
    Text,
    Button,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Stack,
    InputGroup,
    InputLeftElement,
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

function TransactionRow({
    transactionUser, amount, user, pay
}) 
{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [inputAmount, setInputAmount] = useState(0)
    const [message, setMessage] = useState(0)

    return (
        <>
            <Flex direction='row' marginTop={5}>
                <Text fontSize='20px'>{`${transactionUser.nameFirst} ${transactionUser.nameLast}`}</Text>
                <Spacer />
                <Spacer />
                <Spacer />
                <Text fontSize='20px' marginLeft={3}>{`$ ${amount}`}</Text>
                <Button onClick={onOpen} marginLeft={3}>Pay</Button>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Pay Amount</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Flex direction='column'>
                            <NumberInput onChange={(val) => setInputAmount(val)}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <Input onChange={(e)=>setMessage(e.target.value)} placeholder='Put message' marginTop={3} />
                            <Button onClick={()=>pay(transactionUser._id, inputAmount, message)} marginTop={4}>Pay</Button>
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
TransactionRow.propTypes = {
    transactionUser: PropTypes.object,
    amount: PropTypes.number,
    user: PropTypes.object,
    pay: PropTypes.func,
}
const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(
mapStateToProps, 
{
    pay
},
)(TransactionRow);