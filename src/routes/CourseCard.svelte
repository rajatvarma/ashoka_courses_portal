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
            $scheduleList.forEach(item => {
                course.timings.forEach(thisCourseTiming => {
                    if(item.timings.some(e => (e.day == thisCourseTiming.day))) {
                        const clashDay = item.timings.find(e => (e.day == thisCourseTiming.day))
                        if (clashDay) {
                            if (thisCourseTiming.start >= clashDay.start && thisCourseTiming.start <= clashDay.end) {
                                alert(`Clash between ${course.title} & ${item.title} on ${days[clashDay.day]} at ${clashDay?.start}`)
                                return;
                            } 
                        }
                    }
                })
            });
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
    Faculty: {#each course.faculty as faculty}
        <span class="faculty">{faculty}</span>&nbsp;
    {/each}
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
        align-items: center;
        margin-top: 5%;
    }

    .timings-text {
        font-weight: 600;
        background-color: #C3C3C3;
        padding: 2%;
        margin-left: 5%;
    }

    .course-code {
        font-family: 'Courier New', Courier, monospace;
        font-size: 1em;
        border: #1b1b1b solid 1px;
        padding: 5px;
        font-weight: 900;
        align-self: flex-start;
    }

    .faculty {
        font-weight: 600;
        text-transform: capitalize;
        /* border: 0.25px #555 solid; */
        padding: 2px 5px;
    }
</style>