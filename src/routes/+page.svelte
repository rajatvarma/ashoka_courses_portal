<script>
    import courses from '../courses.json'
    import CourseCard from './CourseCard.svelte'
    import CalendarView from './CalendarView.svelte';
    let filterOutDS = true;
    let showSelected = false;
    import { scheduleList } from './things';
    let searchString = '';
</script>


<!-- <CourseCard></CourseCard> -->
<div class="window">
    <div class="wrapper">
        <div style="padding: 5%;">
            <h3 id="heading">Search for courses by course code/title</h3>
            <p style="font-size: 0.85em; text-align:justify">Please note that because of things I dont wanna deal with, the DSes do not show their correct timings (OAA bad). You can see their timings in their respective cards, to help you plan your semester better. Some courses may not display correctly (apologies), and the display of the time-table may not be very precise. </p>
            <input type="text" bind:value={searchString} id="search-bar" />
            Filter Out DSes?
            <input type="checkbox" bind:checked={filterOutDS} on:click={() => {console.log(filterOutDS)}} id="">
            <br>
            Show only selected courses?
            <input type="checkbox" bind:checked={showSelected} id="">
        </div>
        <div class="container">
        {#if showSelected}
            {#each $scheduleList as selectedCourse}
                {#if filterOutDS}
                    {#if (selectedCourse.code.toString().toLowerCase().includes(searchString.toLowerCase()) || selectedCourse.title?.toLowerCase().includes(searchString.toLowerCase())) && selectedCourse.code[0].split('-').length !== 4}
                        <CourseCard course={selectedCourse} />
                    {/if}
                    {:else}
                    {#if (selectedCourse.code.toString().toLowerCase().includes(searchString.toLowerCase()) || selectedCourse.title?.toLowerCase().includes(searchString.toLowerCase()))}
                        <CourseCard course={selectedCourse} /> 
                    {/if}
                {/if}
            {/each}
            {:else}
                {#each courses as course}
                    {#if filterOutDS}
                        {#if (course.code.toString().toLowerCase().includes(searchString.toLowerCase()) || course.title?.toLowerCase().includes(searchString.toLowerCase())) && course.code[0].split('-').length !== 4}
                            <CourseCard course={course} />
                        {/if}
                        {:else}
                        {#if (course.code.toString().toLowerCase().includes(searchString.toLowerCase()) || course.title?.toLowerCase().includes(searchString.toLowerCase()))}
                        <CourseCard course={course} /> 
                        {/if}
                    {/if}
                {/each}
        {/if}
        </div>
    </div>
    <CalendarView />
</div>


<style>
    .window {
        display: flex;
    }

    .wrapper {
        width: 40vw;
        background-color: #c4122f;
        height: 95vh;
        overflow-y: scroll;
    }

    .container {
        background-color: #0d3862;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    #search-bar {
        border: #1b1b1b 0.5px solid;
        padding: 1%;
        margin-top: 5%;
        margin-bottom: 5%;
    }

    #heading {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
</style>    