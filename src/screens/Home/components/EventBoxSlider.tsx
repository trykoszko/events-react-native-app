import { Box, HStack, Select, Spinner, Text, View, ZStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import CardStack, { Card } from 'react-native-card-stack-swiper'
import { useMutation, useQuery } from 'react-query'
import i18n from '../../../config/i18n'
import { useAxios } from '../../../hooks/useAxios'
import { useAuthStore } from '../../../store/AuthStore'
import { useNoticeStore } from '../../../store/NoticeStore'
import { Event } from '../../../types/Event.type'
import { EventType } from '../../../types/EventType.type'
import { EventBoxSliderStyles as styles } from '../styles/EventBoxSlider.style'
import { EventBox } from './EventBox'
import { EventBoxSliderNoMoreEvents } from './EventBoxSliderNoMoreEvents'

export const EventBoxSlider = () => {
    const axios = useAxios()

    const [eventType, setEventType] = useState<string>('all')

    const setGlobalSuccess = useNoticeStore(state => state.setGlobalSuccess)
    const setGlobalError = useNoticeStore(state => state.setGlobalError)

    const getEventTypesRequest = useQuery(
        'eventTypes',
        () => axios.get(`/event-type`)
    )

    const getEventsRequest = useQuery(
        ['events', eventType],
        () => axios.get(`/event?limit=100&sortBy=date_time:ASC${eventType !== 'all' ? `&filter.type.slug=${eventType}` : ''}`)
    )

    const joinEventRequest = useMutation((eventUuid: string) => axios.post(`/event/${eventUuid}/join`))

    const onSwipedRight = (index: number) => {
        const event: Event = getEventsRequest?.data?.data?.data[index]
        const eventUuid: string = event.uuid

        joinEventRequest.mutate(eventUuid)
    }

    const onCatDropdownChange = (value: string) => {
        setEventType(value)
    }

    useEffect(() => {
        if (getEventTypesRequest.status === 'error') {
            setGlobalError(i18n.events.errors.eventTypeFetch)
        }
        if (getEventsRequest.status === 'error') {
            setGlobalError(i18n.events.errors.eventFetch)
        }
        if (joinEventRequest.status === 'success') {
            setGlobalSuccess(i18n.events.joined())
        }
        if (joinEventRequest.status === 'error') {
            setGlobalError(i18n.events.errors.join)
        }
    }, [
        getEventsRequest.status,
        getEventTypesRequest.status,
        joinEventRequest.status
    ])

    return (
        <View style={styles.container}>

            {getEventTypesRequest.isSuccess ? (
                getEventTypesRequest?.data?.data?.length ? (
                    <HStack style={styles.catDropdown}>
                        <Text style={styles.catDropdownTitle}>
                            {i18n.events.category}
                        </Text>
                        <Select width={180} height={8} fontSize={14} selectedValue={eventType} onValueChange={onCatDropdownChange}>
                            <Select.Item key="all" label={i18n.events.allCat} value="all" />
                            {getEventTypesRequest.data.data.map((type: EventType) => (
                                <Select.Item key={type.id} label={type.title} value={type.slug} />
                            ))}
                        </Select>
                    </HStack>
                ) : <></>
            ) : <></>}

            {getEventsRequest.isLoading ? (
                <Spinner />
            ) : (
                (getEventsRequest?.data?.data?.data?.length) ? (
                    <View style={styles.mainView}>
                        <ZStack>
                            <Box h={200}>
                                <EventBoxSliderNoMoreEvents />
                            </Box>
                            <CardStack
                                disableTopSwipe
                                disableBottomSwipe
                                onSwipedRight={onSwipedRight}
                                style={styles.content}
                            >
                                {getEventsRequest.data.data.data.map((event: Event, i) => (
                                    <Card
                                        style={[styles.card, i % 2 === 0 ? styles.card1 : styles.card2]}
                                        key={event.uuid}>
                                        <EventBox
                                            event={event}
                                        />
                                    </Card>
                                ))}
                            </CardStack>
                        </ZStack>
                    </View>
                ) : (
                    <EventBoxSliderNoMoreEvents />
                )
            )}

        </View>
    )
}
