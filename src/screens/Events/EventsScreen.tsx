import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Button, Center, Icon } from 'native-base'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { ContainerScrollable } from '../../components/ContainerScrollable'
import i18n from '../../config/i18n'
import { useAxios } from '../../hooks/useAxios'
import { ScreensEnum } from '../../navigation/enums/Screens.enum'
import { useNoticeStore } from '../../store/NoticeStore'
import { Event } from '../../types/Event.type'
import { EventsFlatList } from './components/EventsFlatList'

type getEventsResponse = {
    data: Event[]
}

export const EventsScreen = () => {
    const navigation = useNavigation()

    const axios = useAxios()

    const setGlobalError = useNoticeStore(state => state.setGlobalError)

    // @TODO: move requests to hook
    const {
        status: getOwnedEventsRequestStatus,
        data: ownedEvents
    } = useQuery<unknown, unknown, Event[]>(
        'ownedEvents',
        async () => {
            try {
                const res = await axios.get(`/event/owned`)

                return res.data as getEventsResponse
            } catch (e) {
                console.log('ownedEvents exception', e)
            }
        }
    )

    const {
        status: getJoinedEventsRequestStatus,
        data: joinedEvents
    } = useQuery<unknown, unknown, Event[]>(
        'joinedEvents',
        async () => {
            try {
                const res = await axios.get(`/event/joined`)

                return res.data as getEventsResponse
            } catch (e) {
                console.log('joinedEvents exception', e)
            }
        }
    )

    const {
        status: getPendingEventsRequestStatus,
        data: pendingEvents
    } = useQuery<unknown, unknown, Event[]>(
        'pendingEvents',
        async () => {
            try {
                const res = await axios.get(`/event/pending`)

                return res.data as getEventsResponse
            } catch (e) {
                console.log('pendingEvents exception', e)
            }
        }
    )

    useEffect(() => {
        if (
            getOwnedEventsRequestStatus === 'error' ||
            getJoinedEventsRequestStatus === 'error' ||
            getPendingEventsRequestStatus === 'error'
        ) {
            setGlobalError(i18n.events.errors.eventFetch)
        }
    }, [
        getOwnedEventsRequestStatus,
        getJoinedEventsRequestStatus,
        getPendingEventsRequestStatus
    ])

    return (
        <ContainerScrollable>
            {(ownedEvents?.length) ? (
                <EventsFlatList
                    title={i18n.eventsSwipableList.yourEvents.title}
                    events={ownedEvents}
                />
            ) : <></>}
            {(joinedEvents?.length) ? (
                <EventsFlatList
                    title={i18n.eventsSwipableList.attendedEvents.title}
                    events={joinedEvents}
                />
            ) : <></>}
            {(pendingEvents?.length) ? (
                <EventsFlatList
                    title={i18n.eventsSwipableList.pendingEvents.title}
                    events={pendingEvents}
                />
            ) : <></>}
            <Center mt={3}>
                <Button onPress={() => {
                    navigation.navigate(ScreensEnum.EVENT_FORM)
                }} leftIcon={<Icon as={FontAwesome} name="plus-circle" />}>
                    {i18n.events.addNew}
                </Button>
            </Center>
        </ContainerScrollable>
    )
}
