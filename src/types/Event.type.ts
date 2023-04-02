import { EventRelationEnum } from "../enums/EventRelation.enum";
import { EventType } from "./EventType.type";
import { User } from "./User.type";

export type Event = {
    key?: number;
    index: number,
    uuid: string,
    title: string,
    slug: string,
    location_city: string,
    location_country: string,
    description: string,
    slots: number,
    slots_left: number,
    date_time: Date,
    starts_in_days: number,
    duration: string,
    background_image_url: string,
    is_open: boolean,
    is_address_visible: boolean,
    is_userlist_visible: boolean,
    is_allowed_to_join_when_in_progress: boolean,

    joined_status: EventRelationEnum,

    type: EventType,
    owner: User,

    users_joined?: User[],
    users_pending?: User[],
    users_rejected?: User[],
    users_removed?: User[]
}
