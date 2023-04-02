import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { Button, FormControl, Input, Link } from 'native-base'
import React, { useEffect } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as yup from "yup"
import i18n from '../../../config/i18n'
import { ScreensEnum } from '../../../navigation/enums/Screens.enum'
import { useAuthStore } from '../../../store/AuthStore'
import { useNoticeStore } from '../../../store/NoticeStore'
import { useAxios } from '../../../hooks/useAxios'

const formSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8)
})

export const LoginForm = () => {
    const navigation = useNavigation()

    const axios = useAxios()

    const setGlobalSuccess = useNoticeStore(state => state.setGlobalSuccess)
    const setGlobalError = useNoticeStore(state => state.setGlobalError)
    const setApiToken = useAuthStore(state => state.setApiToken)

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(formSchema)
    })

    const apiRequest = useMutation((formData: FieldValues) => axios.post(
        `/auth/login`,
        formData
    ))

    const onFormSubmit = ((formData: FieldValues) => {
        apiRequest.mutate(formData)
    })

    useEffect(() => {
        if (apiRequest.status === 'success') {
            setGlobalSuccess(i18n.loginForm.form.loggedInMessage)
            setApiToken(apiRequest?.data?.data?.access_token)
        }
        if (apiRequest.status === 'error') {
            setGlobalError(i18n.loginForm.form.error)
        }
    }, [apiRequest.status])

    return (
        <>
            <FormControl isInvalid={'email' in errors}>
                <FormControl.Label>{i18n.loginForm.form.email}</FormControl.Label>
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
                    rules={{ required: true }}
                    defaultValue=""
                />
                <FormControl.ErrorMessage>
                    {errors.email?.message}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={'password' in errors}>
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
                    rules={{ required: true }}
                    defaultValue=""
                />
                <FormControl.ErrorMessage>
                    {errors.password?.message}
                </FormControl.ErrorMessage>
            </FormControl>

            <Link
                _text={{
                    fontSize: 'xs',
                    fontWeight: '500',
                    color: 'indigo.500'
                }}
                alignSelf="flex-end"
                mt={3}
                mb={2}
                onPress={() => {
                    navigation.navigate(ScreensEnum.FORGOT_PASSWORD, {})
                }}
            >
                {i18n.loginForm.form.forgotPassword}
            </Link>

            <Button
                mt="2"
                colorScheme="orange"
                onPress={handleSubmit(onFormSubmit)}
                isLoading={apiRequest.isLoading}
            >
                {i18n.loginForm.form.signIn}
            </Button>
        </>
    )
}
