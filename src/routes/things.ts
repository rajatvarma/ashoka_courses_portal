import { writable } from "svelte/store";

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export interface CourseObject {
    "courseTitle": string,
    "courseCode": string,
    "description": string,
    "faculty": string,
    "classCounts": number,
    "classDetails": string[],
    "timings": {
        "day": number,
        "start": string,
        "end": string,
        "room": string,
    }[],
    "semester": string,
    "year": number
}

const list: CourseObject[][] = [[], [], [], [], []]

export const currentScheduleIndex = writable(1);
export const scheduleList = writable(list);