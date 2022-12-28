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
    Stack,
    useColorModeValue,
    useToast, Text
} from "@chakra-ui/react";
import {FC, useEffect} from "react";
import {useAuth} from "../../context/AuthContext";
import {ApiClient} from "../api";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

interface ProductItemProps {
    product: Product;
}

type ProductFormInputs = {
    name: string;
    redirectUrl: string;
}

const schema = yup.object().shape({
    name: yup.string().max(50),
    redirectUrl: yup.string().url().max(500),
});


export const ProductItem: FC<ProductItemProps> = ({product}) => {
    const {title, name, imageUrl, linkUrl, codeId} = product;
    const {getCurrentUserToken} = useAuth();

    const toast = useToast();

    const {
        handleSubmit,
        register,
        setValue,
        reset,
        formState: {errors, isSubmitting, isDirty}
    } = useForm<ProductFormInputs>({
        resolver: yupResolver(schema),
        mode: 'all'
    })

    useEffect(() => {
        setValue('name', name);
        setValue('redirectUrl', linkUrl);
    }, [name, linkUrl, setValue]);


    const handleSaveItem = async ({redirectUrl, name}: ProductFormInputs) => {
        try {
            const token = await getCurrentUserToken() || '';
            const apiClient = new ApiClient(token);
            const {item} = await apiClient.updateItem({codeId, name, linkUrl: redirectUrl});

            toast({
                title: "Item updated",
                status: "success",
                duration: 2000,
                position: "top",
            });

            reset({
                name: item.name,
                redirectUrl: item.linkUrl
            });

        } catch (e) {
            console.log(e);
            toast({
                title: "Error while updating item",
                status: "error",
                duration: 2000,
                position: "top",
            });
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
                    <form onSubmit={handleSubmit(handleSaveItem)}>
                        <Stack spacing={4} width={{sm: '300px', md: '400px'}}>
                            <FormControl>
                                <Input
                                    {...register('name')}
                                    variant={'solid'}
                                    borderWidth={1}
                                    color={'gray.200'}
                                    _placeholder={{
                                        color: 'gray.400',
                                    }}
                                    borderColor={useColorModeValue('gray.300', 'gray.700')}
                                    type={'text'}
                                    required
                                    placeholder={'My super cool product...'}
                                    aria-label={'Name the product'}
                                />
                                <Text color={'red.400'}>
                                    {errors.name && errors.name.message}
                                </Text>
                            </FormControl>

                            <FormControl>
                                <Input
                                    {...register('redirectUrl')}
                                    variant={'solid'}
                                    borderWidth={1}
                                    color={'gray.200'}
                                    _placeholder={{
                                        color: 'gray.400',
                                    }}
                                    borderColor={useColorModeValue('gray.300', 'gray.700')}
                                    type={'text'}
                                    required
                                    placeholder={'e.g. https://www.google.com'}
                                    aria-label={'Redirect link'}
                                />
                                <Text color={'red.400'}>
                                    {errors.redirectUrl && errors.redirectUrl.message}
                                </Text>
                            </FormControl>


                            {
                                isDirty && (
                                    <Button type={'submit'} px={4} marginLeft={'1%'} fontSize={'sm'} rounded={'full'}
                                            bg={'green.400'} color={'white'}
                                            minWidth={'127px'} _hover={{bg: 'green.500',}} marginTop={'8px'}
                                            _focus={{bg: 'green.500',}}
                                            isLoading={isSubmitting}
                                    >
                                        Save
                                    </Button>)
                            }
                        </Stack>

                    </form>
                </Box>
            </Box>
        </Box>
    );
}
