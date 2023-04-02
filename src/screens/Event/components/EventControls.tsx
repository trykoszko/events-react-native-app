import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { Button, HStack, Icon, Text } from "native-base"
import React from "react"
import i18n from "../../../config/i18n"
import { EventRelationEnum } from "../../../enums/EventRelation.enum"
import { ScreensEnum } from "../../../navigation/enums/Screens.enum"
import { useAuthStore } from "../../../store/AuthStore"
import { useNoticeStore } from "../../../store/NoticeStore"
import { Event } from "../../../types/Event.type"
import { useEventControls } from "../hooks/useEventControls"
import { ConfirmationModal } from "./ConfirmationModal"

type Props = {
    relation: EventRelationEnum,
    event: Event,
    refetchEvent: any // @TODO: fix type
}

export const EventControls = ({ relation, event, refetchEvent }: Props) => {
    const navigation = useNavigation()

    const setGlobalSuccess = useNoticeStore(state => state.setGlobalSuccess)
    const setGlobalError = useNoticeStore(state => state.setGlobalError)

    const {
        deleteEventModalOpen,
        setDeleteEventModalOpen,
        onDeleteEventModalSubmit,
        leaveEventModalOpen,
        setLeaveEventModalOpen,
        onLeaveEventModalSubmit,
        cancelRequestEventModalOpen,
        setCancelRequestEventModalOpen,
        onCancelRequestEventModalSubmit,
        joinEventModalOpen,
        setJoinEventModalOpen,
        onJoinEventModalSubmit
    } = useEventControls(
        event.uuid,
        setGlobalSuccess,
        setGlobalError,
        refetchEvent
    )

    if (relation === EventRelationEnum.OWNER) {
        return (
            <HStack
                mt={5}
            >
                <Button
                    leftIcon={<Icon as={AntDesign} name="edit" />}
                    mr={3}
                    onPress={() => {
                        navigation.navigate(ScreensEnum.EVENT_FORM, { eventUuid: event.uuid })
                    }}
                    colorScheme="green"
                >
                    {i18n.singleEventScreen.actions.edit}
                </Button>
                <Button
                    leftIcon={<Icon as={AntDesign} name="delete" />}
                    mr={3}
                    onPress={() => {
                        setDeleteEventModalOpen(true)
                    }}
                    colorScheme="red"
                >
                    {i18n.singleEventScreen.actions.delete}
                </Button>
                <ConfirmationModal
                    isOpen={deleteEventModalOpen}
                    setClose={setDeleteEventModalOpen}
                    onSubmit={onDeleteEventModalSubmit}
                    modalText={i18n.singleEventScreen.questions.delete}
                    btnStyle="danger"
                />
            </HStack>
        )
    }

    if (relation === EventRelationEnum.PARTICIPANT) {
        return (
            <HStack
                mt={5}
            >
                <Button
                    leftIcon={<Icon as={AntDesign} name="close" />}
                    mr={3}
                    onPress={() => {
                        setLeaveEventModalOpen(true)
                    }}
                    colorScheme="danger"
                >
                    {i18n.singleEventScreen.actions.leave}
                </Button>
                <ConfirmationModal
                    isOpen={leaveEventModalOpen}
                    setClose={setLeaveEventModalOpen}
                    onSubmit={onLeaveEventModalSubmit}
                    modalText={i18n.singleEventScreen.questions.leave}
                    btnStyle="danger"
                />
            </HStack>
        )
    }

    if (relation === EventRelationEnum.PENDING) {
        return (
            <HStack
                mt={5}
                flex={1}
                alignItems="center"
                backgroundColor="blue.100"
                borderWidth={1}
                borderColor="blue.600"
                borderRadius={8}
                px={4} py={2}
            >
                <Text w="74%" color="blue.700">{i18n.singleEventScreen.actions.requestSent}</Text>
                <Button
                    leftIcon={<Icon as={AntDesign} name="close" />}
                    mr={3}
                    onPress={() => {
                        setCancelRequestEventModalOpen(true)
                    }}
                    colorScheme="danger"
                >
                    {i18n.singleEventScreen.actions.cancel}
                </Button>
                <ConfirmationModal
                    isOpen={cancelRequestEventModalOpen}
                    setClose={setCancelRequestEventModalOpen}
                    onSubmit={onCancelRequestEventModalSubmit}
                    modalText={i18n.singleEventScreen.questions.cancelJoinRequest}
                    btnStyle="danger"
                />
            </HStack>
        )
    }

    if (relation === EventRelationEnum.REJECTED) {
        return (
            <HStack
                mt={5}
                flex={1}
                alignItems="center"
                backgroundColor="red.100"
                borderWidth={1}
                borderColor="red.600"
                borderRadius={8}
                px={4} py={2}
            >
                <Icon as={<AntDesign name="exclamationcircle" />} size="md" color="red.500" mr={3} />
                <Text w="90%" color="red.600">{i18n.singleEventScreen.actions.rejected}</Text>
            </HStack>
        )
    }

    return (
        <HStack
            mt={5}
        >
            <Button
                leftIcon={<Icon as={AntDesign} name="plus" />}
                mr={3}
                onPress={() => {
                    setJoinEventModalOpen(true)
                }}
                colorScheme="green"
            >
                {i18n.singleEventScreen.actions.join}
            </Button>
            <ConfirmationModal
                isOpen={joinEventModalOpen}
                setClose={setJoinEventModalOpen}
                onSubmit={onJoinEventModalSubmit}
                modalText={i18n.singleEventScreen.questions.join}
                btnStyle="green"
            />
        </HStack>
    )
}
