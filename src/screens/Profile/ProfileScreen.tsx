import { useNavigation } from '@react-navigation/native'
import { Button, Heading, HStack, Text, VStack } from 'native-base'
import React from 'react'
import { ContainerStatic } from '../../components/ContainerStatic'
import i18n from '../../config/i18n'
import { ScreensEnum } from '../../navigation/enums/Screens.enum'
import { useAuthStore } from '../../store/AuthStore'
import { useNoticeStore } from '../../store/NoticeStore'
import { Profile } from './components/Profile'

export const ProfileScreen = () => {
    const navigation = useNavigation()

    const setGlobalSuccess = useNoticeStore(store => store.setGlobalSuccess)
    const {
        userData,
        setApiToken
    } = useAuthStore(state => state)

    return (
        <ContainerStatic>
            <Heading>
                {i18n.profileScreen.title}
            </Heading>
            <VStack>
                {userData && <Profile userData={userData} />}

                <Heading size="sm" mt={4} mb={2}>{i18n.profileScreen.settings}</Heading>

                <HStack>
                    <Button variant="outline" onPress={() => {
                        navigation.navigate(ScreensEnum.PROFILE_FORM, {})
                    }}>{i18n.profileScreen.manageProfile}</Button>
                    <Text> </Text>
                    <Button colorScheme="danger" onPress={() => {
                        setGlobalSuccess(i18n.profileScreen.loggedOut)
                        setApiToken('')
                    }}>{i18n.profileScreen.logOut}</Button>
                </HStack>
            </VStack>
        </ContainerStatic>
    )
}
