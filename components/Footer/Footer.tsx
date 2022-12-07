import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

export const Footer = () => {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
            display={'flex'}
            flexDirection={'column'}

        >
            <Box>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{base: 'column', md: 'row'}}
                    spacing={4}
                    justify={{base: 'center', md: 'space-between'}}
                    align={{base: 'center', md: 'center'}}>
                    <Text>Copyright © 2022 RE:SHRD</Text>
                    <Text display={{default: 'none', md: 'block'}} >
                        Powered by{' '} <a href="https://github.com/kubo550"
                                           target="_blank"
                                           rel="noopener noreferrer">Jakub Kurdziel</a>
                    </Text>

                </Container>
            </Box>
        </Box>
    );
}