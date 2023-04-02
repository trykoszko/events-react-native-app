import { Heading, Text } from 'native-base'
import React from 'react'
import { ContainerStatic } from '../../components/ContainerStatic'
import i18n from '../../config/i18n'
import { EventBoxSlider } from './components/EventBoxSlider'

export const HomeScreen = () => (
    <ContainerStatic>
        <Heading>{i18n.homeScreen.title}</Heading>
        <Text size="sm" h={50}>{i18n.homeScreen.tip}</Text>

        <EventBoxSlider />
    </ContainerStatic>
)
