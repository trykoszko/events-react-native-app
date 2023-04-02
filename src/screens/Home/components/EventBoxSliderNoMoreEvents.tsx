import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Box, Button, Center, Heading, Icon, Text } from "native-base"
import React from 'react'
import { TouchableOpacity } from 'react-native'
import i18n from '../../../config/i18n'
import { ScreensEnum } from '../../../navigation/enums/Screens.enum'

export const EventBoxSliderNoMoreEvents = () => {
    const navigation = useNavigation()

    return (
        <Box px={5} mt={10} textAlign="center" flex={1} flexDir="column" alignItems="center">
            <Icon mb="4" as={<FontAwesome5 name="sad-tear" />} color="black" size="xl" />
            <Heading size="sm" mb="3">
                {i18n.homeScreen.noMoreEvents}
            </Heading>
            <TouchableOpacity onPress={() => {
                navigation.navigate(ScreensEnum.EVENTS)
            }}>
                <Text textAlign="center">
                    {i18n.homeScreen.noMoreEventsCopy} &raquo
                </Text>

                <Text mt={5} mb={3} textAlign="center">{i18n.homeScreen.noMoreEventsOrCreate}</Text>

                <Center mb={3}>
                    <Button onPress={() => {
                        navigation.navigate(ScreensEnum.EVENT_FORM, {})
                    }} leftIcon={<Icon as={FontAwesome} name="plus-circle" />}>
                        {i18n.events.addNew}
                    </Button>
                </Center>

            </TouchableOpacity>
        </Box>
    )
}
