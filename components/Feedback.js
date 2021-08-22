import React from 'react';
import { format, parseISO } from 'date-fns';
import { Box, Heading, Text, Divider, Flex, Icon } from '@chakra-ui/core';

const Feedback = ({ author, text, createdAt, provider, isLast, settings }) => (
  <Box h="full" w="full">
    <Flex align="center" justifyContent="flex-start" width="full">
      <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
        {author}
      </Heading>
      {settings?.icons && (
        <Icon name={provider.slice(0, -4)} size="13px" ml="6px" />
      )}
    </Flex>

    {settings?.timestamp && (
      <Text color="gray.500" mb={4} fontSize="xs">
        {format(parseISO(createdAt), 'PPpp')}
      </Text>
    )}
    <Text color="gray.800" mb={isLast ? 6 : 0}>
      {text}
    </Text>
    {!isLast && (
      <Divider
        borderColor="gray.200"
        backgroundColor="gray.200"
        mt={6}
        mb={6}
      />
    )}
  </Box>
);

export default Feedback;
