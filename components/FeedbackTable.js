import React from 'react';
import { Box } from '@chakra-ui/core';

import { Table, Tr, Th } from './Table';
import FeedbackRow from './FeedbackRow';

const FeedbackTable = ({ feedback }) => (
  <Box overflowX="scroll">
    <Table w="full">
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th width="50px">{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {feedback.map((item) => (
          <FeedbackRow key={item.id} {...item} />
        ))}
      </tbody>
    </Table>
  </Box>
);

export default FeedbackTable;
