import React from 'react';
import { useHistory } from "react-router-dom";
import Group from './components/Group';
import Transaction from './components/Transaction';

import {
  Spacer,
  Flex,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';

export default function Dashboard() {
  const history = useHistory();

  return (
    <Flex direction='column'>
      <Flex direction='row' justifyContent='center'>
        <Spacer />
        <Group />
        <Spacer />
        <Spacer />
        <Transaction />
        <Spacer />
      </Flex>
    </Flex>
  )
}
