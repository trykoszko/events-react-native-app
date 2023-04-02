export type Participant = {
    id?: number,

    uuid: string,
    age: number,
    avatar_url: string,
    bio: string,
    first_name: string,
    last_name: string,
    location_city: string,
    location_country: string,
    social_url_facebook?: string,
    social_url_instagram?: string,

    key?: number
}
