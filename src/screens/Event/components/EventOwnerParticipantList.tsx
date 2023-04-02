import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { Avatar, Box, HStack, Icon, Pressable, Text, VStack } from "native-base"
import React, { useState } from "react"
import { SwipeListView } from "react-native-swipe-list-view"
import { ScreensEnum } from "../../../navigation/enums/Screens.enum"
import { Participant } from "../../../types/Participant.type"
import { UserData } from "../../../types/User.type"

type Props = {
    participants: Participant[],
    userData: UserData | undefined,
    eventUuid: string
}

type RenderItemProps = {
    item: Participant,
    index: number
}

export const EventOwnerParticipantList = ({ participants, userData, eventUuid }: Props) => {
    const navigation = useNavigation()

    const data: Participant[] = participants.map((participant: Participant, index: number) => {
        participant.key = (index)
        return participant
    })

    const [listData, setListData] = useState<Participant[]>(data)

    const deleteRow = (uuid: string) => {
        const newData = [...listData]
        const prevIndex = listData.findIndex(item => item.uuid === uuid)
        newData.splice(prevIndex, 1)
        setListData(newData)

        //@TODO: add remove participant request here
    }

    const onItemPress = (participant: Participant) => {
        navigation.navigate(ScreensEnum.USER, {
            userUuid: participant.uuid,
            backTo: eventUuid
        })
    }

    const renderItem = ({ item, index }: RenderItemProps) => (
        <Box>
            <Pressable
                onPress={() => {
                    onItemPress(item)
                }}
                backgroundColor="trueGray.100"
                borderBottomColor="trueGray.200"
                borderBottomWidth={1}
                justifyContent="center"
                height={50}
                py={4}
            >
                <HStack alignItems="center" ml={3}>
                    {item.avatar_url ? (
                        <Avatar ml={-2} mr={2} size="40px" source={{
                            uri: item.avatar_url
                        }} />
                    ) : (
                        <Icon mr={2} as={<AntDesign name="user" />} color="black" size="lg" />
                    )}
                    <VStack>
                        <Text fontWeight={item.uuid === userData.uuid ? 700 : 400}>{item.first_name} {item.last_name}</Text>
                        <Text fontSize={12}>{item.location_city}, {item.age} l.</Text>
                    </VStack>
                </HStack>
            </Pressable>
        </Box>
    )

    const renderHiddenItem = (data: any, rowMap: any) => (
        <HStack flex={1}>
            <Pressable
                w={50}
                ml="auto"
                bg="red.500"
                justifyContent="center"
                alignItems="center"
                onPress={() => {
                    deleteRow(data.item.uuid)
                }}
            >
                <Icon as={<AntDesign name="delete" />} size="sm" color="white" />
            </Pressable>
        </HStack>
    )

    return (
        <SwipeListView
            data={listData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-50}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
        />
    )
}
