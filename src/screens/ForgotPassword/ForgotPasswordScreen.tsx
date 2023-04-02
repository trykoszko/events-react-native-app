import { useNavigation } from '@react-navigation/native'
import { Box, Button, Text } from 'native-base'
import React from 'react'
import { ContainerStatic } from '../../components/ContainerStatic'
import i18n from '../../config/i18n'
import { ScreensEnum } from '../../navigation/enums/Screens.enum'
import { ForgotPasswordForm } from './components/ForgotPasswordForm'

export const ForgotPasswordScreen = () => {
    const navigation = useNavigation()

    return (
        <ContainerStatic>
            <Box w="100%" position="relative">

                <Button ml={3} w="30%" onPress={() => {
                    navigation.navigate(ScreensEnum.LOGIN, {})
                }} variant="outline"><Text>&laquo; {i18n.forgotPasswordScreen.goBack}</Text></Button>

                <ForgotPasswordForm />

            </Box>
        </ContainerStatic>
    )
}
