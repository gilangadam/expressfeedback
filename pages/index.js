import React from 'react';
import Head from 'next/head';
import { Button, Flex, Text, Icon, Link, Stack, Box } from '@chakra-ui/core';

import { useAuth } from '@/lib/auth';
import { getAllFeedback } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import FeedbackLink from '@/components/FeedbackLink';

const SITE_ID = 'VQvaPS7zv4J7auAxHVBy';

export async function getStaticProps(context) {
  const { feedback } = await getAllFeedback(SITE_ID);

  return {
    props: {
      allFeedback: feedback
    },
    revalidate: 1
  };
}

const Home = ({ allFeedback }) => {
  const auth = useAuth();

  return (
    <Box bg="gray.100" py={16}>
      <Box mb={8}>
        <Flex
          align="center"
          justify="center"
          as="main"
          direction="column"
          maxW="700px"
          margin="0 auto"
        >
          <Head>
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
        <Text mb={4} textAlign="justify" fontSize='lg' px={4} py={8}>
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
            <Flex
              justify={['center', 'center', 'space-between', 'space-between']}
              direction={['column', 'column', 'row', 'row']}
            >
              <Button
                onClick={(e) => auth.signInWithGitHub()}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                leftIcon="github"
                mt={[0, 4, 4, 4]}
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
                mt={[2, 4, 4, 4]}
                mx={[0, 0, 4, 4]}
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
                color="#3BA9EE"
                variant="outline"
                fontWeight="medium"
                leftIcon="twitter"
                mt={[2, 4, 4, 4]}
                size="lg"
                _hover={{ bg: 'blue.100' }}
                _active={{
                  bg: 'white',
                  transform: 'scale(0.95)'
                }}
              >
                Sign In with Twitter
              </Button>
            </Flex>
          )}
        </Flex>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        mt={8}
        px={4}
      >
        <FeedbackLink siteId={SITE_ID} />
        {allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
