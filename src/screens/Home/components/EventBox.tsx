import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { AspectRatio, Box, Center, Heading, HStack, Icon, Image, Pressable, Spinner, Stack, Text, VStack } from 'native-base'
import React, { useState } from 'react'
import i18n from '../../../config/i18n'
import { ScreensEnum } from '../../../navigation/enums/Screens.enum'
import { Event } from '../../../types/Event.type'

type Props = {
    event: Event
}

export const EventBox = ({ event }: Props) => {
    const navigation = useNavigation()

    const [isImageReady, setIsImageReady] = useState<boolean>(false)

    const goToEvent = () => {
        navigation.navigate(ScreensEnum.EVENT, { eventUuid: event.uuid, backTo: ScreensEnum.HOME })
    }

    return (
        <Box alignItems="center">
            <Box
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
            >

                <Pressable onPress={goToEvent}>
                    <Box position="relative">

                        <Center background="light.50" position="absolute" top={0} left={0} w="100%" h="100%">
                            <Spinner color="black" size="lg" />
                        </Center>

                        <AspectRatio
                            w="100%"
                            ratio={1}
                            opacity={isImageReady ? 100 : 0}
                        >
                            <Image
                                onLoad={() => {
                                    setIsImageReady(true)
                                }}
                                source={{
                                    uri: event.background_image_url
                                }}
                                alt="image"
                            />
                        </AspectRatio>

                    </Box>
                </Pressable>

                <Stack
                    p="4"
                    backgroundColor="white"
                >
                    <VStack>

                        <HStack mb={3} mt={-9}>
                            <HStack borderWidth={1} borderRadius={20} py={2} px={3} borderColor="blueGray.600" backgroundColor="blueGray.100">
                                <Icon mr={2} as={<AntDesign name={event.type.icon} />} color="blueGray.600" size="sm" />
                                <Text fontWeight="bold" fontSize={12} color="blueGray.600">
                                    {event.type.title}
                                </Text>
                            </HStack>
                        </HStack>

                        <Heading size="md" mb={2} onPress={goToEvent}>
                            {event.title}
                        </Heading>

                        <HStack mb={2}>
                            <Icon mr={2} as={<AntDesign name="calendar" />} color="black" size="md" />
                            {event.starts_in_days <= 0 ? (
                                <Text>
                                    {i18n.homeScreen.isToday}
                                </Text>
                            ) : (
                                <Text>
                                    {i18n.homeScreen.in} {event.starts_in_days} {i18n.homeScreen.days}
                                </Text>
                            )}
                        </HStack>

                        <HStack mb={2}>
                            <Icon mr={2} as={<AntDesign name="home" />} color="black" size="md" />
                            <Text>
                                {event.location_city}
                            </Text>
                        </HStack>

                        <HStack mb={2}>
                            <Icon mr={2} as={<AntDesign name={event.is_open ? 'unlock' : 'lock'} />} color="black" size="md" />
                            <Text>
                                {event.is_open ? i18n.singleEventScreen.eventIsOpen : i18n.singleEventScreen.eventIsNotOpen}
                            </Text>
                        </HStack>

                    </VStack>
                </Stack>
            </Box>
        </Box>
    )
}
