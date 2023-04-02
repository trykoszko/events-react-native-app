import { Box, Center, Heading, Spinner, VStack } from 'native-base'
import React, { useState } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { ContainerStatic } from '../../components/ContainerStatic'
import i18n from '../../config/i18n'
import { LoginForm } from './components/LoginForm'
import { NoAccount } from './components/NoAccount'
import { SocialLoginButtons } from './components/SocialLoginButtons'

export const LoginScreen = () => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <ContainerStatic>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Center w="100%" position="relative">
                    <Box position="absolute" top={0} display={isLoading ? 'flex' : 'none'}>
                        <Spinner color="black" size="lg" />
                    </Box>
                    <Box safeArea p="2" py="8" w="90%" maxW="290">
                        <Heading size="4xl" alignSelf="center">
                            {i18n.loginForm.logo}
                        </Heading>

                        <Heading alignSelf="center" size="lg" fontWeight="600" mb={4} color="coolGray.800" _dark={{
                            color: 'warmGray.50'
                        }}>
                            {i18n.loginForm.hello}
                        </Heading>

                        <Heading alignSelf="center" mt="1" _dark={{
                            color: 'warmGray.200'
                        }} color="coolGray.600" fontWeight="medium" size="xs">
                            {i18n.loginForm.signInToContinue}
                        </Heading>

                        <VStack space={3} mt="5">

                            <LoginForm />
                            <NoAccount />
                            <SocialLoginButtons isLoading={isLoading} setIsLoading={setIsLoading} />

                        </VStack>
                    </Box>
                </Center>
            </TouchableWithoutFeedback>
        </ContainerStatic>
    )
}
