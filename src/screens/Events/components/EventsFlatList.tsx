import { useNavigation } from '@react-navigation/native'
import { Avatar, Box, Heading, HStack, Pressable, Text, VStack } from 'native-base'
import React from 'react'
import { ScreensEnum } from '../../../navigation/enums/Screens.enum'
import { Event } from '../../../types/Event.type'
import { timestampToDate } from "../../../utils/Date"

type Props = {
    title: string,
    events: Event[]
}

export const EventsFlatList = ({ title, events }: Props) => {
    const navigation = useNavigation()

    return (
        <Box>
            <Heading mb={4}>{title}</Heading>
            <VStack mb={5}>
                {events.map((event: Event, idx: number) => (
                    <Box key={idx}>
                        <Pressable onPress={() => {
                            navigation.navigate(ScreensEnum.EVENT, { eventUuid: event.uuid, backTo: ScreensEnum.EVENTS })
                        }} bgColor="light.100" mb={3}>
                            <HStack alignItems="center">
                                <Avatar size="48px" source={{
                                    uri: event.background_image_url
                                }} />
                                <VStack pl={3}>
                                    <Text color="coolGray.800" _dark={{
                                        color: 'warmGray.50'
                                    }} bold w="90%">
                                        {event.title}
                                    </Text>
                                    <Text fontSize="xs" color="coolGray.800" _dark={{
                                        color: 'warmGray.50'
                                    }} alignSelf="flex-start">
                                        {event.location_city} - {timestampToDate(event.date_time)}
                                    </Text>
                                </VStack>
                            </HStack>
                        </Pressable>
                    </Box>
                ))}
            </VStack>
        </Box>
    )
}
