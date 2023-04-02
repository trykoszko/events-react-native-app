import { useEffect, useState } from "react"
import { useMutation } from "react-query"
import i18n from "../../../config/i18n"
import { useAxios } from "../../../hooks/useAxios"

export const useEventControls = (
    eventUuid: string,
    setGlobalSuccess: (value: string) => void,
    setGlobalError: (value: string) => void,
    refetchEvent: any // @TODO fix type
) => {
    const axios = useAxios()

    const [leaveEventModalOpen, setLeaveEventModalOpen] = useState<boolean>(false)
    const [joinEventModalOpen, setJoinEventModalOpen] = useState<boolean>(false)
    const [deleteEventModalOpen, setDeleteEventModalOpen] = useState<boolean>(false)
    const [cancelRequestEventModalOpen, setCancelRequestEventModalOpen] = useState<boolean>(false)

    const leaveEventRequest = useMutation((eventUuid: string) => axios.post(`/event/${eventUuid}/leave`))
    useEffect(() => {
        if (leaveEventRequest.isSuccess) {
            // refetchEvent() // @TODO fix
            setLeaveEventModalOpen(false)
            setGlobalSuccess(i18n.events.left())
        }
        if (leaveEventRequest.isError) {
            setGlobalError(i18n.events.error)
        }
    }, [leaveEventRequest])

    const joinEventRequest = useMutation((eventUuid: string) => axios.post(`/event/${eventUuid}/join`))
    useEffect(() => {
        if (joinEventRequest.isSuccess) {
            // refetchEvent() // @TODO fix
            setJoinEventModalOpen(false)
            setGlobalSuccess(i18n.events.joined())
        }
        if (joinEventRequest.isError) {
            setGlobalError(i18n.events.error)
        }
    }, [joinEventRequest])

    const deleteEventRequest = useMutation((eventUuid: string) => axios.post(`/event/${eventUuid}/delete`))
    useEffect(() => {
        if (deleteEventRequest.isSuccess) {
            // refetchEvent()
            setDeleteEventModalOpen(false)
            setGlobalSuccess(i18n.events.deleted())
        }
        if (deleteEventRequest.isError) {
            setGlobalError(i18n.events.error)
        }
    }, [deleteEventRequest])

    const cancelRequestEventRequest = useMutation((eventUuid: string) => axios.post(`/event/${eventUuid}/cancel-request`))
    useEffect(() => {
        if (deleteEventRequest.isSuccess) {
            // refetchEvent()
            setDeleteEventModalOpen(false)
            setGlobalSuccess(i18n.events.deleted())
        }
        if (deleteEventRequest.isError) {
            setGlobalError(i18n.events.error)
        }
    }, [deleteEventRequest])

    const onLeaveEventModalSubmit = () => leaveEventRequest.mutate(eventUuid)
    const onJoinEventModalSubmit = () => joinEventRequest.mutate(eventUuid)
    const onDeleteEventModalSubmit = () => deleteEventRequest.mutate(eventUuid)
    const onCancelRequestEventModalSubmit = () => cancelRequestEventRequest.mutate(eventUuid)

    return {
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
    }
}
