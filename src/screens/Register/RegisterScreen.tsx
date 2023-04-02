import { useNavigation } from '@react-navigation/native'
import { Box, Button, Heading, Spinner, Text } from 'native-base'
import React from 'react'
import { ContainerScrollable } from '../../components/ContainerScrollable'
import i18n from '../../config/i18n'
import { RegisterForm } from './components/RegisterForm'


export const RegisterScreen = () => {
    const navigation = useNavigation()

    return (
        <ContainerScrollable>

            <Button
                w="30%"
                onPress={() => {
                    navigation.goBack()
                }}
                variant="outline"
            >
                <Text>&laquo; {i18n.registerScreen.goBack}</Text>
            </Button>

            <Box pt={6}>

                <Heading>
                    {i18n.registerScreen.title}
                </Heading>

                <RegisterForm />

            </Box>

        </ContainerScrollable>
    )
}
