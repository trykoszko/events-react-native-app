import { Button, HStack, Input, Text } from "native-base"
import React from "react"
import { FormComponentsPropsType } from "../types/FormComponentsProps.type"

export const SlotsInput = ({ value, onChange, setValue, name }: FormComponentsPropsType) => {

    const subtract = (val: number) => {
        setValue(name, value - val)
    }

    const add = (val: number) => {
        setValue(name, value + val)
    }

    return (
        <HStack justifyContent="center" space="3">
            <Button colorScheme="violet" onPress={() => {
                subtract(1)
            }}>
                <Text color="white">-</Text>
            </Button>
            <Input
                value={"" + value}
                onChange={val => onChange(val)}
                keyboardType="numeric"
                w={20}
            />
            <Button colorScheme="violet" onPress={() => {
                add(1)
            }}>
                <Text color="white">+</Text>
            </Button>
        </HStack>
    )
}
