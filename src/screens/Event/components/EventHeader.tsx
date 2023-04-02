import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { AspectRatio, Box, Button, Center, Icon, Image, Spinner, VStack } from 'native-base'
import React, { useState } from 'react'
import { ScreensEnum } from '../../../navigation/enums/Screens.enum'

type Props = {
    backTo: string,
    imageUrl: string,
    eventTitle: string,
    eventUuid: string
}

export const EventHeader = ({ backTo, eventTitle, imageUrl, eventUuid }: Props) => {
    const navigation = useNavigation()

    const [isImageReady, setIsImageReady] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const copyEventUrl = () => {
        // @TODO: add copyEventUrl func
        console.log('copy event url: ', eventUuid)
    }

    const copyInviteUrl = () => {
        // @TODO: add copyInviteUrl func
        console.log('copy invite url: ', eventUuid)
    }

    const goBack = () => {
        if (backTo) {
            navigation.navigate(backTo, {})
        } else {
            navigation.navigate(ScreensEnum.EVENTS, {})
        }
    }

    return (
        <Box position="relative">
            <Center position="absolute" top={0} left={0} w="100%" h="100%">
                <Spinner color="black" size="lg" />
            </Center>

            <AspectRatio w="110%" ratio={1} opacity={isImageReady ? 100 : 0}>
                <Image
                    onLoad={() => {
                        setIsImageReady(true)
                    }}
                    source={{
                        uri: imageUrl
                    }}
                    alt={eventTitle}
                />
            </AspectRatio>

            <Button
                position="absolute"
                top="16"
                left={4}
                pr={3}
                pl={3}
                py={3}
                colorScheme="secondary"
                onPress={goBack}
                leftIcon={<Icon size="md" as={AntDesign} name="arrowleft" />}
            />

            <VStack
                position="absolute"
                top={16}
                right={4}
            >
                <Button
                    pr={3}
                    pl={3}
                    py={3}
                    mb={4}
                    colorScheme="blue"
                    onPress={copyEventUrl}
                    isLoading={isLoading}
                >
                    <Icon as={<AntDesign name="sharealt" />} color="white" size="md" />
                </Button>

                <Button
                    pr={3}
                    pl={3}
                    py={3}
                    colorScheme="fuchsia"
                    onPress={copyInviteUrl}
                    isLoading={isLoading}
                >
                    <Icon as={<AntDesign name="mail" />} color="white" size="md" />
                </Button>
            </VStack>

        </Box>
    )
}
