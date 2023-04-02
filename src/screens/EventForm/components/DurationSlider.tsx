import { Button, Slider, Text } from "native-base"
import React from "react"
import i18n from "../../../config/i18n"
import { FormComponentsPropsType } from "../types/FormComponentsProps.type"

// @TODO: fix any
export const DurationSlider = ({ value, setValue, onChange, name }: FormComponentsPropsType) => {
    const days = Math.floor(value / (60 * 24))
    const hours = Math.floor((value / 60) % 24)
    const minutes = value % 60

    const minValue = 10 // 10 minutes
    const maxValue = 24 * 60 * 30 // 15 days

    const addTime = (amount: number) => {
        // prevent more than maxValue
        if (value + amount > maxValue) {
            return
        }
        setValue(name, value + amount)
    }

    const subtractTime = (amount: number) => {
        // prevent minus values
        if (value - amount < minValue) {
            return
        }
        setValue(name, value - amount)
    }

    const daysInfo = days ? `${days} ${i18n.eventModal.form.duration.units.days(days)}` : ''
    const hoursInfo = hours ? `${hours} ${i18n.eventModal.form.duration.units.hours(hours)}` : ''
    const minutesInfo = minutes ? `${minutes} ${i18n.eventModal.form.duration.units.minutes}` : ''

    return (
        <>
            <Text mb={3}>
                {daysInfo} {hoursInfo} {minutesInfo}
            </Text>
            <Slider
                value={value}
                onChange={val => onChange(val)}
                minValue={minValue}
                maxValue={maxValue}
                step={10}
                mb={4}
            >
                <Slider.Track>
                    <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
            </Slider>
            <Button.Group>
                <Button colorScheme="violet" onPress={() => {
                    subtractTime(60 * 24)
                }}>
                    <Text color="white">-1d</Text>
                </Button>
                <Button colorScheme="fuchsia" onPress={() => {
                    subtractTime(60)
                }}>
                    <Text color="white">-1h</Text>
                </Button>
                <Button colorScheme="blue" onPress={() => {
                    subtractTime(10)
                }}>
                    <Text color="white">-10m</Text>
                </Button>

                <Button ml="auto" colorScheme="blue" onPress={() => {
                    addTime(10)
                }}>
                    <Text color="white">+10m</Text>
                </Button>
                <Button colorScheme="fuchsia" onPress={() => {
                    addTime(60)
                }}>
                    <Text color="white">+1h</Text>
                </Button>
                <Button colorScheme="violet" onPress={() => {
                    addTime(60 * 24)
                }}>
                    <Text color="white">+1d</Text>
                </Button>
            </Button.Group>
        </>
    )
}
