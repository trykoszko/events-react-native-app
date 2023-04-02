import {
    Box, Spinner,
    VStack
} from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { useQuery } from 'react-query'
import { ContainerScrollable } from '../../components/ContainerScrollable'
import i18n from '../../config/i18n'
import { EventRelationEnum } from '../../enums/EventRelation.enum'
import { useAxios } from '../../hooks/useAxios'
import { useNoticeStore } from '../../store/NoticeStore'
import { Event } from '../../types/Event.type'
import { timeToDuration } from '../../utils/Date'
import { EventControls } from './components/EventControls'
import { EventDescription } from './components/EventDescription'
import { EventHeader } from './components/EventHeader'
import { EventInfo } from './components/EventInfo'
import { EventJoinRequests } from './components/EventJoinRequests'
import { EventParticipants } from './components/EventParticipants'
import { EventStats } from './components/EventStats'
import { GetEventResponse } from './types/GetEventResponse.type'

type Props = {
    route: any
}

export const EventScreen = ({ route }: Props) => {
    const { eventUuid, backTo } = route.params

    const axios = useAxios()

    const setGlobalError = useNoticeStore(state => state.setGlobalError)

    const [refreshing, setRefreshing] = useState<boolean>(false)

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await refetchEvent()
        setRefreshing(false)
    }, [])

    const { status: getEventRequestStatus, data: event, error, refetch: refetchEvent } = useQuery<unknown, unknown, Event>(
        'event',
        async () => {
            try {
                const res = await axios.get(`/event/${eventUuid}`)

                return res.data as GetEventResponse
            } catch (e) {
                console.log('getEventRequestStatus exception', e)
            }
        }
    )

    useEffect(() => {
        if (getEventRequestStatus === 'error') {
            setGlobalError(i18n.events.errors.eventFetch)
        }
    }, [getEventRequestStatus])

    return (
        <ContainerScrollable
            hasNoOffsets
            refreshControl={
                <RefreshControl size={2} refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            {(getEventRequestStatus === 'success' && event) ? (
                <>

                    <EventHeader
                        backTo={backTo}
                        eventTitle={event.title}
                        imageUrl={event.background_image_url}
                        eventUuid={event.uuid}
                    />

                    <VStack w="100%" py={5} px={5}>

                        <EventDescription
                            title={event.title}
                            description={event.description}
                            eventType={event?.type?.title}
                            eventTypeIcon={event?.type?.icon}
                        />

                        <EventStats
                            duration={timeToDuration(parseInt(event.duration))}
                            slots={event.slots}
                            participantCount={event.slots - event.slots_left}
                            slotsLeft={event.slots_left}
                        />

                        <EventInfo
                            uuid={event.uuid}
                            dateTime={event.date_time}
                            country={event.location_country}
                            city={event.location_city}
                            ownerUuid={event?.owner?.uuid}
                            ownerImageUrl={event?.owner?.avatar_url}
                            ownerFirstName={event?.owner?.first_name}
                            ownerLastName={event?.owner?.last_name}
                            eventIsOpen={event.is_open}
                            anonymous={
                                (event.joined_status && (
                                    event.joined_status === EventRelationEnum.NONE ||
                                    event.joined_status === EventRelationEnum.PENDING
                                )) ||
                                (!event.is_userlist_visible && event.joined_status && (
                                    event.joined_status !== EventRelationEnum.OWNER
                                ))
                            }
                        />

                        {(event.users_joined?.length && (event.is_userlist_visible || event.joined_status === EventRelationEnum.OWNER)) ? (
                            <EventParticipants
                                participants={event.users_joined}
                                relation={event.joined_status}
                                eventUuid={eventUuid}
                            />
                        ) : <></>}

                        {(event.joined_status && event.joined_status === EventRelationEnum.OWNER && event.users_pending?.length) ? (
                            <EventJoinRequests
                                users={event.users_pending}
                                eventUuid={eventUuid}
                            />
                        ) : <></>}

                        {event.joined_status ? (
                            <EventControls
                                event={event}
                                relation={event.joined_status}
                                refetchEvent={refetchEvent}
                            />
                        ) : <></>}

                    </VStack>

                </>
            ) : <></>}
            {getEventRequestStatus === 'loading' ? (
                <Box mt={20}>
                    <Spinner color="black" size="lg" />
                </Box>
            ) : <></>}
        </ContainerScrollable>
    )
}
