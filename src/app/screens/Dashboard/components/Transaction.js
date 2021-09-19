/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-09-12T15:29:41.966Z
Modified: !date!
Modified By: modifier
*/
import React from 'react';
import TransactionRow from './TransactionRow';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Spacer,
    Flex,
    Text,
    Button,
    Stack,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
function Transaction({
  byId,
  fromIds,
  toIds,
  userIds,
  user,
  users,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const transactionUsers = userIds.filter(userId => userId !== user._id)
  // Holds amount owed to everyone(owed = negative. them owing you=positive)
  let transactions = {}
  for(let i=0; i < transactionUsers.length; i++) {
    transactions = {...transactions, [transactionUsers[i]]: 0}
  }

  // Transactions which are from user
  fromIds.forEach(fromId=>{
    const fromTransaction = byId[fromId]
    transactions[fromTransaction.toId] += fromTransaction.amount
  })

  // Transactions which are to the user
  toIds.forEach(toId=>{
    const toTransaction = byId[toId]
    transactions[toTransaction.fromId] -= toTransaction.amount
  })
  const transactionElems = transactionUsers.map(transactionUser => {
    return (
      <TransactionRow 
        key={transactionUser} 
        transactionUser={users[transactionUser]}
        amount={transactions[transactionUser]}
      />
    )
  })
  const transactionTableRow = (id) => {
    const transaction = byId[id]
    const toUser = users[transaction.toId]
    const message = transaction.message
    const amount = transaction.amount
    return (
      <Tr key={id}>
        <Td>{`${toUser.nameFirst} ${toUser.nameLast}`}</Td>
        <Td>{message}</Td>
        <Td>{amount}</Td>
      </Tr>
    )
  }
  const fromTransactionElems = fromIds.map(transactionTableRow)

  const toTransactionElems = toIds.map(transactionTableRow)

  return (
    <>
      <Flex direction='column'>
        {transactionElems}
        <Button marginTop={5} onClick={onOpen}>Transaction History</Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} crollBehavior={'outside'}>
          <ModalOverlay>
          <ModalContent>
              <ModalHeader>Transaction history</ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                  <Flex direction='column'>
                    <Text>From you</Text>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>To</Th>
                          <Th>Message</Th>
                          <Th isNumeric>Amount ($)</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {fromTransactionElems}
                      </Tbody>
                    </Table>
                    <Text>To you</Text>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>From</Th>
                          <Th>Message</Th>
                          <Th isNumeric>Amount ($)</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {toTransactionElems}
                      </Tbody>
                    </Table>
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
Transaction.propTypes = {
  byId: PropTypes.object,
  fromIds: PropTypes.array,
  toIds: PropTypes.array,
  userIds: PropTypes.array,
  user: PropTypes.object,
  users: PropTypes.object,
}
const mapStateToProps = (state) => ({
  byId: state.transaction.byId,
  fromIds: state.transaction.fromIds,
  toIds: state.transaction.toIds,
  userIds: state.auth.allIds,
  user: state.auth.user,
  users: state.auth.byId
});

export default connect(
  mapStateToProps, 
  null,
)(Transaction);