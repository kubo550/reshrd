import {Product} from "../../types/products";
import Image from "next/image";
import {Box, FormControl, Heading, HStack, Input, Link, Tag, Text, useColorModeValue} from "@chakra-ui/react";

interface ProductItemProps {
    product: Product;
    onEditName: (name: string) => void;
    onEditLink: (link: string) => void;
}

export const ProductItem = ({product, onEditName, onEditLink}: ProductItemProps) => {
    const {title, name, imageUrl, linkUrl, codeId} = product
    return (
        <Box
            marginTop={{base: '1', sm: '5'}}
            marginBottom={{base: '1', sm: '5'}}
            display="flex"
            flexDirection={{base: 'column', sm: 'row'}}
            justifyContent="space-between">
            <Box
                display="flex"
                flex="1"
                marginRight="3"
                position="relative"
                alignItems="center">
                <Box
                    width={{base: '100%', sm: '85%'}}
                    zIndex="2"
                    marginLeft={{base: '0', sm: '5%'}}
                    marginTop="5%">
                    <Image
                        src={imageUrl}
                        alt="some good alt text"
                        width={400}
                        height={400}
                    />
                </Box>
                <Box zIndex="1" width="100%" position="absolute" height="100%">
                    <Box
                        bgGradient={useColorModeValue(
                            'radial(orange.600 1px, transparent 1px)',
                            'radial(orange.300 1px, transparent 1px)'
                        )}
                        backgroundSize="20px 20px"
                        opacity="0.4"
                        height="100%"
                    />
                </Box>
            </Box>
            <Box display="flex" flex="1" flexDirection="column" justifyContent="center"
                 marginTop={{base: '3', sm: '0'}}>

                <HStack spacing={2}>
                    <Tag size={'md'} variant="solid" colorScheme="orange">
                        #{codeId}
                    </Tag>
                </HStack>

                <Heading marginTop="1">
                    <Link textDecoration="none" _hover={{textDecoration: 'none', cursor: 'text'}}>
                        {title}
                    </Link>
                </Heading>


                <Box marginTop="10">

                    <FormControl>
                        <Input
                            variant={'solid'}
                            borderWidth={1}
                            color={'gray.800'}
                            _placeholder={{
                                color: 'gray.400',
                            }}
                            borderColor={useColorModeValue('gray.300', 'gray.700')}
                            type={'text'}
                            required
                            placeholder={'Name the product'}
                            aria-label={'Name the product'}
                            value={name} onChange={(e) => onEditName(e.target.value)}
                            marginBottom={'20px'}
                        />
                    </FormControl>

                    <FormControl>
                        <Input
                            variant={'solid'}
                            borderWidth={1}
                            color={'gray.800'}
                            _placeholder={{
                                color: 'gray.400',
                            }}
                            borderColor={useColorModeValue('gray.300', 'gray.700')}
                            type={'text'}
                            required
                            placeholder={'Redirect link'}
                            aria-label={'Redirect link'}
                            value={linkUrl} onChange={(e) => onEditLink(e.target.value)}
                        />
                    </FormControl>
                </Box>
            </Box>
        </Box>
    );
}