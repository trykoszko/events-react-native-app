import {Event} from './Event.type';

export type User = {
    id: number;

    uuid: string;
    first_name: string;
    last_name: string;
    location_city: string;
    location_country: string;
    bio: string;
    avatar_url: string;
    social_url_instagram: string;
    social_url_facebook: string;
    age: number;
    gender?: string;

    key?: number;
}

export type UserData = {
    id: number;
    uuid: string;
    email: string;
    first_name: string;
    last_name: string;
    birthdate: Date;
    location_city: string;
    location_country: string;
    bio: string;
    avatar_url: string;
    social_url_instagram: string;
    social_url_facebook: string;
    facebook_user_id: string;
    permissions: number;
    terms_accepted: boolean;
    is_active: string;
    gender?: string;
    created_at: Date;
    updated_at: Date;

    events_owned?: Event[];
    events_joined?: Event[];
    events_pending?: Event[];
    events_rejected?: Event[];
    events_removed?: Event[];
}