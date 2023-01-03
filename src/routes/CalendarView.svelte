<script lang="ts">
    import { days, scheduleList } from "./things";
    import type { CourseObject } from "./things";

    function getTime(x:number) {
        const newTime = x - 800
        const hours = Math.floor(newTime/100)
        const normalizedMinutes = Number(((newTime % 100) / 60).toFixed(2))
        console.log(Number(hours+normalizedMinutes)*42+50+(hours*0.25))
        return (Number(hours+normalizedMinutes)*6+8.5+(hours*0.17))
}
</script>

<div id="table">
    <div class="table-day">
        <div class="cell" style="border: none; width: 3vw"></div> 
        {#each Array.from(Array(14)) as _, i}
        <div class="cell" style="border-top: 0.25px solid #00000000; width: 3vw">
            <p class="time-text">{i+8 < 10 ? "0" : ""}{i+8}:00</p>
        </div>
        {/each}
    </div>
    {#each days as day}
    <div class="table-day">
        <div class="cell" style="border: none;">
            <p class="day-text">{day}</p>
        </div>
        {#each $scheduleList as course}
            {#if course.timings.some(item => (days[item.day] == day))}
                <div class="table-course"
                    style="top: {getTime(course.timings.find(item => days[item.day] == day).start)}vh; height: 9.5vh">
                    <!-- <p style="margin: 0;">{'A'.repeat(20)}</p> -->
                    <p style="margin: 5px;">{course.code[0]}</p>
                </div>
            {/if}
        {/each}
        {#each Array.from(Array(14)) as _, i}
            <div class="cell"></div> 
        {/each}
    </div>
    {/each}
</div>

<style>
    #table {
        max-height: 100%;
        width: 60vw;
        display: flex;
        background-color: #CCC;
        flex-direction: row;
        padding-left: 20px;
        box-shadow: 0px 5px 20px #1119;
    }

    .cell {
        height: 6vh;
        width: 7.5vw;
        border-top: 0.25px solid black;
        border-right: 0.25px solid black;
    }

    .table-course {
        position: absolute;
        background-color: #0d3862;
        color: wheat;
        font-family: monospace;
        width: 7vw;
        margin: 0;
        word-wrap: break-word;
    }

    .table-day {
        display: flex;
        flex-direction: column;
    }

    .time-text {
        margin: 0 0.25vw 0 0 ;
        text-align: right;
        font-size: 0.75em;
        font-weight: 600;
    }

    .day-text {
        font-size: 0.8em;
        font-weight: 600;
        text-align: center;
        /* margin: 10px; */
    }


    @media (max-width: 400px) {
        
    }
</style>