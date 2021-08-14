import Head from 'next/head';
import { Button, Flex, Text, Icon, Link } from '@chakra-ui/core';

import { useAuth } from '@/lib/auth';

const Home = () => {
  const auth = useAuth();

  return (
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
      <Icon color="black" name="logo" size="42px" mb={2} />
      <Text mb={4} textAlign="justify">
        <Text as="span" fontWeight="bold" display="inline">
          Express Feedback
        </Text>
        {' is being built as part of '}
        <Link
          href="https://react2025.com"
          isExternal
          textDecoration="underline"
        >
          React 2025
        </Link>
        {` by `}
        <Link
          href="https://github.com/leerob/"
          isExternal
          textDecoration="underline"
        >
          Lee Robinson
        </Link>
        {`. It's the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in. This version is made by `}
        <Link
          href="https://github.com/gilangadam"
          isExternal
          textDecoration="underline"
        >
          Gilang Adam
        </Link>
        {`.`}
      </Text>
      {auth.user ? (
        <Button as="a" mt={4} size="sm" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <>
          <Button mt={4} size="sm" onClick={(e) => auth.signInWithGitHub()}>
            Github Sign In
          </Button>
          <Button mt={4} size="sm" onClick={(e) => auth.signInWithGoogle()}>
            Google Sign In
          </Button>
          <Button mt={4} size="sm" onClick={(e) => auth.signInWithTwitter()}>
            Twitter Sign In
          </Button>
        </>
      )}
    </Flex>
  );
};

export default Home;
