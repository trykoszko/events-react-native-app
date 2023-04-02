import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { Avatar, Box, Heading, HStack, Icon, Pressable, Text, VStack } from "native-base"
import React, { useMemo, useState } from "react"
import { SwipeListView } from "react-native-swipe-list-view"
import i18n from "../../../config/i18n"
import { ScreensEnum } from "../../../navigation/enums/Screens.enum"
import { User } from "../../../types/User.type"

type Props = {
    users: User[],
    eventUuid: string
}

type RenderItemProps = {
    item: User,
    index: number
}

export const EventJoinRequests = ({ users, eventUuid }: Props) => {
    const navigation = useNavigation()

    const data: User[] = useMemo(() => users.map((request: User, index: number) => {
        request.key = (index)
        return request
    }), [users])

    const [listData, setListData] = useState<User[]>(data)

    const rejectJoinRequest = (id: number) => {
        setListData(listData.filter(item => item.key !== id))

        //@TODO: add reject request here; use ConfirmationModal
    }

    const acceptJoinRequest = (id: number) => {
        setListData(listData.filter(item => item.key !== id))

        //@TODO: add accept request here; use ConfirmationModal
    }

    const onItemPress = (user: User) => {
        navigation.navigate(ScreensEnum.USER, {
            userUuid: user.uuid,
            backTo: eventUuid
        })
    }

    const renderItem = ({ item, index }: RenderItemProps) => {
        return (
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
                            <Text>{item.first_name} {item.last_name}</Text>
                            <Text fontSize={12}>{item.location_city}, {item.age} l.</Text>
                        </VStack>
                    </HStack>
                </Pressable>
            </Box>
        )
    }

    const renderHiddenItem = (data: any, rowMap: any) => (
        <HStack flex={1}>
            <Pressable
                w={50}
                ml="auto"
                bg="green.500"
                justifyContent="center"
                alignItems="center"
                onPress={() => {
                    acceptJoinRequest(data.item.key)
                }}
            >
                <Icon as={<AntDesign name="check" />} size="sm" color="white" />
            </Pressable>
            <Pressable
                w={50}
                bg="red.500"
                justifyContent="center"
                alignItems="center"
                onPress={() => {
                    rejectJoinRequest(data.item.key)
                }}
            >
                <Icon as={<AntDesign name="close" />} size="sm" color="white" />
            </Pressable>
        </HStack>
    )

    return (
        <VStack mt={6}>
            <Heading
                fontSize={18}
                mt={-1}
                mb={2}
            >
                {i18n.singleEventScreen.joinRequests}
            </Heading>
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-100}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
            />
        </VStack>
    )
}
