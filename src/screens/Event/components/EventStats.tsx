import React from "react"
import { HStack, Icon, Text, VStack } from "native-base"
import { AntDesign } from "@expo/vector-icons"
import i18n from "../../../config/i18n"

type Props = {
    duration: string,
    slots: number,
    participantCount: number,
    slotsLeft: number
}

export const EventStats = ({ duration, slots, participantCount, slotsLeft }: Props) => {

    return (
        <VStack>
            <HStack width="100%" mt={2} alignItems="stretch" justifyContent="space-between" flex={1}>

                <VStack flex={1} w="25%" py={3} px={2} textAlign="center" alignItems="center" justifyContent="center" bgColor="violet.500" borderTopLeftRadius={10}>
                    <Icon mb={1} as={<AntDesign name="clockcircleo" />} color="white" size="md" />
                    <Text mb={1} color="white" fontWeight={600}>
                        {i18n.singleEventScreen.stats.duration}
                    </Text>
                    <Text color="white">
                        {duration}
                    </Text>
                </VStack>

                <VStack flex={1} w="25%" py={3} px={2} textAlign="center" alignItems="center" justifyContent="center" bgColor="blue.500" borderTopRightRadius={10}>
                    <Icon mb={1} as={<AntDesign name="team" />} color="white" size="md" />
                    <Text mb={1} color="white" fontWeight={600}>
                        {i18n.singleEventScreen.stats.slots}
                    </Text>
                    <Text color="white">
                        {slots}
                    </Text>
                </VStack>

            </HStack>
            <HStack width="100%" mb={5} alignItems="stretch" justifyContent="space-between" flex={1}>

                <VStack flex={1} w="25%" py={3} px={2} textAlign="center" alignItems="center" justifyContent="center" bgColor="green.500" borderBottomLeftRadius={10}>
                    <Icon mb={1} as={<AntDesign name="user" />} color="white" size="md" />
                    <Text mb={1} color="white" fontWeight={600}>
                        {i18n.singleEventScreen.stats.participants}
                    </Text>
                    <Text color="white">
                        {participantCount}
                    </Text>
                </VStack>

                <VStack flex={1} w="25%" py={3} px={2} textAlign="center" alignItems="center" justifyContent="center" bgColor="purple.500" borderBottomRightRadius={10}>
                    <Icon mb={1} as={<AntDesign name="addusergroup" />} color="white" size="md" />
                    <Text mb={1} color="white" fontWeight={600}>
                        {i18n.singleEventScreen.stats.freeSlots}
                    </Text>
                    <Text color="white">
                        {slotsLeft}
                    </Text>
                </VStack>

            </HStack>
        </VStack>
    )
}
