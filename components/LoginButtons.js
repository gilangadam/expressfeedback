import { Flex, Button } from '@chakra-ui/core';

import { useAuth } from '@/lib/auth';

const LoginButtons = () => {
  const auth = useAuth();

  return (
    <Flex
      justify={['center', 'center', 'space-between', 'space-between']}
      direction={['column', 'column', 'row', 'row']}
      px={4}
    >
      <Button
        onClick={() => auth.signInWithGitHub()}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        leftIcon="github"
        mt={[8, 8, 4, 4]}
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
        onClick={() => auth.signInWithGoogle()}
        backgroundColor="white"
        color="gray.900"
        variant="outline"
        fontWeight="medium"
        leftIcon="google"
        mt={[8, 8, 4, 4]}
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
        onClick={() => auth.signInWithTwitter()}
        backgroundColor="white"
        color="#3BA9EE"
        variant="outline"
        fontWeight="medium"
        leftIcon="twitter"
        mt={[8, 8, 4, 4]}
        mb={[8, 8, 0, 0]}
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
  );
};

export default LoginButtons;
