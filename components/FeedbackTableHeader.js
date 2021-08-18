import React from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading
} from '@chakra-ui/core';

const FeedbackTableHeader = () => (
  <Box ms={4}>
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink>Feedback</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent="space-between">
      <Heading mb={8}>My Feedback</Heading>
    </Flex>
  </Box>
);

export default FeedbackTableHeader;
