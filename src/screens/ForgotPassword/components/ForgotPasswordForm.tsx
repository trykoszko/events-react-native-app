import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, Center, FormControl, Heading, Input, Text, VStack } from "native-base"
import React, { useEffect } from "react"
import { Controller, FieldValues, useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as yup from "yup"
import i18n from "../../../config/i18n"
import { useNoticeStore } from "../../../store/NoticeStore"
import { useAxios } from "../../../hooks/useAxios"

const formSchema = yup.object().shape({
    email: yup.string().email().required()
})

export const ForgotPasswordForm = () => {
    const setGlobalSuccess = useNoticeStore(state => state.setGlobalSuccess)

    const axios = useAxios()

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(formSchema)
    })

    const apiRequest = useMutation((formData: FieldValues) => axios.post(
        `/auth/forgot-password`,
        formData
    ))

    const onFormSubmit = ((formData: FieldValues) => {
        apiRequest.mutate(formData)
        reset()
    })

    useEffect(() => {
        if (apiRequest.status !== 'idle') {
            setGlobalSuccess(i18n.forgotPasswordScreen.confirmation)
        }
    }, [apiRequest.status])

    return (
        <VStack mt={10}>
            <Center w="100%">
                <Box p={2} w="90%" maxW={290}>

                    <Heading mb={3} size="md">{i18n.forgotPasswordScreen.heading}</Heading>

                    <Text>{i18n.forgotPasswordScreen.text}</Text>

                    <VStack mt={8} justifyContent="flex-start">

                        <FormControl isRequired isInvalid={'email' in errors}>

                            <FormControl.Label>{i18n.forgotPasswordScreen.email}</FormControl.Label>

                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        onBlur={onBlur}
                                        onChangeText={(val) => onChange(val)}
                                        value={value}
                                        autoCapitalize="none"
                                        autoComplete="email"
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

                        <Button
                            h={10}
                            mt={3}
                            w="30%"
                            colorScheme="orange"
                            onPress={handleSubmit(onFormSubmit)}
                            isLoading={apiRequest.isLoading}
                        >
                            {i18n.forgotPasswordScreen.submit}
                        </Button>

                    </VStack>
                </Box>
            </Center>
        </VStack>
    )
}
