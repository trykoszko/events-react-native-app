import { useNavigation } from "@react-navigation/native"
import { HStack, Link, Text } from "native-base"
import React from 'react'
import i18n from "../../../config/i18n"
import { ScreensEnum } from '../../../navigation/enums/Screens.enum'

export const NoAccount = () => {
    const navigation = useNavigation()

    return (
        <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
                color: 'warmGray.200'
            }}>
                {i18n.loginForm.noAccount.iAmNew}{' '}
            </Text>
            <Link _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm'
            }} onPress={() => {
                navigation.navigate(ScreensEnum.REGISTER)
            }}>
                {i18n.loginForm.noAccount.register}
            </Link>
        </HStack>
    )
}
