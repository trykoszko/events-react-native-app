import { VStack } from "native-base"
import React from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const ContainerStatic = ({ children }: any) => {
    const safeAreaInsets = useSafeAreaInsets()

    return (
        <VStack
            px={4}
            pt={safeAreaInsets.top + 4}
            pb={4}
            w="100%"
            h="100%"
        >
            {children}
        </VStack>
    )
}