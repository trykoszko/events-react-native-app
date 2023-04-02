import { FontAwesome } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Box, Center, HStack, Icon, Pressable, Text, View } from 'native-base'
import React from 'react'
import { Dimensions } from 'react-native'
import i18n from '../config/i18n'
import { sizes } from '../config/variables'
import { ScreensEnum } from '../navigation/enums/Screens.enum'
import { useAuthStore } from '../store/AuthStore'

export const BottomMenu = () => {
    const {name: routeName} = useRoute()
    const navigation = useNavigation()

    const isAuthenticated = useAuthStore(state => state.isAuthenticated)

    const isHomeTabActive = routeName === ScreensEnum.HOME
    const isEventsTabActive = routeName === ScreensEnum.EVENTS
    const isProfileTabActive = routeName === ScreensEnum.PROFILE
    const isLoginTabActive = routeName === ScreensEnum.LOGIN
    const isRegisterTabActive = routeName === ScreensEnum.REGISTER

    return (
        <View style={{
            position: 'absolute',
            top: Dimensions.get('window').height - sizes.bottomBarHeight,
            left: 0,
            right: 0,
            height: sizes.bottomBarHeight,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white'
        }}>
            <Box width="100%" height="100%" pt={2}>
                <HStack alignItems="center" safeAreaBottom>
                    {isAuthenticated ? (
                        <>
                            <Pressable
                                opacity={isHomeTabActive ? 1 : 0.5}
                                py="3"
                                flex={1}
                                onPress={() => navigation.navigate(ScreensEnum.HOME)}
                            >
                                <Center>
                                    <Icon mb="1" as={<FontAwesome name="home" />} color="black" size="sm" />
                                    <Text color="black" fontSize="12">
                                        {i18n.bottomNavigation.home}
                                    </Text>
                                </Center>
                            </Pressable>
                            <Pressable
                                opacity={isEventsTabActive ? 1 : 0.5}
                                py="2"
                                flex={1}
                                onPress={() => {
                                    navigation.navigate(ScreensEnum.EVENTS)
                                }}
                            >
                                <Center>
                                    <Icon mb="1" as={<FontAwesome name="calendar" />} color="black" size="sm" />
                                    <Text color="black" fontSize="12">
                                        {i18n.bottomNavigation.events}
                                    </Text>
                                </Center>
                            </Pressable>
                            <Pressable
                                opacity={isProfileTabActive ? 1 : 0.5}
                                py="2"
                                flex={1}
                                onPress={() => navigation.navigate(ScreensEnum.PROFILE)}
                            >
                                <Center>
                                    <Icon mb="1" ml="2" as={<FontAwesome name="user" />} color="black" size="sm" />
                                    <Text color="black" fontSize="12">
                                        {i18n.bottomNavigation.profile}
                                    </Text>
                                </Center>
                            </Pressable>
                        </>
                    ) : (
                        <>
                            <Pressable
                                opacity={isLoginTabActive ? 1 : 0.5}
                                py="2"
                                flex={1}
                                onPress={() => navigation.navigate(ScreensEnum.LOGIN)}
                            >
                                <Center>
                                    <Icon mb="1" as={<FontAwesome name="user" />} color="black" size="sm" />
                                    <Text color="black" fontSize="12">
                                        {i18n.bottomNavigation.login}
                                    </Text>
                                </Center>
                            </Pressable>
                            <Pressable
                                opacity={isRegisterTabActive ? 1 : 0.5}
                                py="2"
                                flex={1}
                                onPress={() => navigation.navigate(ScreensEnum.REGISTER)}
                            >
                                <Center>
                                    <Icon mb="1" as={<FontAwesome name="at" />} color="black" size="sm" />
                                    <Text color="black" fontSize="12">
                                        {i18n.bottomNavigation.register}
                                    </Text>
                                </Center>
                            </Pressable>
                        </>
                    )}
                </HStack>
            </Box>
        </View>
    )
}
