import { AntDesign } from "@expo/vector-icons"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigation } from '@react-navigation/native'
import dayjs from "dayjs"
import * as ImagePicker from 'expo-image-picker'
import { Button, FormControl, HStack, Icon, Image, Input, Select, Text, TextArea, VStack } from "native-base"
import React, { useEffect, useState } from "react"
import { Controller, FieldValues, useForm } from "react-hook-form"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { useMutation } from "react-query"
import * as yup from "yup"
import i18n from '../../../config/i18n'
import { apiConfig } from "../../../config/variables"
import { ScreensEnum } from "../../../navigation/enums/Screens.enum"
import { useNoticeStore } from "../../../store/NoticeStore"
import { timestampToDay } from "../../../utils/Date"
import { useAxios } from "../../../hooks/useAxios"

const eighteenYearsAgo: Date = dayjs().subtract(18, 'year').subtract(1, 'day').toDate()

const formSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    gender: yup.string().required(),
    birthdate: yup.date().required().max(eighteenYearsAgo),
    bio: yup.string(),
    social_url_facebook: yup.string(),
    social_url_instagram: yup.string(),
    location_city: yup.string().required().default(i18n.registerScreen.defaultCity),
    location_country: yup.string().default(i18n.registerScreen.defaultCountry),
    avatar: yup.object<ImagePicker.ImageInfo>().required()
})

export const RegisterForm = () => {
    const navigation = useNavigation()

    const axios = useAxios()

    const setGlobalSuccess = useNoticeStore(state => state.setGlobalSuccess)
    const setGlobalError = useNoticeStore(state => state.setGlobalError)

    const { control, handleSubmit, formState: { errors }, reset, setValue, resetField } = useForm({
        resolver: yupResolver(formSchema)
    })

    const apiRequest = useMutation((formData: FieldValues) => axios.post(
        `/auth/register`,
        formData
    ))

    const onFormSubmit = ((formData: FieldValues) => {
        apiRequest.mutate(formData)
    })

    const [datepickerVisible, setDatepickerVisible] = useState<boolean>(false)

    useEffect(() => {
        if (apiRequest.status === 'success') {
            setGlobalSuccess(i18n.registerScreen.form.success)
            navigation.navigate(ScreensEnum.LOGIN)
        }
        if (apiRequest.status === 'error') {
            setGlobalError(i18n.registerScreen.form.error)
        }
    }, [apiRequest.status])

    return (
        <VStack mt={3}>

            <FormControl mb={3} isInvalid={'email' in errors}>
                <FormControl.Label>{i18n.registerScreen.form.email}</FormControl.Label>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            onBlur={onBlur}
                            onChangeText={(val) => onChange(val)}
                            value={value}
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect={false}
                        />
                    )}
                    name="email"
                />
                <FormControl.ErrorMessage>
                    {errors.email?.message}
                </FormControl.ErrorMessage>
                <FormControl.HelperText>{i18n.registerScreen.form.subs.email}</FormControl.HelperText>
            </FormControl>

            <FormControl mb={3} isInvalid={'password' in errors}>
                <FormControl.Label>{i18n.loginForm.form.password}</FormControl.Label>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            onBlur={onBlur}
                            onChangeText={(val) => onChange(val)}
                            value={value}
                            autoCapitalize="none"
                            autoComplete="password"
                            type="password"
                            autoCorrect={false}
                        />
                    )}
                    name="password"
                />
                <FormControl.ErrorMessage>
                    {errors.password?.message}
                </FormControl.ErrorMessage>
                <FormControl.HelperText>{i18n.registerScreen.form.subs.password}</FormControl.HelperText>
            </FormControl>

            <FormControl mb={3} isInvalid={'first_name' in errors}>
                <FormControl.Label>{i18n.registerScreen.form.firstName}</FormControl.Label>
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
                    name="first_name"
                />
                <FormControl.HelperText>{i18n.registerScreen.form.subs.firstName}</FormControl.HelperText>
                <FormControl.ErrorMessage>
                    {errors.first_name?.message}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={3} isInvalid={'last_name' in errors}>
                <FormControl.Label>{i18n.registerScreen.form.lastName}</FormControl.Label>
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
                    name="last_name"
                />
                <FormControl.HelperText>{i18n.registerScreen.form.subs.lastName}</FormControl.HelperText>
                <FormControl.ErrorMessage>
                    {errors.last_name?.message}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={3} isInvalid={'gender' in errors}>
                <FormControl.Label>{i18n.registerScreen.form.gender}</FormControl.Label>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Select selectedValue={value} onValueChange={onChange}>
                            {Object.entries(i18n.registerScreen.form.genders).map(([key, value]) => (
                                <Select.Item key={key} label={value} value={key} />
                            ))}
                        </Select>
                    )}
                    name="gender"
                    defaultValue={Object.keys(i18n.registerScreen.form.genders)[0]}
                />
                <FormControl.ErrorMessage>
                    {errors.gender?.message}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={3} isInvalid={'avatar' in errors}>
                <VStack alignItems="flex-start">
                    <FormControl.Label mb={2}>{i18n.registerScreen.form.image.title}</FormControl.Label>
                    <Controller
                        control={control}
                        render={({ field: { value, name } }) => (
                            <>
                                {value ? (
                                    <>
                                        <Image
                                            mb={2}
                                            src={value.uri}
                                            alt="Uploaded image"
                                            w={140}
                                            h={140}
                                            borderRadius={140}
                                        />
                                        <Button
                                            colorScheme="danger"
                                            leftIcon={<Icon as={AntDesign} name="closecircleo" />}
                                            onPress={() => {
                                                resetField(name)
                                            }}
                                        >
                                            {i18n.registerScreen.form.image.delete}
                                        </Button>
                                    </>
                                ) : (
                                    <Button leftIcon={<Icon as={AntDesign} name="picture" />} onPress={async () => {
                                        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

                                        if (!permissionResult.granted) {
                                            alert(i18n.registerScreen.form.image.noPermission);
                                            return;
                                        }

                                        const result = await ImagePicker.launchImageLibraryAsync({
                                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                            allowsEditing: false,
                                            aspect: [1, 1],
                                            quality: .8
                                        });

                                        if (!result.cancelled) {
                                            setValue(name, result);
                                        }
                                    }}>{i18n.registerScreen.form.image.add}</Button>
                                )}
                            </>
                        )}
                        name="avatar"
                    />
                </VStack>
                <FormControl.ErrorMessage>
                    {errors.avatar?.message}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={3} isInvalid={'birthdate' in errors}>
                <VStack>
                    <FormControl.Label>{i18n.registerScreen.form.dob}</FormControl.Label>
                    <Controller
                        control={control}
                        render={({ field: { value, name } }) => (
                            <>
                                <HStack mt={2} alignItems="center" justifyContent="space-between">
                                    <Text>{timestampToDay(value)}</Text>
                                    <Button
                                        variant="solid"
                                        colorScheme="info"
                                        onPress={() => {
                                            setDatepickerVisible(!datepickerVisible)
                                        }}
                                        borderRadius={100}
                                    >
                                        <Icon as={<AntDesign name="edit" />} color="white" size="sm" />
                                    </Button>
                                </HStack>

                                {datepickerVisible && (
                                    <DateTimePickerModal
                                        isVisible={datepickerVisible}
                                        mode="date"
                                        locale="pl"
                                        date={value}
                                        is24Hour={true}
                                        maximumDate={eighteenYearsAgo}
                                        onConfirm={(val: Date) => {
                                            if (val) {
                                                setValue(name, val)
                                            }
                                            setDatepickerVisible(false)
                                        }}
                                        onCancel={() => {
                                            setDatepickerVisible(false)
                                        }}
                                    />
                                )}
                            </>
                        )}
                        name="birthdate"
                        defaultValue={eighteenYearsAgo}
                    />
                    <FormControl.ErrorMessage>
                        {errors.birthdate?.message}
                    </FormControl.ErrorMessage>
                </VStack>
            </FormControl>

            <FormControl mb={3} isInvalid={'bio' in errors}>
                <FormControl.Label>{i18n.registerScreen.form.bio}</FormControl.Label>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextArea
                            spellCheck={false}
                            alignContent="flex-start"
                            textAlignVertical="top"
                            alignItems="flex-start"
                            autoCapitalize="none"
                            autoCompleteType={null}
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                    name="bio"
                />
                <FormControl.HelperText>{i18n.registerScreen.form.subs.bio}</FormControl.HelperText>
                <FormControl.ErrorMessage>
                        {errors.bio?.message}
                    </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={3} isInvalid={'social_url_facebook' in errors}>
                <FormControl.Label>{i18n.registerScreen.form.socials.fbLink}</FormControl.Label>
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
                    name="social_url_facebook"
                />
                <FormControl.ErrorMessage>
                    {errors.social_url_facebook?.message}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={3} isInvalid={'social_url_instagram' in errors}>
                <FormControl.Label>{i18n.registerScreen.form.socials.igLink}</FormControl.Label>
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
                    name="social_url_instagram"
                />
                <FormControl.ErrorMessage>
                    {errors.social_url_instagram?.message}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={3} isInvalid={'location_city' in errors}>
                <FormControl.Label>{i18n.registerScreen.form.locationCity}</FormControl.Label>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Select selectedValue={value} onValueChange={onChange}>
                            {i18n.registerScreen.form.cities.map(city => (
                                <Select.Item key={city} label={city} value={city} />
                            ))}
                        </Select>
                    )}
                    name="location_city"
                    defaultValue={i18n.registerScreen.defaultCity}
                />
                <FormControl.ErrorMessage>
                    {errors.location_city?.message}
                </FormControl.ErrorMessage>
            </FormControl>

            <Button
                mt={4}
                variant="solid"
                colorScheme="green"
                onPress={handleSubmit(onFormSubmit)}
                isLoading={apiRequest.isLoading}
            >
                {i18n.registerScreen.form.submit}
            </Button>

        </VStack>
    )
}
