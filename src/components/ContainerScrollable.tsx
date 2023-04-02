import { ScrollView, VStack } from "native-base"
import React, { ReactElement, ReactNode } from "react"
import { Dimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { sizes } from "../config/variables"

type Props = {
    children: ReactNode
    hasNoOffsets?: boolean
    refreshControl?: ReactElement | undefined
}

export const ContainerScrollable = ({ children, hasNoOffsets = false, refreshControl = undefined }: Props) => {
    const safeAreaInsets = useSafeAreaInsets()

    return (
        <VStack
            w="100%"
            h={Dimensions.get('window').height - sizes.bottomBarHeight}
        >
            <ScrollView
                mx={0}
                my={0}
                px={hasNoOffsets ? 0 : 4}
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                refreshControl={refreshControl}
                w="100%"
            >
                <VStack
                    mt={hasNoOffsets ? 0 : safeAreaInsets.top}
                    pb={hasNoOffsets ? 0 : 4}
                >
                    {children}
                </VStack>
            </ScrollView>
        </VStack>
    )
}
