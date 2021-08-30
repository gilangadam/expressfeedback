import React from 'react';
import { format, parseISO } from 'date-fns';
import { Box, Heading, Text, Divider, Flex, Icon, Code } from '@chakra-ui/core';
import ReactMarkdown from 'react-markdown';

import MDXComponents from './MDXComponents';

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
    <Box color="gray.800" mb={isLast ? 6 : 0}>
      <ReactMarkdown
        source={text}
        renderers={{
          paragraph: MDXComponents.p,
          blockquote: MDXComponents.blockquote,
          link: MDXComponents.a,
          list: MDXComponents.ul,
          listItem: MDXComponents.li,
          table: MDXComponents.table,
          tableHead: MDXComponents.th,
          tableCell: MDXComponents.td,
          code: ({ value }) => (
            <pre>
              <Code borderRadius={8} p={4} my={4}>
                {value}
              </Code>
            </pre>
          ),
          inlineCode: MDXComponents.inlineCode
        }}
      />
    </Box>
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
