<script lang="ts">
    import { ClockSolid, LocationDotSolid } from "svelte-awesome-icons";
    import { scheduleList, days } from "./things";
    import type { CourseObject } from "./things";

    export let course:CourseObject

    let isChecked = $scheduleList.some((item:CourseObject) => (course.code == item.code));

    let isDescriptionShown = false;

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
                                alert(`Clash between [${course.title}] and [${item.title}] on ${days[clashDay.day]} at ${clashDay?.start.toString().slice(0, -2) + ':' + clashDay?.start.toString().slice(-2)}`)
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
    <div class="course-faculty">
        {#each course.code as code}
            <span class="course-code">
                {code}
            </span>
        {/each}
    </div>
    <span class="course-title">
        {course.title}
    </span>
    <div class="course-faculty">
    Faculty: 
    <br>
    {#each course.faculty as faculty}
        <span class="faculty">{faculty}</span><br>
    {/each}
    </div>
    <span class="course-timings">
        <!-- <h3>Timings</h3> -->
        <ClockSolid size="16" color="#1b1b1b" />
        <div class="timings-text">
            {#each course.timings as timing}
                <p>{days[timing.day]}: {timing.start.toString().slice(0, -2) + ":" + timing.start.toString().slice(-2)} - {timing.end.toString().slice(0, 2) + ":" + timing.end.toString().slice(2)}</p>
            {/each}
        </div>
    </span>
    <span class="course-timings">
        <LocationDotSolid size="16" color="#1b1b1b" />
        <div class="timings-text">
            {course.locations.toString()}
        </div>
    </span>
    <div style="display: flex; align-items: center">
        <p style="margin-right: 2%; font-weight:500">Add to schedule:</p>
        <input type="checkbox" bind:checked={isChecked} on:click={() => {updateSchedule(course)}} id="checkbox">
    </div>
    <button class="button" on:click={() => {isDescriptionShown = !isDescriptionShown}}>{isDescriptionShown ? 'Hide' : 'Show'} Description</button>
    <div style="display: {isDescriptionShown ? 'block' : 'none'}; height: 40vh; overflow-y: scroll">
    {@html course.description}
    </div>
</div>


<style>
    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track {
        background-color: #ccc;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #1b1b1b;
    }

    .course-card {
        display: flex;
        max-width: 35vw;
        min-width: 35vw;
        flex-direction: column;
        background-color: #FFF;
        color: #1b1b1b;
        border: #00000000 solid 1px;
        box-shadow: #1b1b1b 0px 5px 10px;
        padding: 2%;
        word-wrap: break-word;
        margin: 2vw;
    }

    .course-title {
        font-size: 1em;
        margin: 5% 0;
        font-family: 'Comfortaa';
        font-weight: 700;
    }

    .button {
        border: none;
        background-color: #00b3a1;
        font-family: "Inconsolata";
        font-weight: 500;
        font-size: medium;
        padding: 2% 5%;
        margin-bottom: 2%;
    }

    .course-faculty {
        align-items: center;
        display: flex;
        width: 30vw;
        flex-wrap: wrap;
    }

    .course-timings {
        padding: 0 5%;
        display: flex;
        align-items: center;
    }

    .timings-text {
        font-weight: 600;
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
        margin-right: 2%;
    }

    .faculty {
        font-weight: 600;
        text-transform: capitalize;
        /* border: 0.25px #555 solid;
        border-radius: 10px; */
        padding: 5px;
        width: '35vw';
        justify-content: space-evenly;
        margin: 0px 5px 0px 5px;
    }

    @media (max-width: 450px) {
        .course-card {
            min-width: 80vw;
        }
    }
</style>