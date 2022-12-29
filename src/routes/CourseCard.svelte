<script lang="ts">
    import { ClockSolid, LocationDotSolid } from "svelte-awesome-icons";
    import { scheduleList, days } from "./things";
    import type { CourseObject } from "./things";

    export let course:CourseObject

    let isChecked = $scheduleList.some((item:CourseObject) => (course.code == item.code));

    function updateSchedule(course:CourseObject) {
        if ($scheduleList.some((item:CourseObject) => (course.code == item.code))) {
            $scheduleList = $scheduleList.filter((item:CourseObject) => (item.code !== course.code))
        } else {
            $scheduleList = [...$scheduleList, course]
        }
    }
</script>


<div class="course-card">
    <span class="course-code">
        {course.code}
    </span>
    <span class="course-title">
        {course.title}
    </span>
    <span class="course-faculty">
    {course.faculty.toString()}
    </span>
    <span class="course-timings">
        <!-- <h3>Timings</h3> -->
        <ClockSolid size="20" color="#1b1b1b" />
        <div class="timings-text">
            {#each course.timings as timing}
                <p>{days[timing.day]}: {timing.start} - {timing.end}</p>
            {/each}
        </div>
    </span>
    <span class="course-timings">
        <LocationDotSolid size="20" color="#1b1b1b" />
        <div class="timings-text">
            {course.locations.toString()}
        </div>
    </span>
    <div style="display: flex; align-items: center">
        <p>Add to schedule</p>
        <input type="checkbox" bind:checked={isChecked} on:click={() => {updateSchedule(course)}} id="checkbox">
    </div>
</div>

<style>

    #checkbox {
        border-radius: 100px;
        background-color: aqua;
    }

    .course-card {
        display: flex;
        width: 40vw;
        flex-direction: column;
        background-color: #C3C3C3;
        color: #1b1b1b;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        border: #00000000 solid 1px;
        box-shadow: #1b1b1b 0px 5px 10px;
        padding: 2%;
        word-wrap: break-word;
        margin: 2vw;
    }

    .course-title {
        font-weight: 700;
        font-size: 1.25em;
        margin: 5% 0;
    }

    .course-timings {
        /* border: 1px solid violet; */
        padding: 0 5%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: right;
        margin-top: 5%;
    }

    .timings-text {
        font-weight: 600;
        background-color: #C3C3C3;
        padding: 2%;
    }

    .course-code {
        font-family: 'Courier New', Courier, monospace;
        font-size: 1em;
        border: #1b1b1b solid 1px;
        padding: 5px;
        font-weight: 900;
        align-self: flex-start;
    }

    /* .undefined {
        font-family: Georgia, 'Times New Roman', Times, serif;
        font-size: 0.6em;
        color: grey;
    } */
</style>