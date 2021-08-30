import Head from 'next/head';
import { Button, Flex, Text, Icon, Link, Box } from '@chakra-ui/core';

import { useAuth } from '@/lib/auth';
import { getAllFeedback, getSite } from '@/lib/db-admin';
import Footer from '@/components/Footer';
import Feedback from '@/components/Feedback';
import FeedbackLink from '@/components/FeedbackLink';
import LoginButtons from '@/components/LoginButtons';

const SITE_ID = process.env.NEXT_PUBLIC_HOME_PAGE_SITE_ID;

export async function getStaticProps(context) {
  const { feedback } = await getAllFeedback(SITE_ID);
  const { site } = await getSite(SITE_ID);

  return {
    props: {
      allFeedback: feedback,
      site
    },
    revalidate: 1
  };
}

const Home = ({ allFeedback, site }) => {
  const auth = useAuth();

  return (
    <Box bg="gray.100" py={16} minHeight="100vh" h="100%">
      <Box mb={8}>
        <Flex
          align="center"
          justify="center"
          as="main"
          direction="column"
          maxWidth={['320px', '425px', '768px', '75%']}
          margin="0 auto"
        >
          <Head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
              if (document.cookie && document.cookie.includes('express-feedback-auth')) {
                window.location.href = "/sites"
              }
              `
              }}
            />
          </Head>
          <Icon color="black" name="logo" size={['48px', '64px']} my={4} />
          <Text
            maxWidth={['320px', '425px', '768px', '1024px']}
            textAlign="justify"
            fontSize={['md', 'lg']}
            px={4}
            py={8}
          >
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
              backgroundColor="gray.900"
              color="white"
              variant="outline"
              fontWeight="medium"
              href="/sites"
              mt={[8, 8, 4, 4]}
              size="lg"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)'
              }}
            >
              View Dashboard
            </Button>
          ) : (
            <LoginButtons />
          )}
        </Flex>
      </Box>
      <Flex
        bg="white"
        display="flex"
        flexDirection="column"
        width="full"
        borderRadius={4}
        maxWidth={['350px', '425px', '768px', '1024px']}
        margin="0 auto"
        px={4}
      >
        <FeedbackLink paths={[SITE_ID]} />
        {allFeedback.map((feedback, index) => (
          <Feedback
            key={feedback.id}
            settings={site?.settings}
            isLast={index === allFeedback.length - 1}
            {...feedback}
          />
        ))}
      </Flex>
      <Footer />
    </Box>
  );
};

export default Home;
