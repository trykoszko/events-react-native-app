import { Alert, HStack, Slide, Text } from 'native-base'
import React, { useEffect } from 'react'

type Props = {
    message: string
}

export const TopSuccessBar = ({ message }: Props) => {
    const isActive = message !== ''

    return (
        <Slide in={isActive} placement="top">
            <Alert status="success" safeAreaTop={10} pt={5}>
                <HStack alignItems="center">
                    <Alert.Icon mr={2} />
                    <Text color="success.600" fontWeight="medium">
                        {message}
                    </Text>
                </HStack>
            </Alert>
        </Slide>
    )
}
