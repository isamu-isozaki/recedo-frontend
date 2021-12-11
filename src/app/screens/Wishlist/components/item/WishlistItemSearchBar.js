/*
Author: Isamu Isozaki (isamu.website@gmail.com)
Description: description
Created:  2021-08-23T00:54:31.052Z
Modified: !date!
Modified By: modifier
*/

import React, {useState, useEffect} from 'react';

import { connect } from 'react-redux';
import {loadWishlistItemsByName, createWishlistItem} from 'app/store/wishlist';
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
} from '@chakra-ui/react';
import {
    SearchIcon,
} from '@chakra-ui/icons';
import WishlistItemSearchRow from './WishlistItemSearchRow';


function WishlistItemSearchBar({ itemById, createWishlistItem, loadWishlistItemsByName, wishlist }) {
    const [searchName, setSearchName] = useState('')
    const [itemIds, setItemIds] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            try {
                const loadedItemIds = await loadWishlistItemsByName(searchName)
                setItemIds(loadedItemIds)
            } 
            catch(e) {
                console.log({e})
            }
        }, 1000)
    
        return () => clearTimeout(delayDebounceFn)
      }, [searchName])
    // Search for users
    let isNewItem = true
    itemIds.forEach(itemId=> {
        if(searchName === itemById[itemId].name) {
            isNewItem = false
        }
    })
    const loadedItems = itemIds.map(itemId => itemById[itemId])
    const itemRows = loadedItems.map(wishlistItem => <WishlistItemSearchRow key={wishlistItem._id} wishlistItem={wishlistItem} wishlist={wishlist} onClose={onClose} />)
    return (
        <>
            <Button onClick={onOpen}>
                <InputGroup>
                    <Input isReadOnly={true} placeholder="Put wishlist item" />
                    <InputRightElement
                    pointerEvents="none">
                        <SearchIcon />
                    </InputRightElement>
                </InputGroup>
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Item Search</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Flex direction='column'>
                            <InputGroup>
                                <Input onChange={(e) => setSearchName(e.target.value)} placeholder="Put wishlist item" />
                                <InputRightElement
                                pointerEvents="none">
                                    <SearchIcon />
                                </InputRightElement>
                            </InputGroup>
                            <Flex direction='column' marginTop={5}>
                                {itemRows}
                            </Flex>
                            {isNewItem && (
                                <Button marginTop={3} onClick={() => {
                                    createWishlistItem(wishlist._id, searchName)
                                    onClose()
                                }}>Create Item</Button>
                            )}
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

WishlistItemSearchBar.propTypes = {
    itemById: PropTypes.object,
    loadWishlistItemsByName: PropTypes.func,
    createWishlistItem: PropTypes.func,
    wishlist: PropTypes.object,
}

const mapStateToProps = (state) => ({ itemById: state.wishlist.itemById, });

export default connect(
    mapStateToProps,
    {
        loadWishlistItemsByName,
        createWishlistItem
    }
)(WishlistItemSearchBar);