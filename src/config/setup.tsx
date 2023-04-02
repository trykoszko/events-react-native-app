import { Platform } from "react-native"

export const appSetup = () => {
    if (Platform.OS === "android") {
        // See https://github.com/expo/expo/issues/6536 for this issue.
        if (typeof (Intl as any).__disableRegExpRestore === "function") {
            (Intl as any).__disableRegExpRestore()
        }
    }
}
