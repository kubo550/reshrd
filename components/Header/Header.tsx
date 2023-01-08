import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Link,
    Popover,
    PopoverTrigger,
    useColorModeValue,
    useDisclosure,

} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
} from '@chakra-ui/icons';
import {useRouter} from "next/router";
import {useAuth} from "../../context/AuthContext";
import NextLink from 'next/link';
import Image from "next/image";
import {FC} from "react";


const navItems = [
    {
        label: 'Manage your items',
        href: '/',
        protected: true,
    },
    {
        label: 'How does it work',
        href: 'https://reshrd.com/pages/how-changeable-qr-code-clothing-works',
        protected: false,
    },
    {
        label: 'Contact us',
        href: '/contact',
        protected: false,

    }, {
        label: 'Shop',
        href: 'https://reshrd.com/collections/all',
        protected: false,

    },
] as const;

export function Header() {
    const {isOpen, onToggle} = useDisclosure();
    const {currentUser, logout} = useAuth();

    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        await router.push('/login');
    }

    const hideMenu = () => {
        if (isOpen) {
            onToggle();
        }
    }


    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{base: 2}}
                px={{base: 4}}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{base: 1, md: 'auto'}}
                    ml={{base: -2}}
                    display={{base: 'flex', md: 'none'}}>
                    <IconButton onClick={onToggle}
                                icon={isOpen ? <CloseIcon w={3} h={3}/> : <HamburgerIcon w={5} h={5}/>}
                                variant={'ghost'}
                                aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{base: 1}} justify={{base: 'center', md: 'start'}}>
                    <NextLink href={currentUser ? '/' : '/login'}>
                        <div>
                            <Image src={'/logo_white_200x.png'} alt="logo" width={150} height={21}/>
                        </div>
                    </NextLink>

                    <Flex display={{base: 'none', md: 'flex'}} mx={'auto'}>
                        <DesktopNav/>
                    </Flex>
                </Flex>

                <Stack
                    flex={{base: 1, md: 0}}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    {!currentUser ? (<>
                            <NextLink href={'/login'}>
                                <Button fontSize={'sm'} fontWeight={400} variant={'link'} marginTop={'10px'}>
                                    Sign In
                                </Button>
                            </NextLink>
                            <NextLink href={'/register'}>
                                <Button
                                    display={{base: 'none', md: 'inline-flex'}}
                                    fontSize={'sm'}
                                    fontWeight={600}
                                >
                                    Sign Up
                                </Button>
                            </NextLink>
                        </>
                    ) : (
                        <Flex justify={{base: 'center', md: 'start'}}>
                            <Text marginTop={'6px'} marginRight={'6px'} display={{base: 'none', md: 'flex'}}>
                                {currentUser?.email}
                            </Text>
                            <Button onClick={handleLogout} fontSize={'sm'} fontWeight={400}>Log out</Button>
                        </Flex>
                    )}
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav hideMenu={hideMenu}/>
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const linkActiveColor = useColorModeValue('gray.900', 'black.300');
    const {currentUser} = useAuth();

    const router = useRouter()


    const isCurrentPath = (path: string) => {
        return router.pathname === path
    }

    return (
        <Stack direction={'row'} spacing={4}>
            {navItems.map((navItem) => {
                const isCurrent = isCurrentPath(navItem.href);

                const isExternal = navItem.href.startsWith('http');

                return (
                    <Box key={navItem.label}>
                        <Popover trigger={'hover'} placement={'bottom-start'}>
                            <PopoverTrigger>
                                {isExternal ? (
                                    <Link p={2}
                                          fontSize={'sm'}
                                          fontWeight={500}
                                          color={isCurrent ? linkActiveColor : linkColor}
                                          _hover={{
                                              textDecoration: 'none',
                                              color: linkHoverColor,
                                          }}
                                          as={NextLink}
                                          href={navItem.href} target={'_blank'} rel={'noreferrer'}>
                                        {navItem.label}
                                    </Link>
                                ) : (
                                    <Link
                                        p={2}
                                        fontSize={'sm'}
                                        fontWeight={500}
                                        color={isCurrent ? linkActiveColor : linkColor}
                                        _hover={{
                                            textDecoration: 'none',
                                            color: linkHoverColor,
                                        }}
                                        as={NextLink}
                                        href={navItem.protected ? !!currentUser ? navItem.href : '/login' : navItem.href}
                                    >

                                        {navItem.label}
                                    </Link>
                                )}
                            </PopoverTrigger>
                        </Popover>
                    </Box>
                );
            })}
        </Stack>
    );
};

const MobileNav: FC<{ hideMenu: () => void }> = ({hideMenu}) => {
    return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{md: 'none'}}>
            {navItems.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} hideMenu={hideMenu}/>
            ))}
        </Stack>
    );
};

type MobileNavItemProps = { label: string, href: string, hideMenu: () => void, protected?: boolean };
const MobileNavItem: FC<MobileNavItemProps> = ({label, href, hideMenu, protected: isProtected}) => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const linkActiveColor = useColorModeValue('gray.900', 'black.300');

    const router = useRouter()


    const isCurrentPath = (path: string) => {
        return router.pathname === path
    }
    const isExternal = href.startsWith('http');


    const isCurrent = isCurrentPath(href);
    const {currentUser} = useAuth();
    return (
        <Stack spacing={4}>
            {
                isExternal ? (
                    <Link href={href} p={2}
                          fontSize={'sm'}
                          fontWeight={500}
                          color={isCurrent ? linkActiveColor : linkColor}
                          _hover={{
                              textDecoration: 'none',
                              color: linkHoverColor,
                          }} target={'_blank'} rel={'noreferrer'}>
                        {label}
                    </Link>
                ) : (
                    <Link as={NextLink}
                          href={isProtected ? !!currentUser ? href : '/login' : href}
                          onClick={hideMenu}
                          p={2}
                          fontSize={'sm'}
                          fontWeight={500}
                          color={isCurrent ? linkActiveColor : linkColor}
                          _hover={{
                              textDecoration: 'none',
                              color: linkHoverColor,
                          }}
                    >
                        {label}
                    </Link>
                )
            }

        </Stack>
    );
};
