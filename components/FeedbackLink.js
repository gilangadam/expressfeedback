import { Flex, Link } from '@chakra-ui/core';

import { useTheme } from '@/utils/useTheme';

export default function FeedbackLink({ paths }) {
  const colorMode = useTheme();
  const linkColor = {
    light: 'gray.900',
    dark: 'gray.100'
  };
  return (
    <Flex
      align={['flex-start', 'center']}
      justifyContent="space-between"
      width="full"
      my={8}
      direction={['column', 'row']}
    >
      <Link
        color={linkColor[colorMode]}
        fontWeight="bold"
        fontSize="sm"
        href={`/site/${paths.join('/')}`}
        target="_blank"
      >
        Leave a comment →
      </Link>
      <Link fontSize="xs" color="gray.500" href="/" target="_blank">
        Powered by Express Feedback
      </Link>
    </Flex>
  );
}
