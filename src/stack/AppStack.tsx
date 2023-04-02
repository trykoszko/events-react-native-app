import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Box } from 'native-base'
import React from 'react'
import { BottomMenu } from '../components/BottomMenu'
import { ScreensEnum } from '../navigation/enums/Screens.enum'
import { EventScreen } from '../screens/Event/EventScreen'
import { EventFormScreen } from '../screens/EventForm/EventFormScreen'
import { EventsScreen } from '../screens/Events/EventsScreen'
import { ForgotPasswordScreen } from '../screens/ForgotPassword/ForgotPasswordScreen'
import { HomeScreen } from '../screens/Home/HomeScreen'
import { LoginScreen } from '../screens/Login/LoginScreen'
import { ProfileScreen } from '../screens/Profile/ProfileScreen'
import { ProfileFormScreen } from '../screens/ProfileForm/ProfileFormScreen'
import { RegisterScreen } from '../screens/Register/RegisterScreen'
import { UserScreen } from '../screens/User/UserScreen'
import { useAuthStore } from '../store/AuthStore'
import { RootStackParams } from './types/RootStackParams.type'

export const AppStack = () => {
    const Stack = createStackNavigator<RootStackParams>()
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    header: () => <BottomMenu />,
                    headerMode: 'float',
                    headerShadowVisible: false,
                    headerBackground: () => <Box backgroundColor="white" borderColor="white" />
                }}
                initialRouteName={isAuthenticated ? ScreensEnum.HOME : ScreensEnum.LOGIN}
            >
                <Stack.Group>
                    {isAuthenticated ? (
                        <>
                            <Stack.Screen name={ScreensEnum.HOME} component={HomeScreen} />
                            <Stack.Screen name={ScreensEnum.EVENTS} component={EventsScreen} />
                            <Stack.Screen name={ScreensEnum.EVENT} component={EventScreen} />
                            <Stack.Screen name={ScreensEnum.EVENT_FORM} component={EventFormScreen} />
                            <Stack.Screen name={ScreensEnum.USER} component={UserScreen} />
                            <Stack.Screen name={ScreensEnum.PROFILE} component={ProfileScreen} />
                            <Stack.Screen name={ScreensEnum.PROFILE_FORM} component={ProfileFormScreen} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name={ScreensEnum.LOGIN} component={LoginScreen} />
                            <Stack.Screen name={ScreensEnum.REGISTER} component={RegisterScreen} />
                            <Stack.Screen name={ScreensEnum.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
                        </>
                    )}
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
