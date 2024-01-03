<script lang="ts">
    import { ClockSolid, LocationDotSolid } from "svelte-awesome-icons";
    import { scheduleList, days, currentScheduleIndex } from "./things";
    import type { CourseObject } from "./things";
	import { each } from "svelte/internal";

    export let course:CourseObject

    
    let isChecked = $scheduleList[$currentScheduleIndex].some((item:CourseObject) => (course.courseCode == item.courseCode))
    // console.log(course.LSCode, $currentScheduleIndex, isChecked)
    let isDescriptionShown = false;

    function addToSchedule() {
        isChecked = !isChecked
        let clashingCourse = $scheduleList[$currentScheduleIndex].find((item:CourseObject) => {
            if (item.courseCode == course.courseCode) return false;
            
            const isSameDay = course.timings.map(t => t.day).some(d => item.timings.map(t => t.day).includes(d))
            
            if (!isSameDay) return false;

            return course.timings.some(t1 => {
                return item.timings.some(t2 => {
                    const a1 = parseInt(t1.start.replace(":", ""))
                    const a2 = parseInt(t1.end.replace(":", ""))
                    const b1 = parseInt(t2.start.replace(":", ""))
                    const b2 = parseInt(t2.end.replace(":", ""))

                    return (Math.max(a1, b1) <= Math.min(a2, b2))
                });
            });
        });

        if (clashingCourse) {
            alert(`This course clashes with ${clashingCourse.courseTitle}.`)
            isChecked = false
        }
        
        if (isChecked) {
            $scheduleList[$currentScheduleIndex] = [...$scheduleList[$currentScheduleIndex], course]
        } else {
            $scheduleList[$currentScheduleIndex] = $scheduleList[$currentScheduleIndex].filter((item:CourseObject) => (course.courseCode != item.courseCode))
        }
    }

</script>

<div class="course-card">
    <div class="course-faculty">
        {#each course.courseCode.split('/ ') as code}
            <span class="course-code">
                {code}
            </span>
        {/each}
    </div>
    <span class="course-title">
        {course.courseTitle}
    </span>
    <div class="course-faculty">
    Faculty: 
    <br>
    {#each course.faculty.split(',') as faculty}
        <span class="faculty">{faculty}</span><br>
    {/each}
    </div>
    <span class="course-timings">
        <!-- <h3>Timings</h3> -->
        <ClockSolid size="16" color="#1b1b1b" />
        <!-- TODO: can collapse shared timings into the same html element -->
        {#each course.timings as timing}
            <div class="timings-text">
                <p>{timing.start}-{timing.end}</p>
                <p>{days[timing.day]}</p>
            </div>
        {/each}
    </span>
    <span class="course-timings">
        <LocationDotSolid size="16" color="#1b1b1b" />
        <div class="timings-text">
            <!-- join unique rooms for this course -->
            {Array.from(new Set(course.timings.map(timing => timing.room))).join('/')}
        </div>
    </span>
    <div style="display: flex; align-items: center">
        <p style="margin-right: 2%; font-weight:500">Add to schedule:</p>
        <input type="checkbox" bind:checked={isChecked} on:click={() => {addToSchedule()}} id="checkbox">
    </div>
    <button class="button" on:click={() => {isDescriptionShown = !isDescriptionShown}}>{isDescriptionShown ? 'Hide' : 'Show'} Description</button>
    <div style="display: {isDescriptionShown ? 'block' : 'none'}; height: 40vh; overflow-y: scroll">
    {@html course.description}
    </div>
    <div>
        <b>Prerequisites:</b>
        {#if course.prerequisites.length == 0}
            <p>None</p>
        {/if}
        <div style="display: flex; flex-wrap: wrap; flex-direction: column;margin-top: 10px">
            {#each course.prerequisites as prerequisite}
                {#if prerequisite.PrerequisiteType == "MathRequired"}
                    <p>Mathematics required in XI or XII</p>
                {/if}
                {#if prerequisite.PrerequisiteType == "RequiredCourses"}
                    {#each prerequisite.RequiredCourses?.split(',') as reqdCourse}
                        <p style="margin: 0">{reqdCourse}</p>
                    {/each}
                {/if}
                {#if course.prerequisites.length > 1 && prerequisite == course.prerequisites[0]}
                    <p style="text-align:center; font-weight: 700">{course.prerequisites[0].OperatorUsed}</p>
                {/if}
            {/each}
        </div>
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
        font-size: 1.25em;
        margin: 5% 0;
        font-family: 'Inconsolata';
        font-weight: 900;
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
        font-family: 'Azeret Mono', Courier, monospace;
        font-size: 0.75em;
        border: #1b1b1b solid 1px;
        padding: 5px;
        font-weight: 900;
        align-self: flex-start;
        margin-right: 2%;
    }

    .faculty {
        font-weight: 600;
        /* text-transform: capitalize; */
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