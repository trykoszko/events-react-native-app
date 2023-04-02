import "intl"
import "intl/locale-data/jsonp/en"
import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { SSRProvider } from 'react-aria'
import "react-native-gesture-handler"
import { QueryClientProvider } from "react-query"
import { appSetup } from './src/config/setup'
import { queryClient } from "./src/query/Query"
import { AppStack } from './src/stack/AppStack'
import { NoticeStoreWrapper } from "./src/store/components/NoticeStoreWrapper"

// Setup the Application
appSetup()

export const App = () => (
    <SSRProvider>
        <QueryClientProvider client={queryClient}>
            <NativeBaseProvider>
                <NoticeStoreWrapper>
                    <AppStack />
                </NoticeStoreWrapper>
            </NativeBaseProvider>
        </QueryClientProvider>
    </SSRProvider>
)

export default App
