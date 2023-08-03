import { writable } from "svelte/store";

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export interface CourseObject {
    "AutoId": number,
    "LSCode": string,
    "DSCode": string,
    "description": string,
    "UniqueId": string,
    "Rotation": string | null,
    "WeekDays": string,
    "TimeSlot": string,
    "ActualTimeSlot": string,
    "SpaceSysGenId": string,
    "SpaceName": string,
    "Status": string,
    "CourseTitle": string,
    "Faculty": string,
    "isTimeTableimported": boolean,
    "SpaceCapacity": number,
    "AvailableResource": string
}

const list: CourseObject[][] = [[], [], [], [], []]

export const currentScheduleIndex = writable(1);
export const scheduleList = writable(list);