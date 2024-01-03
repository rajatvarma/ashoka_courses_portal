import { writable } from "svelte/store";

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

interface prerequisite {
    "PrerequisiteType"?: string,
    "OperatorUsed"?: string,
    "ComplexityLevel"?: number | null,
    "NoOfCourses"?: number | null,
    "nOFm_Courses"?: number | null,
    "RequiredCourses"?: string | null
}

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
    "prerequisites": prerequisite[],
}

const list: CourseObject[][] = [[], [], [], [], []]

export const currentScheduleIndex = writable(1);
export const scheduleList = writable(list);