import { ScreensEnum } from "../../navigation/enums/Screens.enum"

export type RootStackParams = {
    [ScreensEnum.HOME]: undefined
    [ScreensEnum.EVENTS]: undefined
    [ScreensEnum.EVENT]: { eventUuid?: string, backTo?: string }
    [ScreensEnum.EVENT_FORM]: { eventUuid?: string, backTo?: string }
    [ScreensEnum.USER]: { userUuid?: string, backTo?: string, anonymous?: string }
    [ScreensEnum.PROFILE]: undefined
    [ScreensEnum.LOGIN]: undefined
    [ScreensEnum.REGISTER]: undefined
    [ScreensEnum.FORGOT_PASSWORD]: undefined
    [ScreensEnum.PROFILE_FORM]: undefined
}
