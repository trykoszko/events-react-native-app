import { AntDesign } from '@expo/vector-icons'
import { Heading, HStack, Icon, Text } from "native-base"
import React from "react"

type Props = {
    title: string,
    description: string,
    eventType: string,
    eventTypeIcon: string
}

export const EventDescription = ({
    title,
    description,
    eventType,
    eventTypeIcon
}: Props) => {

    return (
        <>
            <HStack mb={5} mt={-10}>
                <HStack borderWidth={1} borderRadius={20} py={2} px={3} borderColor="blueGray.600" backgroundColor="blueGray.100">
                    <Icon mr={2} as={<AntDesign name={eventTypeIcon} />} color="blueGray.600" size="md" />
                    <Text fontWeight="bold" color="blueGray.600">
                        {eventType}
                    </Text>
                </HStack>
            </HStack>

            <Heading mt={-1} mb={3}>
                {title}
            </Heading>

            <Text mb={3}>
                {description}
            </Text>
        </>
    )
}
