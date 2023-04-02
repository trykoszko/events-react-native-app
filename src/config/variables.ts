import { API_URL, FACEBOOK_TOKEN } from "@env"

export const apiConfig = {
    url: API_URL
}

export const facebookConfig = {
    appId: FACEBOOK_TOKEN,
    permissions: ['public_profile', 'email'],
    fields: [
        'email',
        'first_name',
        'last_name',
        'gender',
        'link',
        'birthday'
    ]
}

export const sizes = {
    bottomBarHeight: 80
}
