import { FontAwesome } from '@expo/vector-icons'
import { Avatar, Button, Heading, HStack, Icon, Text, VStack } from 'native-base'
import React from 'react'
import { Linking } from 'react-native'
import i18n from '../../../config/i18n'
import { UserData } from '../../../types/User.type'
import { timestampToDay } from '../../../utils/Date'

type Props = {
    userData: UserData
    anonymous?: boolean
}

export const Profile = ({ userData, anonymous = false }: Props) => (
    <>
        <HStack>
            <Avatar mt={4} size="48px" source={{
                uri: userData.avatar_url
            }} />
            <Heading size="md" mt={6} ml={3}>{userData.first_name} {anonymous ? `${userData.last_name.substring(0, 1)}.` : userData.last_name}</Heading>
        </HStack>
        {userData.email && (
            <VStack>
                <Heading size="sm" mt={4} mb={2}>{i18n.profileScreen.fields.email}</Heading>
                <Text>{userData.email}</Text>
            </VStack>
        )}
        {userData.birthdate && (
            <VStack>
                <Heading size="sm" mt={4} mb={2}>{i18n.profileScreen.fields.dob}</Heading>
                <Text>{timestampToDay(userData.birthdate)}</Text>
            </VStack>
        )}
        {(userData.location_country && userData.location_city) && (
            <VStack>
                <Heading size="sm" mt={4} mb={2}>{i18n.profileScreen.fields.location}</Heading>
                <Text>{userData.location_city}</Text>
            </VStack>
        )}
        {userData.bio && (
            <VStack>
                <Heading size="sm" mt={4} mb={2}>{i18n.profileScreen.fields.bio}</Heading>
                <Text>{userData.bio}</Text>
            </VStack>
        )}
        {(userData.social_url_facebook || userData.social_url_instagram) && (
            <VStack>
                <Heading size="sm" mt={4} mb={2}>{i18n.profileScreen.fields.socialMedia}</Heading>
                <HStack>
                    {userData.social_url_facebook && (
                        <Button onPress={() => {
                            Linking.openURL(userData.social_url_facebook)
                        }}
                            mr={3}>
                            <Icon mx={0} my={0} as={<FontAwesome name="facebook" />} color="white" size="sm" />
                        </Button>
                    )}
                    {userData.social_url_instagram && (
                        <Button onPress={() => {
                            Linking.openURL(userData.social_url_instagram)
                        }}>
                            <Icon mx={0} my={0} as={<FontAwesome name="instagram" />} color="white"
                                size="sm" />
                        </Button>
                    )}
                </HStack>
            </VStack>
        )}
    </>
)
