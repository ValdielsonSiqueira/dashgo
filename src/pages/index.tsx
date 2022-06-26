import { Button, Flex, Stack } from "@chakra-ui/react";
import { Input } from '../components/Form/Input';
import { useForm, SubmitHandler } from 'react-hook-form';

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm();

  const handleSignIn: SubmitHandler<SignInFormData> =async(values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values);
  }
  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      >
        <Flex
          as="form"
          w="100%"
          maxWidth={360}
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Input type="email" name="email" label="Email" placeholder="Insira seu email"  {...register('email')} />
            <Input type="password" name="password" label="Senha" placeholder="Insira sua senha" {...register('senha')}  />
            <Button type="submit" mt="6" colorScheme="pink" size="lg" isLoading={formState.isSubmitting}>
              Entrar
            </Button>
          </Stack>
        </Flex>
    </Flex>
  )
}
