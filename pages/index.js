import Head from 'next/head';

import { Button, Flex, Icon } from '@chakra-ui/core';
import { useAuth } from '@/lib/auth';

const Home = () => {
  const auth = useAuth();

  return (
    <>
      <Flex
        as="main"
        direction="column"
        align="center"
        justify="center"
        h="100vh"
      >
        <Head>
          <title>Express Feedback</title>
        </Head>
        <Icon color="black" name="logo" size="64px" />
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
    </>
  );
};

export default Home;
