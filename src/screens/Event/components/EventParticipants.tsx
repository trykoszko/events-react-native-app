import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { Avatar, Heading, HStack, Icon, List, Pressable, Text, VStack } from "native-base"
import React from "react"
import i18n from "../../../config/i18n"
import { EventRelationEnum } from "../../../enums/EventRelation.enum"
import { ScreensEnum } from "../../../navigation/enums/Screens.enum"
import { useAuthStore } from "../../../store/AuthStore"
import { Participant } from "../../../types/Participant.type"
import { EventOwnerParticipantList } from "./EventOwnerParticipantList"

type Props = {
    participants: any[],
    relation: EventRelationEnum | undefined,
    eventUuid: string
}

export const EventParticipants = ({ participants, relation, eventUuid }: Props) => {
    const navigation = useNavigation()
    const userData = useAuthStore(state => state.userData)

    return (
        <VStack mt={6}>
            <Heading fontSize={18} mt={-1} mb={2}>
                {i18n.singleEventScreen.participants}
            </Heading>
            {(relation === EventRelationEnum.OWNER) ? (

                <EventOwnerParticipantList
                    participants={participants}
                    userData={userData}
                    eventUuid={eventUuid}
                />

            ) : (

                <List borderWidth={0} px={0} py={0}>
                    {participants.map((participant: Participant) => (
                        <List.Item key={participant.uuid}>

                            {(
                                relation === EventRelationEnum.NONE ||
                                relation === EventRelationEnum.PENDING ||
                                relation === EventRelationEnum.REJECTED
                            ) && (
                                    <HStack alignItems="center">
                                        {participant.avatar_url ? (
                                            <Avatar ml={-2} mr={2} size="40px" source={{
                                                uri: participant.avatar_url
                                            }} />
                                        ) : (
                                            <Icon mr={2} as={<AntDesign name="user" />} color="black" size="lg" />
                                        )}
                                        <VStack>
                                            <Text fontWeight={participant.uuid === userData.uuid ? 700 : 400}>{participant.first_name} {participant.last_name.substring(0, 1)}</Text>
                                            <Text fontSize={12}>{participant.location_city}, {participant.age} l.</Text>
                                        </VStack>
                                    </HStack>
                                )}

                            {(relation === EventRelationEnum.PARTICIPANT) && (
                                <Pressable onPress={() => {
                                    navigation.navigate(ScreensEnum.USER, {
                                        userUuid: participant.uuid,
                                        backTo: eventUuid
                                    })
                                }}>
                                    <HStack>
                                        {participant.avatar_url ? (
                                            <Avatar ml={-2} mr={2} size="40px" source={{
                                                uri: participant.avatar_url
                                            }} />
                                        ) : (
                                            <Icon mr={2} as={<AntDesign name="user" />} color="black" size="lg" />
                                        )}
                                        <VStack>
                                            <Text fontWeight={participant.uuid === userData.uuid ? 700 : 400}>{participant.first_name} {participant.last_name}</Text>
                                            <Text fontSize={12}>{participant.location_city}, {participant.age} l.</Text>
                                        </VStack>
                                    </HStack>
                                </Pressable>
                            )}

                        </List.Item>
                    ))}
                </List>

            )}

        </VStack>
    )
}
