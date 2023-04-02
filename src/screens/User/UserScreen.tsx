import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Button, Heading, HStack, Icon } from 'native-base'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { ContainerStatic } from '../../components/ContainerStatic'
import i18n from '../../config/i18n'
import { useAxios } from '../../hooks/useAxios'
import { ScreensEnum } from '../../navigation/enums/Screens.enum'
import { useAuthStore } from '../../store/AuthStore'
import { useNoticeStore } from '../../store/NoticeStore'
import { User } from '../../types/User.type'
import { Profile } from '../Profile/components/Profile'

type Props = {
    route: any
}

type GetUserResponse = {
    data: Event
}

export const UserScreen = ({ route }: Props) => {
    const { userUuid, backTo, anonymous } = route.params
    const navigation = useNavigation()

    const axios = useAxios()

    const userData = useAuthStore(state => state.userData)

    const setGlobalError = useNoticeStore(state => state.setGlobalError)

    const { status: getUserDataStatus, data: user, error, refetch: refetchEvent } = useQuery<unknown, unknown, User>(
        'user',
        async () => {
            try {
                const res = await axios.get(`/user/${userUuid}`)

                return res.data as GetUserResponse
            } catch (e) {
                console.log('getUserData exception', e)
            }
        }
    )

    useEffect(() => {
        if (getUserDataStatus === 'error') {
            setGlobalError(i18n.userScreen.errors.userFetch)
        }
    }, [getUserDataStatus])

    return (
        <ContainerStatic>
            <HStack>
                <Button onPress={() => {
                    navigation.navigate(ScreensEnum.EVENT, {
                        eventUuid: backTo
                    })
                }} mb={6} leftIcon={<Icon as={FontAwesome} name="arrow-left" />}>
                    {i18n.userScreen.back}
                </Button>
            </HStack>

            {userData ? (
                <>
                    <Heading>{i18n.userScreen.title}</Heading>
                    <Profile userData={userData} anonymous={anonymous} />
                </>
            ) : <></>}
        </ContainerStatic>
    )
}
