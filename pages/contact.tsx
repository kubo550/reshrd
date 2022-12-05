import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from "react";
import {useAuth} from "../context/AuthContext";
// import {reshrdMailer} from "../infrastructure/email-service";
import Mail from "nodemailer/lib/mailer";
import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    IconButton,
    Button,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
} from '@chakra-ui/react';

export default function Contact() {
    const {currentUser} = useAuth();
    const [email, setEmail] = useState(currentUser?.email || "");
    const [message, setMessage] = useState("");


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const emailConfig: Mail.Options = {
            subject: "Qr id contact form",
            to: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'qwercy142@gmail.com',
            from: email,
            sender: 'Qr id contact form',
            text: message,
        };



        try {
            // await reshrdMailer.send(emailConfig);
            console.log(
                'sending email is not implemented yet',
            )
            setMessage("");
            setEmail("");

        } catch (e) {

        }
    }

    return (
        <Container maxW="full" height={'84vh'} mt={0} centerContent overflow="hidden">
            <Flex>
                <Box
                    bg="#02054B"
                    color="white"
                    borderRadius="lg"
                    m={{ sm: 4, md: 16, lg: 10 }}
                    p={{ sm: 5, md: 5, lg: 16 }}>
                    <Box p={4}>
                        <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                            <WrapItem>
                                <Box>
                                    <Heading>Contact</Heading>
                                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                                        Fill up the form below to contact
                                    </Text>
                                    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                                        <VStack pl={0} spacing={3} alignItems="flex-start">
                                            <Button
                                                size="md"
                                                height="48px"
                                                width="200px"
                                                variant="ghost"
                                                color="#DCE2FF"
                                                _hover={{ border: '2px solid #1C6FEB' }}
                                            >
                                                +48 988888888
                                            </Button>
                                            <Button
                                                size="md"
                                                height="48px"
                                                width="200px"
                                                variant="ghost"
                                                color="#DCE2FF"
                                                _hover={{ border: '2px solid #1C6FEB' }}
                                            >
                                                contact@reshrd.com
                                            </Button>
                                            <Button
                                                size="md"
                                                height="48px"
                                                width="200px"
                                                variant="ghost"
                                                color="#DCE2FF"
                                                _hover={{ border: '2px solid #1C6FEB' }}
                                            >
                                                Gdańsk, Poland
                                            </Button>
                                        </VStack>
                                    </Box>
                                    <HStack
                                        mt={{ lg: 10, md: 10 }}
                                        spacing={5}
                                        px={5}
                                        alignItems="flex-start">
                                    </HStack>
                                </Box>
                            </WrapItem>
                            <WrapItem>
                                <Box bg="white" borderRadius="lg">
                                    <Box m={8} color="#0B0E3F">
                                        <VStack spacing={5}>
                                            <FormControl id="name">
                                                <FormLabel>Mail</FormLabel>
                                                <InputGroup borderColor="#E0E1E7">
                                                    <InputLeftElement
                                                        pointerEvents="none"
                                                    />
                                                    <Input type="text" size="md" value={email} onChange={e => setEmail(e.target.value)} />
                                                </InputGroup>
                                            </FormControl>
                                            <FormControl id="name">
                                                <FormLabel>Message</FormLabel>
                                                <Textarea
                                                    placeholder="Type your message here"
                                                    borderColor="gray.300"
                                                    height={200}
                                                    _hover={{
                                                        borderRadius: 'gray.300',
                                                    }}
                                                />
                                            </FormControl>
                                            <FormControl id="name" float="right">
                                                <Button
                                                    variant="solid"
                                                    bg="#0D74FF"
                                                    color="white"
                                                    _hover={{}}>
                                                    Send Message
                                                </Button>
                                            </FormControl>
                                        </VStack>
                                    </Box>
                                </Box>
                            </WrapItem>
                        </Wrap>
                    </Box>
                </Box>
            </Flex>
        </Container>
    );
}
