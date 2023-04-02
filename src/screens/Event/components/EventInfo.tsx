import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { Avatar, Box, HStack, Icon, Text } from "native-base"
import React from "react"
import { TouchableOpacity } from "react-native"
import i18n from "../../../config/i18n"
import { ScreensEnum } from "../../../navigation/enums/Screens.enum"
import { timestampToDate } from "../../../utils/Date"

type Props = {
    dateTime: Date,
    uuid: string,
    country: string,
    city: string,
    ownerUuid: string,
    ownerImageUrl: string | null,
    ownerFirstName: string,
    ownerLastName: string,
    eventIsOpen: boolean,
    anonymous: boolean
}

export const EventInfo = ({
    uuid,
    dateTime,
    country,
    city,
    ownerUuid,
    ownerImageUrl,
    ownerFirstName,
    ownerLastName,
    eventIsOpen,
    anonymous = false
}: Props) => {
    const navigation = useNavigation()

    return (
        <>
            <HStack mb={3}>
                <Icon mr={2} as={<AntDesign name="calendar" />} color="black" size="lg" />
                <Text>
                    {timestampToDate(dateTime)}
                </Text>
            </HStack>

            <HStack mb={3}>
                <Icon mr={2} as={<AntDesign name="home" />} color="black" size="lg" />
                <Text>
                    {country} - {city}
                </Text>
            </HStack>

            <TouchableOpacity onPress={() => {
                navigation.navigate(ScreensEnum.USER, {
                    userUuid: ownerUuid,
                    backTo: uuid,
                    anonymous
                });
            }}>
                <Box ml={0.5} mb={3}>
                    <HStack flex={1} alignItems="center">
                        {ownerImageUrl ? (
                            <Avatar mr={2} size="20px" source={{
                                uri: ownerImageUrl
                            }} />
                        ) : (
                            <Icon mr={2} as={<AntDesign name="user" />} color="black" size="lg" />
                        )}
                        <Text>
                            {ownerFirstName} {anonymous ? `${ownerLastName.substring(0, 1)}.` : ownerLastName}
                        </Text>
                    </HStack>
                </Box>
            </TouchableOpacity>

            <HStack>
                <Icon mr={2} as={<AntDesign name={eventIsOpen ? 'unlock' : 'lock'} />} color="black" size="lg" />
                <Text>
                    {eventIsOpen ? i18n.singleEventScreen.eventIsOpen : i18n.singleEventScreen.eventIsNotOpen}
                </Text>
            </HStack>
        </>
    )
}
