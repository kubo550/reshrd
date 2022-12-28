import {Product} from "../../types/products";
import Image from "next/image";
import {
    Box,
    Button,
    FormControl,
    Heading,
    HStack,
    Input,
    Link,
    Tag,
    useColorModeValue,
    useToast
} from "@chakra-ui/react";
import {FC, useState} from "react";
import _ from "lodash";
import {useAuth} from "../../context/AuthContext";
import {ApiClient} from "../api";

interface ProductItemProps {
    product: Product;
}

export const ProductItem: FC<ProductItemProps> = ({product}) => {
    const [initialProduct, setInitialProduct] = useState(product);
    const [localProduct, setLocalProduct] = useState(product);
    const {title, name, imageUrl, linkUrl, codeId} = localProduct;

    const {getCurrentUserToken} = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();


    const hasChanged = !_.isEqual(initialProduct, localProduct);

    const handleSaveItem = async () => {
        setIsLoading(true);
        try {
            const token = await getCurrentUserToken() || '';
            const apiClient = new ApiClient(token);
            const {item} = await apiClient.updateItem(localProduct);
            setInitialProduct(item);
            setLocalProduct(item);

            toast({
                title: "Item updated.",
                status: "success",
                duration: 2000,
            });
        } catch (e) {
            console.log(e);
            toast({
                title: "Error updating item.",
                status: "error",
                duration: 2000,
            });
        }
        finally {
            setIsLoading(false);
        }
    };


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
                    <form>
                        <FormControl>
                            <Input
                                variant={'solid'}
                                borderWidth={1}
                                color={'gray.200'}
                                _placeholder={{
                                    color: 'gray.400',
                                }}
                                borderColor={useColorModeValue('gray.300', 'gray.700')}
                                type={'text'}
                                required
                                placeholder={'Name the product'}
                                aria-label={'Name the product'}
                                value={name} onChange={(e) => setLocalProduct({...localProduct, name: e.target.value})}
                                marginBottom={'20px'}
                            />
                        </FormControl>

                        <FormControl>
                            <Input
                                variant={'solid'}
                                borderWidth={1}
                                color={'gray.200'}
                                _placeholder={{
                                    color: 'gray.400',
                                }}
                                borderColor={useColorModeValue('gray.300', 'gray.700')}
                                type={'text'}
                                required
                                placeholder={'Redirect link'}
                                aria-label={'Redirect link'}
                                value={linkUrl}
                                onChange={(e) => setLocalProduct({...localProduct, linkUrl: e.target.value})}
                            />
                        </FormControl>


                        {
                            hasChanged && (<Button
                                px={4}
                                marginLeft={'1%'}
                                fontSize={'sm'}
                                rounded={'full'}
                                bg={'green.400'}
                                color={'white'}
                                minWidth={'127px'}
                                _hover={{
                                    bg: 'green.500',
                                }}
                                marginTop={'8px'}
                                _focus={{
                                    bg: 'green.500',
                                }}
                                isLoading={isLoading}
                                onClick={handleSaveItem}>
                                Save
                            </Button>)
                        }

                    </form>
                </Box>
            </Box>
        </Box>
    );
}