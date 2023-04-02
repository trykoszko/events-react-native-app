import { AntDesign } from "@expo/vector-icons"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from 'expo-image-picker'
import {
    Button,
    FormControl,
    HStack,
    Heading,
    Icon,
    Input, Select,
    Switch,
    TextArea,
    VStack
} from 'native-base'
import React, { useEffect } from 'react'
import { Controller, FieldValues, useForm } from "react-hook-form"
import { TouchableWithoutFeedback } from 'react-native'
import { useMutation, useQuery } from "react-query"
import * as yup from "yup"
import { ContainerScrollable } from "../../components/ContainerScrollable"
import i18n from '../../config/i18n'
import { useAxios } from "../../hooks/useAxios"
import { ScreensEnum } from "../../navigation/enums/Screens.enum"
import { useNoticeStore } from "../../store/NoticeStore"
import { Event } from "../../types/Event.type"
import { EventType } from "../../types/EventType.type"
import { GetEventResponse } from "../Event/types/GetEventResponse.type"
import { DateTimeInputs } from "./components/DateTimeInputs"
import { DurationSlider } from "./components/DurationSlider"
import { EventImagePicker } from "./components/EventImagePicker"
import { SlotsInput } from "./components/SlotsInput"

const formSchema = yup.object().shape({
    title: yup.string().min(16).required().default(''),
    location_city: yup.string().required().default(i18n.registerScreen.defaultCity),
    location_country: yup.string().default(i18n.registerScreen.defaultCountry),
    description: yup.string().min(20).required().default(''),
    slots: yup.number().default(10),
    date_time: yup.date().required().default(new Date),
    duration: yup.number().required().default(60 * 24),
    is_address_visible: yup.boolean(),
    is_userlist_visible: yup.boolean(),
    is_allowed_to_join_when_in_progress: yup.boolean(),
    is_open: yup.boolean(),
    type: yup.number().required().default(1),
    background_image: yup.object<ImagePicker.ImageInfo | undefined>()
})

const initialValues = formSchema.cast({})

export const EventFormScreen = ({ route }) => {
    const eventUuid = route?.params?.eventUuid

    const navigation = useNavigation()

    const axios = useAxios()

    const setGlobalSuccess = useNoticeStore(state => state.setGlobalSuccess)
    const setGlobalError = useNoticeStore(state => state.setGlobalError)

    const { control, handleSubmit, formState: { errors }, reset, setValue, resetField } = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: initialValues
    })

    const getEventTypesRequest = useQuery(
        'eventTypes',
        () => axios.get(`/event-type`)
    )

    const { status: getEventRequestStatus, data: event } = useQuery<unknown, unknown, Event>(
        'event',
        async () => {
            try {
                const res = await axios.get(`/event/${eventUuid}`)

                return res.data as GetEventResponse
            } catch (e) {
                console.log('getEventRequestStatus exception', e)
            }
        },
        {
            enabled: !!eventUuid
        }
    )

    const apiRequest = useMutation((formData: FieldValues) => axios(
        `/event${eventUuid ? `/${eventUuid}` : ''}`,
        {
            method: eventUuid ? 'patch' : 'post',
            data: formData
        }
    ))

    const onFormSubmit = ((formData: FieldValues) => {
        apiRequest.mutate(formData)
    })

    useEffect(() => {
        if (apiRequest.status === 'error') {
            setGlobalError(eventUuid
                ? i18n.eventModal.errors.edit
                : i18n.eventModal.errors.edit)
        }
        if (apiRequest.status === 'success') {
            setGlobalSuccess(i18n.eventModal.success)
            navigation.navigate(ScreensEnum.EVENTS)
        }
    }, [apiRequest.status])

    useEffect(() => {
        if (getEventTypesRequest.status === 'error') {
            setGlobalError(i18n.events.errors.eventTypeFetch)
        }
    }, [getEventTypesRequest.status])

    useEffect(() => {
        if (eventUuid && getEventRequestStatus === 'success') {
            setValue('title', event.title)
            setValue('description', event.description)
            setValue('duration', parseInt(event.duration))
            setValue('date_time', event.date_time)
            setValue('slots', event.slots)
            setValue('type', event.type.id)
            setValue('background_image', {
                uri: event.background_image_url,
                width: 1000,
                height: 800
            })
            setValue('is_open', event.is_open)
            setValue('is_allowed_to_join_when_in_progress', event.is_allowed_to_join_when_in_progress)
        }
        if (getEventRequestStatus === 'error') {
            setGlobalError(i18n.events.errors.eventFetch)
        }
    }, [getEventRequestStatus])

    return (
        <ContainerScrollable>
            <TouchableWithoutFeedback>
                <VStack>
                    <HStack mb={4}>
                        <Button leftIcon={<Icon as={AntDesign} name="left" />} onPress={() => {
                            navigation.goBack()
                        }}>{i18n.eventModal.back}</Button>
                    </HStack>

                    <Heading mb={2}>
                        {eventUuid && event
                            ? i18n.eventModal.editTitle(event?.title)
                            : i18n.eventModal.addTitle
                        }
                    </Heading>

                    <FormControl mb={3} isInvalid={'type' in errors}>
                        <FormControl.Label>{i18n.eventModal.form.type.title}</FormControl.Label>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                (getEventTypesRequest.isSuccess && getEventTypesRequest?.data?.data?.length) ? (
                                    <Select selectedValue={"" + value} onValueChange={onChange}>
                                        {getEventTypesRequest.data.data.filter((eventType: EventType) => eventType.slug !== 'all').map((eventType: EventType) => (
                                            <Select.Item key={eventType.id} label={eventType.title} value={"" + eventType.id} />
                                        ))}
                                    </Select>
                                ) : <></>
                            )}
                            name="type"
                        />
                        <FormControl.ErrorMessage>
                            {errors.type?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl mb={3} isInvalid={'title' in errors}>
                        <FormControl.Label>{i18n.eventModal.form.title.title}</FormControl.Label>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    onBlur={onBlur}
                                    onChangeText={(val) => onChange(val)}
                                    value={value}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            )}
                            name="title"
                        />
                        <FormControl.HelperText>{i18n.eventModal.form.title.sub}</FormControl.HelperText>
                        <FormControl.ErrorMessage>
                            {errors.title?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl mb={3} isInvalid={'description' in errors}>
                        <FormControl.Label>{i18n.eventModal.form.desc.title}</FormControl.Label>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextArea
                                    onBlur={onBlur}
                                    onChangeText={(val) => onChange(val)}
                                    value={value}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    autoCompleteType={null}
                                    alignContent="flex-start"
                                    textAlignVertical="top"
                                    alignItems="flex-start"
                                />
                            )}
                            name="description"
                        />
                        <FormControl.HelperText>{i18n.eventModal.form.desc.sub}</FormControl.HelperText>
                        <FormControl.ErrorMessage>
                            {errors.description?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl mb={3} isInvalid={'duration' in errors}>
                        <FormControl.Label>{i18n.eventModal.form.duration.title}</FormControl.Label>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value, name } }) => (
                                <DurationSlider
                                    onChange={onChange}
                                    value={value}
                                    name={name}
                                    setValue={setValue}
                                />
                            )}
                            name="duration"
                        />
                        <FormControl.ErrorMessage>
                            {errors.duration?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl mb={3} isInvalid={'date_time' in errors}>
                        <FormControl.Label>{i18n.eventModal.form.date_time.title}</FormControl.Label>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value, name } }) => (
                                <DateTimeInputs
                                    onChange={onChange}
                                    value={value}
                                    name={name}
                                    setValue={setValue}
                                />
                            )}
                            name="date_time"
                        />
                        <FormControl.ErrorMessage>
                            {errors.date_time?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl mb={3} isInvalid={'location_city' in errors}>
                        <FormControl.Label>{i18n.eventModal.form.location_city.title}</FormControl.Label>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Select selectedValue={value} onValueChange={onChange}>
                                    <Select.Item
                                        key={i18n.eventModal.form.location_city.defaultValue}
                                        label={i18n.eventModal.form.location_city.defaultValue}
                                        value={i18n.eventModal.form.location_city.defaultValue}
                                    />
                                </Select>
                            )}
                            name="location_city"
                        />
                        <FormControl.ErrorMessage>
                            {errors.location_city?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl mb={3} isInvalid={'slots' in errors}>
                        <FormControl.Label>{i18n.eventModal.form.slots.title}</FormControl.Label>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value, name } }) => (
                                <SlotsInput
                                    onChange={onChange}
                                    value={value}
                                    setValue={setValue}
                                    name={name}
                                />
                            )}
                            name="slots"
                        />
                        <FormControl.HelperText>{i18n.eventModal.form.slots.sub}</FormControl.HelperText>
                        <FormControl.ErrorMessage>
                            {errors.slots?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl mb={5} isInvalid={'background_image' in errors}>
                        <VStack alignItems="flex-start">
                            <FormControl.Label mb={2}>{i18n.eventModal.form.background_image_url.title}</FormControl.Label>
                            <Controller
                                control={control}
                                render={({ field: { value, name } }) => (
                                    <EventImagePicker
                                        value={value}
                                        name={name}
                                        setValue={setValue}
                                        resetField={resetField}
                                    />
                                )}
                                name="background_image"
                            />
                        </VStack>
                        <FormControl.HelperText>{i18n.eventModal.form.background_image_url.sub}</FormControl.HelperText>
                        <FormControl.ErrorMessage>
                            {errors.background_image?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl mb={5} isInvalid={'is_open' in errors}>
                        <VStack alignItems="flex-start">
                            <FormControl.Label mb={2}>{i18n.eventModal.form.is_open.title}</FormControl.Label>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value, name } }) => (
                                    <Switch
                                        onChange={onChange}
                                    />
                                )}
                                name="is_open"
                            />
                        </VStack>
                        <FormControl.ErrorMessage>
                            {errors.is_open?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl mb={5} isInvalid={'is_allowed_to_join_when_in_progress' in errors}>
                        <VStack alignItems="flex-start">
                            <FormControl.Label mb={2}>{i18n.eventModal.form.is_allowed_to_join_when_in_progress.title}</FormControl.Label>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Switch
                                        onChange={onChange}
                                        value={value}
                                    />
                                )}
                                name="is_allowed_to_join_when_in_progress"
                            />
                        </VStack>
                        <FormControl.ErrorMessage>
                            {errors.is_allowed_to_join_when_in_progress?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <HStack>
                        <Button.Group space={2}>
                            <Button
                                variant="solid"
                                colorScheme="green"
                                onPress={handleSubmit(onFormSubmit)}
                                isLoading={apiRequest.isLoading}
                                leftIcon={<Icon as={AntDesign} name="check" />}
                            >
                                {eventUuid ? i18n.profileScreen.editProfileModal.save : i18n.profileScreen.editProfileModal.add}
                            </Button>
                            <Button
                                variant="outline"
                                colorScheme="blueGray"
                                onPress={() => {
                                    navigation.goBack()
                                }}
                                leftIcon={<Icon as={AntDesign} name="close" />}
                            >
                                {i18n.profileScreen.editProfileModal.cancel}
                            </Button>
                        </Button.Group>
                    </HStack>

                </VStack>
            </TouchableWithoutFeedback>
        </ContainerScrollable>
    )
}
