import React from "react"
import { FormComponentsPropsType } from "../types/FormComponentsProps.type"
import { Button, Icon, Image } from "native-base"
import { AntDesign } from "@expo/vector-icons"
import i18n from "../../../config/i18n"
import * as ImagePicker from 'expo-image-picker'

export const EventImagePicker = ({ value, resetField, setValue, name }: FormComponentsPropsType) => (
    <>
        {value ? (
            <>
                <Image
                    mb={2}
                    src={value.uri}
                    alt="Uploaded image"
                    w="100%"
                    h={280}
                />
                <Button
                    colorScheme="danger"
                    leftIcon={<Icon as={AntDesign} name="closecircleo" />}
                    onPress={() => {
                        resetField(name)
                    }}
                >
                    {i18n.registerScreen.form.image.delete}
                </Button>
            </>
        ) : (
            <Button
                leftIcon={<Icon as={AntDesign} name="picture" />}
                onPress={async () => {
                    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

                    if (!permissionResult.granted) {
                        alert(i18n.registerScreen.form.image.noPermission)
                        return
                    }

                    const result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: false,
                        aspect: [5, 4],
                        quality: .8
                    })

                    if (!result.cancelled) {
                        setValue(name, result)
                    }
                }}
            >
                {i18n.registerScreen.form.image.add}
            </Button>
        )}
    </>
)