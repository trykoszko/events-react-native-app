import { AntDesign } from "@expo/vector-icons"
import * as Facebook from "expo-auth-session/providers/facebook"
import * as WebBrowser from "expo-web-browser"
import { Button, Icon, Text, VStack } from 'native-base'
import React, { useEffect } from 'react'
import { FieldValues } from "react-hook-form"
import { useMutation } from "react-query"
import i18n from '../../../config/i18n'
import { facebookConfig } from "../../../config/variables"
import { useAxios } from "../../../hooks/useAxios"
import { useAuthStore } from "../../../store/AuthStore"
import { useNoticeStore } from "../../../store/NoticeStore"

type Props = {
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

WebBrowser.maybeCompleteAuthSession()

export const SocialLoginButtons = ({ isLoading, setIsLoading }: Props) => {
    const axios = useAxios()

    const setGlobalSuccess = useNoticeStore(state => state.setGlobalSuccess)
    const setGlobalError = useNoticeStore(state => state.setGlobalError)

    const setApiToken = useAuthStore(state => state.setApiToken)

    const [request, response, promptAsync] = Facebook.useAuthRequest({
        clientId: facebookConfig.appId,
    })

    const apiRequest = useMutation((formData: FieldValues) => axios.post(
        `/auth/social-auth`,
        formData
    ))

    useEffect(() => {
        if (apiRequest.status === 'success') {
            setGlobalSuccess(i18n.loginForm.form.loggedInMessage)
            setApiToken(apiRequest?.data?.data?.access_token)
        }
        if (apiRequest.status === 'error') {
            setGlobalError(i18n.loginForm.form.error)
        }
    }, [apiRequest.status])

    useEffect(() => {
        if (response?.type === "success" && response?.authentication) {
            (async () => {
                const userInfoResponse = await fetch(
                    `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,email,first_name,last_name,picture`
                )

                const userInfo = await userInfoResponse.json()

                apiRequest.mutate({
                    id: userInfo.id,
                    email: userInfo.email,
                    first_name: userInfo.first_name,
                    last_name: userInfo.last_name,
                    image_url: userInfo.picture.data.url,
                })
            })()
        }
    }, [response])

    const handleFacebookLogin = async (): Promise<void> => {
        setIsLoading(true)

        const result = await promptAsync()
        if (result.type !== "success") {
            setGlobalError(i18n.loginForm.socialLoginButtons.fbError)
            setIsLoading(false)
            return
        }
    }

    return (
        <VStack alignItems="center">
            <Text>{i18n.loginForm.socialLoginButtons.orSocials}</Text>
            <Button
                disabled={isLoading}
                mt={3}
                onPress={handleFacebookLogin}
                bgColor="#4267B2"
                leftIcon={<Icon as={AntDesign} name="facebook-square" />}
            >
                {i18n.loginForm.socialLoginButtons.facebookLogin}
            </Button>
        </VStack>
    )
}
