import Head from 'next/head';
import { Button, Flex, Text, Icon, Link, Stack, Box } from '@chakra-ui/core';

import { useAuth } from '@/lib/auth';

const Home = () => {
  const auth = useAuth();

  return (
    <Box bg="gray.100">
      <Flex
        as="main"
        direction="column"
        align="center"
        justify="center"
        h="100vh"
        maxW="400px"
        margin="0 auto"
      >
        <Head>
          <title>Express Feedback</title>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              if (document.cookie && document.cookie.includes('express-feedback-auth')) {
                window.location.href = "/dashboard"
              }
              `
            }}
          />
        </Head>
        <Icon color="black" name="logo" size="64px" mb={4} />
        <Text mb={4} textAlign="justify" p={8}>
          <Text as="span" fontWeight="bold" display="inline">
            Express Feedback
          </Text>
          {' is built by '}
          <Link
            href="https://github.com/gilangadam"
            isExternal
            textDecoration="underline"
          >
            Gilang Adam
          </Link>
          {` with guidance from `}
          <Link
            href="https://react2025.com"
            isExternal
            textDecoration="underline"
          >
            React 2025
          </Link>
          {`. It's the easiest way to add feedback, comments, or reviews to your static site.`}
        </Text>
        {auth.user ? (
          <Button
            as="a"
            backgroundColor="white"
            color="gray.900"
            variant="outline"
            fontWeight="medium"
            href="/dashboard"
            mt={4}
            size="lg"
            _hover={{ bg: 'gray.100' }}
            _active={{
              bg: 'gray.100',
              transform: 'scale(0.95)'
            }}
          >
            View Dashboard
          </Button>
        ) : (
          <Stack>
            <Button
              onClick={(e) => auth.signInWithGitHub()}
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              leftIcon="github"
              mt={4}
              size="lg"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)'
              }}
            >
              Sign In with GitHub
            </Button>
            <Button
              onClick={(e) => auth.signInWithGoogle()}
              backgroundColor="white"
              color="gray.900"
              variant="outline"
              fontWeight="medium"
              leftIcon="google"
              mt={4}
              size="lg"
              _hover={{ bg: 'gray.100' }}
              _active={{
                bg: 'gray.100',
                transform: 'scale(0.95)'
              }}
            >
              Sign In with Google
            </Button>
            <Button
              onClick={(e) => auth.signInWithTwitter()}
              backgroundColor="white"
              color="blue.400"
              variant="outline"
              fontWeight="medium"
              leftIcon="twitter"
              mt={4}
              size="lg"
              _hover={{ bg: 'blue.100' }}
              _active={{
                bg: 'white',
                transform: 'scale(0.95)'
              }}
            >
              Sign In with Twitter
            </Button>
          </Stack>
        )}
      </Flex>
    </Box>
  );
};

export default Home;
