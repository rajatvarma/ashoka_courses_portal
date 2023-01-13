<script lang="ts">
    import { days, scheduleList, type CourseObject } from "./things";

    function getTime(course: CourseObject, day: string) {
        const timeString = course.timings.find(item => days[item.day] == day)
        if (timeString) {
            const newTime = timeString.start - 800
            const hours = Math.floor(newTime/100)
            const normalizedMinutes = Number(((newTime % 100) / 60).toFixed(2))
            return (Number(hours+normalizedMinutes)*6+13.75)
        }
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
                <div class="table-course" style="top: {getTime(course, day)}vh">
                    <p style="margin: 5px;">{course.code[0]}</p>
                    <p style="margin: 5px;">{course.title}</p>
                </div>
            {/if}
        {/each}
        {#each Array.from(Array(14)) as _, i}
            <div class="cell">
                <div class="line" style="background-color: black;"></div>
                {#each Array.from(Array(5)) as line}
                    <div class="line"></div>
                {/each}
                <div class="line" style="background-color: #0000"></div>
            </div> 
        {/each}
    </div>
    {/each}
    <div class="meal-timing" style="top: 13.5vh;height: 15.5vh;">Breakfast</div>
    <div class="meal-timing" style="top: 39.15vh;height: 13.5vh;">Lunch</div>
    <div class="meal-timing" style="top: 66vh;height: 9vh;">Snacks</div>
    <div class="meal-timing" style="top: 82.75vh;height: 15vh;">Dinner</div>
</div>

<style>
    #table {
        display: flex;
        flex-direction: row;
        padding: 1vh 1vw;
        background-color: #ccc;
        color: #111;
        /* box-shadow: 0px 5px 20px #1119; */
    }
    
    .cell {
        height: 6vh;
        width: 8.5vw;
        border-right: 0.1vw solid #999;
        justify-content: space-between;
        display: flex;
        flex-direction: column;
    }

    .meal-timing {
        background-color: #0F82;
        justify-content: center;
        color: #1119;
        align-items: center;
        position: absolute;
        display: flex;
        margin-left: 4vw;
        width: 51.5%;
        font-size: small;
    }

    .time-cell {
        width: 4vw;
        justify-content: flex-start
    }

    .table-course p:last-child {
        font-size:0.5rem;
    }

    .table-course {
        position: absolute;
        background-color: #0d3862;
        color: wheat;
        font-family: monospace;
        width: 8vw;
        margin: 0;
        word-wrap: break-word;
        height: 9.25vh;
        z-index: 1;
    }

    .table-day {
        display: flex;
        flex-direction: column;
    }

    .time-text {
        margin: 0;
        margin-right: 1vw;
        text-align: right;
        font-size: 0.75em;
        font-weight: 600;
    }
    
    .day-text {
        font-size: 0.8rem;
        font-weight: 600;
        text-align: center;
    }
    
    .line {
        width: '100%';
        height: 0.1vh;
        background-color: #0005;
    }
    
    @media (max-width: 450px) {
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

        .table-course p:last-child {
            font-size: 0.37rem;
        }
        
        .time-cell {
            width: 7vw;
        }

        .meal-timing {
            left: 7vw;
            /* margin-left: 104vw; */
            width: 85vw;
        }
    }
</style>