<script lang="ts">
    import { days, scheduleList, type CourseObject, currentScheduleIndex } from "./things";

    function getTime(course: CourseObject, day: string, timing: string) {
        const timeString = timing
        console.log(timing)
        if (timeString) {
            const start = timeString.split('–')[0]
            console.log(start)
            // const end = timeString.split('–')[1]
            const baseAmount = 16.85
            const hoursOffset = (parseInt(start.split(':')[0]) - 8) * 6
            const minutesOffset = parseInt(start.split(':')[1]) / 10
            console.log(hoursOffset + minutesOffset)
            return `${baseAmount + hoursOffset + minutesOffset - (0.05 * (hoursOffset + minutesOffset))}vh`
        } else {
            return '0vh'
        }
    }

    // let showTooltip = false
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
        {#each $scheduleList[$currentScheduleIndex] as course}
            {#each course.WeekDays.split(', ') as courseDay}
                {#if day == courseDay && course.TimeSlot.split(', ').length == 1}
                    {#each course.TimeSlot.split(', ') as timing}
                    <div class="table-course" style="top: {getTime(course, day, timing)};">
                         <p>{course.LSCode.split('/ ')[0]}</p>
                         <p>{course.SpaceName}</p>
                    </div>
                    {/each}
                {/if}
                {#if day == courseDay && course.TimeSlot.split(', ').length > 1 && course.WeekDays.split(', ').length > 1}
                    <div class="table-course" style="top: {
                        getTime(
                            course, 
                            day, 
                            course.TimeSlot.split(', ')[course.WeekDays.split(', ').indexOf(courseDay)]
                    )};">
                         <p>{course.LSCode.split('/ ')[0]}</p>
                         <p>{course.SpaceName}</p>
                         <!-- <p>{course.WeekDays.split(', ').toString()}</p> -->
                    </div>
                {/if}
                {#if day == courseDay && course.TimeSlot.split(', ').length > 1 && course.WeekDays.split(', ').length == 1}
                    {#each course.TimeSlot.split(', ') as timing}
                    <div class="table-course" style="top: {getTime(course, day, timing)};">
                         <p>{course.LSCode.split('/ ')[0]}</p>
                         <p>{course.SpaceName}</p>
                    </div>
                    {/each}
                {/if}
            {/each}
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
    <div class="meal-timing" style="top: 17vh;height: 14.25vh;">Breakfast</div>
    <div class="meal-timing" style="top: 41.25vh;height: 12.75vh;">Lunch</div>
    <div class="meal-timing" style="top: 66.65vh;height: 8.5vh;">Snacks</div>
    <div class="meal-timing" style="top: 82.25vh;height: 14.5vh;">Dinner</div>
</div>

<style>
    #table {
        display: flex;
        flex-direction: row;
        height: 85vh;
        padding: 1vh 1vw;
        background-color: #FFF;
        color: #111;
        /* box-shadow: 0px 5px 20px #1119; */
    }
    
    .cell {
        height: 6vh;
        width: 8.5vw;
        border-right: 0.1vw solid #999;
        font-family: 'Azeret Mono', monospace;
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
        width: 51.3%;
        font-size: small;
    }

    .time-cell {
        width: 4vw;
        justify-content: flex-start
    }

    .table-course p {
        text-align: center;
        font-size: 0.7rem;
    }

    .table-course {
        position: absolute;
        background-color: #0d3862;
        color: wheat;
        font-family: monospace;
        width: 8vw;
        margin: 0;
        word-wrap: break-word;
        height: 8.5vh;
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
        height: 0.05vh;
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