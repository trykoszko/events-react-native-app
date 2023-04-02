import { AntDesign } from "@expo/vector-icons"
import { Button, HStack, Icon, Text } from "native-base"
import React, { useEffect, useState } from "react"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { timestampToDay, timestampToTime } from "../../../utils/Date"
import { FormComponentsPropsType } from "../types/FormComponentsProps.type"

export const DateTimeInputs = ({ value, setValue, name }: FormComponentsPropsType) => {
    const [datepickerVisible, setDatepickerVisible] = useState<boolean>(false)
    const [timepickerVisible, setTimepickerVisible] = useState<boolean>(false)

    const [dateDay, setDateDay] = useState<Date>(new Date())
    const [dateHour, setDateHour] = useState<Date>(new Date())

    useEffect(() => {
        if (dateDay && dateHour) {
            const newDate = new Date(
                dateDay.getFullYear(),
                dateDay.getMonth(),
                dateDay.getDate(),
                dateHour.getHours(),
                dateHour.getMinutes()
            )
            setValue(name, newDate)
        }
    }, [dateDay, dateHour])

    return (
        <>
            <HStack flex={1} justifyContent="space-around" mb={2} mt={1}>
                <HStack alignItems="center">
                    <Text mr={2}>{timestampToDay(value)}</Text>

                    <Button
                        variant="solid"
                        colorScheme="info"
                        onPress={() => {
                            setDatepickerVisible(!datepickerVisible)
                        }}
                        borderRadius={100}
                        px={0}
                        w="34px"
                    >
                        <Icon mx="-1" as={<AntDesign name="edit" />} color="white" size="sm" />
                    </Button>
                </HStack>

                <HStack alignItems="center">
                    <Text mr={2}>{timestampToTime(value)}</Text>

                    <Button
                        variant="solid"
                        colorScheme="info"
                        onPress={() => {
                            setTimepickerVisible(!timepickerVisible)
                        }}
                        borderRadius={100}
                        px={0}
                        w="34px"
                    >
                        <Icon mx="-1" as={<AntDesign name="edit" />} color="white" size="sm" />
                    </Button>
                </HStack>
            </HStack>

            <DateTimePickerModal
                isVisible={datepickerVisible}
                mode="date"
                locale="pl"
                is24Hour={true}
                date={dateDay}
                minimumDate={new Date()}
                onConfirm={(val) => {
                    if (val) {
                        setDateDay(val)
                    }
                    setDatepickerVisible(false)
                }}
                onCancel={() => {
                    setDatepickerVisible(false)
                }}
            />

            <DateTimePickerModal
                isVisible={timepickerVisible}
                mode="time"
                locale="pl"
                is24Hour={true}
                date={dateHour}
                onConfirm={(val) => {
                    if (val) {
                        setDateHour(val)
                    }
                    setTimepickerVisible(false)
                }}
                onCancel={() => {
                    setTimepickerVisible(false)
                }}
            />
        </>
    )
}
