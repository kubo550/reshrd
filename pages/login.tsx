import Head from "next/head";
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";
import NextLink from "next/link";
import {useAuth} from "../context/AuthContext";
import {useRouter} from "next/navigation";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue, FormErrorMessage, InputRightElement, InputGroup,
} from '@chakra-ui/react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
});

type LoginFormInputs = {
    email: string;
    password: string;
};

export default function Login() {
    const [error, setError] = useState("");
    const router = useRouter();
    const {login} = useAuth();
    const [showingPass, setShowingPass] = useState(false);

    const {currentUser} = useAuth();

    useEffect(() => {
        if (currentUser) {
            router.push('/');
        }

    }, [currentUser, router]);

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting}
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data: LoginFormInputs) => {
        setError('');
        try {
            await login(data.email, data.password);
            router.push('/');
        } catch (e) {
            console.log(e);
            setError('Failed to login, please try again or contact support');
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Login - Updateable QR Clothing Control Panel | RESHRD</title>
            </Head>

            <main className={styles.main}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex
                        align={'center'}
                        justify={'center'}
                    >
                        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}
                               bg={useColorModeValue('gray.50', 'gray.800')}>
                            <Stack align={'center'}>
                                <Heading fontSize={{sm: 'xl', md: '4xl'}}>Sign in</Heading>
                                <Text fontSize={{sm: 'sm', md: 'lg'}} color={'gray.600'}>
                                    to manage your RESHRD items ✌️
                                </Text>
                            </Stack>

                            {
                                error && <Text style={{margin: '10px auto 2px'}} color={'red.500'}>{error}</Text>
                            }

                            <Box
                                rounded={'lg'}
                                bg={useColorModeValue('white', 'gray.700')}
                                boxShadow={'lg'}
                                p={8}>
                                <Stack spacing={4} width={{sm: '300px', md: '400px'}}>
                                    <FormControl isInvalid={!!errors.email}>
                                        <FormLabel htmlFor="email">Email</FormLabel>

                                        <Input
                                            id="email"
                                            placeholder="johndoe@email.com"
                                            {...register('email')}
                                        />

                                        <FormErrorMessage>
                                            {errors.email && errors.email.message}
                                        </FormErrorMessage>
                                    </FormControl>


                                    <FormControl isInvalid={!!errors.password}>
                                        <FormLabel htmlFor="password">Password</FormLabel>
                                        <InputGroup>
                                            <Input id="password"
                                                   placeholder={'********'}
                                                   type={showingPass ? 'text' : 'password'} {...register('password')} />

                                            <InputRightElement h={'full'}>
                                                <Button
                                                    variant={'ghost'}
                                                    onClick={() =>
                                                        setShowingPass((showPassword) => !showPassword)
                                                    }>
                                                    {showingPass ? <ViewIcon/> : <ViewOffIcon/>}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>

                                        <FormErrorMessage>
                                            {errors.password && errors.password.message}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <Stack spacing={10} pt={2}>
                                        <Button
                                            mt={4}
                                            colorScheme="teal"
                                            isLoading={isSubmitting}
                                            type="submit">
                                            Sign in
                                        </Button>

                                        <Stack pt={6}>
                                            <Text align={'center'}>
                                                Don&lsquo;t have an account? <Link as={NextLink} href={'/register'}
                                                                                   color={'blue.400'}>Sign up</Link>
                                            </Text>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Stack>
                    </Flex>
                </form>
            </main>

        </div>
    );
}