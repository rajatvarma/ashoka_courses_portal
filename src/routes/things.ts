import { writable } from "svelte/store";

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export interface CourseObject {
    fullName?: string;
    code: string[];
    locations: string[];
    timings: {
        day: number;
        start: number;
        end: number;
    }[];
    faculty: string[];
    title: string;
    description?: string;
}

const list: CourseObject[] = []

export const scheduleList = writable(list);