import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Icon,
  useToast
} from '@chakra-ui/core';

import { useAuth } from '@/lib/auth';
import Page from '@/components/Page';

const Login = () => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signInWithEmail } = useAuth();
  const { handleSubmit, register, errors } = useForm();

  const handleClick = () => setShow(!show);

  const onLogin = ({ email, pass }) => {
    setLoading(true);
    signInWithEmail(email, pass).catch((error) => {
      setLoading(false);
      toast({
        title: 'An error occurred',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    });
  };

  return (
    <Flex align="center" justify="center" h="100vh" backgroundColor="gray.100">
      <Stack
        as="form"
        backgroundColor="white"
        borderRadius={[0, 8]}
        errors={errors}
        maxWidth="400px"
        onSubmit={handleSubmit((data) => onLogin(data))}
        px={8}
        py={12}
        register={register}
        shadow={[null, 'md']}
        spacing={4}
        w="100%"
      >
        <Flex justify="center">
          <Box as="a" href="/" aria-label="Back to homepage">
            <Icon color="black" name="logo" size="64px" mb={4} />
          </Box>
        </Flex>
        <FormControl isInvalid={errors.email && errors.email.message}>
          <FormLabel>Email Address</FormLabel>
          <Input
            autoFocus
            aria-label="Email Address"
            id="email"
            name="email"
            ref={register({
              required: 'Please enter your email.'
            })}
            placeholder="email@example.com"
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.pass && errors.pass.message}>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              aria-label="Password"
              name="pass"
              id="password"
              type={show ? 'text' : 'password'}
              ref={register({
                required: 'Please enter a password.'
              })}
              placeholder="enter password"
            />
            <InputRightElement width="4.5rem">
              <Button id="show-password" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.pass && errors.pass.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          id="login"
          type="submit"
          backgroundColor="gray.900"
          color="white"
          isLoading={loading}
          fontWeight="medium"
          mt={4}
          h="50px"
          fontSize="lg"
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)'
          }}
        >
          Login
        </Button>
      </Stack>
    </Flex>
  );
};

const LoginPage = () => (
  <Page name="Login" path="/login">
    <Login />
  </Page>
);

export default LoginPage;
