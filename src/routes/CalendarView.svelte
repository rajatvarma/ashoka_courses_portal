<script lang="ts">
    import { days, scheduleList } from "./things";
    // import type { CourseObject } from "./things";

    function getTime(x:number) {
        const newTime = x - 800
        const hours = Math.floor(newTime/100)
        const normalizedMinutes = Number(((newTime % 100) / 60).toFixed(2))
        return (Number(hours+normalizedMinutes)*6+6.2+(hours*0.25))
    }
</script>

<div id="table">
    <div class="table-day">
        <div class="cell" style="border: none; width: 3vw"></div> 
        {#each Array.from(Array(14)) as _, i}
        <div class="cell time-cell">
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
            <div class="cell">
                {#each Array.from(Array(5)) as line}
                    <div class="line"></div>
                {/each}
            </div> 
        {/each}
    </div>
    {/each}
</div>

<style>
    #table {
        max-height: 100%;
        width: 100%;
        display: flex;
        background-color: #CCC;
        flex-direction: row;
        padding: 0vh 2vw;
        box-shadow: 0px 5px 20px #1119;
    }

    .cell {
        height: 6vh;
        width: 8.5vw;
        border-top: 0.25vh solid #999;
        border-right: 0.1vw solid #999;
        justify-content: space-evenly;
        display: flex;
        flex-direction: column;
    }

    .time-cell {
        border-top: 0.25vh solid #00000000;
        width: 3vw;
        justify-content: flex-start
    }

    .table-course {
        position: absolute;
        background-color: #0d3862;
        color: wheat;
        font-family: monospace;
        width: 8vw;
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
        font-size: 0.8rem;
        font-weight: 600;
        text-align: center;
        /* margin: 10px; */
    }

    .line {
        width: '100%';
        height: 0.1vh;
        background-color: #1112;
    }

    @media (max-width: 400px) {
        .time-text {
            font-size: 0.5em;
        }

        .day-text {
            font-size: 0.55em;
        }

        .cell {
            width: 14vw;
        }

        .table-course {
            width: 13vw;
            font-size: smaller;
        }

        .time-cell {
            width: 7vw;
        }
    }
</style>