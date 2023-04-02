import { AntDesign } from "@expo/vector-icons"
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { Button, FormControl, Heading, Icon, Image, Input, Select, TextArea, VStack } from 'native-base'
import React, { useEffect } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as yup from "yup"
import { ContainerScrollable } from '../../components/ContainerScrollable'
import i18n from '../../config/i18n'
import { useAxios } from "../../hooks/useAxios"
import { ScreensEnum } from '../../navigation/enums/Screens.enum'
import { useAuthStore } from '../../store/AuthStore'
import { useNoticeStore } from '../../store/NoticeStore'
import { timestampToDay } from '../../utils/Date'

const formSchema = yup.object().shape({
    bio: yup.string(),
    location_city: yup.string().required().default(i18n.registerScreen.defaultCity),
    avatar_url: yup.object<ImagePicker.ImageInfo | undefined>(),
    social_url_instagram: yup.string(),
    social_url_facebook: yup.string()
})

export const ProfileFormScreen = () => {
    const navigation = useNavigation()

    const axios = useAxios()

    const userData = useAuthStore(state => state.userData)

    const setGlobalError = useNoticeStore(state => state.setGlobalError)
    const setGlobalSuccess = useNoticeStore(state => state.setGlobalSuccess)

    const { control, handleSubmit, formState: { errors }, reset, setValue, resetField } = useForm({
        resolver: yupResolver(formSchema)
    })

    const apiRequest = useMutation((formData: FieldValues) => axios.patch(
        `/user`,
        formData,
    ))

    const onFormSubmit = ((formData: FieldValues) => {
        apiRequest.mutate(formData)
    })

    const defaultImageInfo: ImagePicker.ImageInfo = {
        uri: userData?.avatar_url ?? '',
        width: 200,
        height: 200,
        cancelled: false
    }

    useEffect(() => {
        if (apiRequest.status === 'success') {
            setGlobalSuccess(i18n.profileScreen.editProfileModal.updated)
            navigation.navigate(ScreensEnum.PROFILE)
        }
        if (apiRequest.status === 'error') {
            setGlobalError(i18n.registerScreen.form.error)
        }
    }, [apiRequest.status])

    return (
        <ContainerScrollable>
            <Heading mb={3}>
                {i18n.profileScreen.editProfileModal.title}
            </Heading>

            <FormControl mb={3}>
                <FormControl.Label>{i18n.registerScreen.form.email}</FormControl.Label>
                <Input
                    value={userData?.email}
                    isDisabled={true}
                />
            </FormControl>

            <FormControl mb={3}>
                <FormControl.Label>{i18n.registerScreen.form.firstName}</FormControl.Label>
                <Input
                    value={userData?.first_name}
                    isDisabled={true}
                />
            </FormControl>

            <FormControl mb={3}>
                <FormControl.Label>{i18n.registerScreen.form.lastName}</FormControl.Label>
                <Input
                    value={userData?.last_name}
                    isDisabled={true}
                />
            </FormControl>

            <FormControl mb={3}>
                <FormControl.Label>{i18n.registerScreen.form.gender}</FormControl.Label>
                <Select selectedValue={i18n.registerScreen.form.genders[userData?.gender]} isDisabled={true}>
                    {Object.entries(i18n.registerScreen.form.genders).map(([k, v]) => (
                        <Select.Item key={k} label={v} value={v} />
                    ))}
                </Select>
            </FormControl>

            <FormControl mb={3} isInvalid={'avatar_url' in errors}>
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
                        name="avatar_url"
                        defaultValue={defaultImageInfo}
                    />
                </VStack>
                <FormControl.ErrorMessage>
                    {errors.avatar_url?.message}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={3}>
                <FormControl.Label>{i18n.registerScreen.form.dob}</FormControl.Label>
                <Input
                    value={timestampToDay(userData?.birthdate)}
                    isDisabled={true}
                />
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
                    defaultValue={userData?.bio}
                />
                <FormControl.HelperText>{i18n.registerScreen.form.subs.bio}</FormControl.HelperText>
                <FormControl.ErrorMessage>
                    {errors.bio?.message}
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

            <FormControl mb={3} isInvalid={'social_url_instagram' in errors}>
                <FormControl.Label>{i18n.registerScreen.form.socials.igLink}</FormControl.Label>
                <Controller
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <Input
                            onBlur={onBlur}
                            onChangeText={(val) => onChange(val)}
                            value={value}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    )}
                    name="social_url_instagram"
                    defaultValue={userData?.social_url_instagram}
                />
                <FormControl.ErrorMessage>
                    {errors.social_url_instagram?.message}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb={6} isInvalid={'social_url_facebook' in errors}>
                <FormControl.Label>{i18n.registerScreen.form.socials.fbLink}</FormControl.Label>
                <Controller
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <Input
                            onBlur={onBlur}
                            onChangeText={(val) => onChange(val)}
                            value={value}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    )}
                    name="social_url_facebook"
                    defaultValue={userData?.social_url_facebook}
                />
                <FormControl.ErrorMessage>
                    {errors.social_url_facebook?.message}
                </FormControl.ErrorMessage>
            </FormControl>

            <Button.Group space={2} mb={2}>
                <Button
                    variant="outline"
                    colorScheme="blueGray"
                    onPress={() => {
                        navigation.navigate(ScreensEnum.PROFILE, {})
                    }}
                    leftIcon={<Icon as={AntDesign} name="close" />}
                >
                    {i18n.profileScreen.editProfileModal.cancel}
                </Button>
                <Button
                    isLoading={apiRequest.isLoading}
                    onPress={handleSubmit(onFormSubmit)}
                    colorScheme="success"
                    leftIcon={<Icon as={AntDesign} name="save" />}
                >
                    {i18n.profileScreen.editProfileModal.save}
                </Button>
            </Button.Group>
        </ContainerScrollable>
    )
}
