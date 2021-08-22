import { Flex, Link } from '@chakra-ui/core';

export default function FeedbackLink({ paths }) {
  return (
    <Flex
      align={['flex-start', 'center']}
      justifyContent="space-between"
      width="full"
      my={8}
      direction={['column', 'row']}
    >
      <Link
        fontWeight="bold"
        fontSize="sm"
        href={`/site/${paths.join('/')}`}
        target="_blank"
      >
        Leave a comment →
      </Link>
      <Link fontSize="xs" color="blackAlpha.500" href="/" target="_blank">
        Powered by Express Feedback
      </Link>
    </Flex>
  );
}
