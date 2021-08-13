import Head from 'next/head';
import { Button, Heading, Text, Code } from '@chakra-ui/core';
import { useAuth } from '@/lib/auth';

const Home = () => {
  const auth = useAuth();
  return (
    <div className="container">
      <Head>
        <title>Express Feedback</title>
      </Head>

      <main>
        <h1 className="title">Express Feedback</h1>
        <Text>
          Current user:{' '}
          <Code>
            {auth.user
              ? auth.user.email
                ? auth.user.email
                : auth.user.name
              : 'None'}
          </Code>
        </Text>
        {auth?.user ? (
          <Button onClick={(e) => auth.signOut()}>Sign Out</Button>
        ) : (
          <>
            <Button onClick={(e) => auth.signInWithGitHub()}>
              GitHub Sign In
            </Button>
            <Button onClick={(e) => auth.signInWithGoogle()}>
              Google Sign In
            </Button>
            <Button onClick={(e) => auth.signInWithTwitter()}>
              Twitter Sign In
            </Button>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
