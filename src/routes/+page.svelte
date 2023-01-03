<script lang="ts">
    import unfliteredCourses from '../courses.json'
    import CourseCard from './CourseCard.svelte'

    import type { CourseObject } from './things';
    import CalendarView from './CalendarView.svelte';
    let filterOutDS = true;
    let showSelected = false;
    import { scheduleList } from './things';
    let searchString = '';

    function compare(a:CourseObject, b:CourseObject) {
        if ( a.code[0] < b.code[0] ){
            return -1;
        }
        if ( a.code[0] > b.code[0] ){
            return 1;
        }
        return 0;
    }

    let courses = unfliteredCourses.sort(compare)

</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500;600;700&family=Rubik:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>


<div class="window">
    <div class="wrapper">
        <div style="padding: 5%;">
            <p style="font-size: 0.85em; text-align:justify;font-weight:500;color:#ccc">Please note that because of things I dont wanna deal with, the DSes do not show their correct timings. You can see their timings in their respective cards, to help you plan your semester better. Some courses may not display correctly (apologies), and the display of the time-table may not be very precise. </p>
            <br>
            <p style="font-size: 0.85em; text-align:justify;font-weight:500;color:#ccc">PLEASE WATCH OUT FOR COURSES THAT TAKE UP TWO SLOTS. Again, due to processing limitations, only the starting slot of the course will be visible. For example, if a course is from 8:30 to 10:00 and 10:10 to 11:40, only the 8:30 to 10:10 slot will show up here. Please keep that in mind.</p>
            <h2 id="heading">Search for courses by course code/title</h2>
            <input type="text" bind:value={searchString} id="search-bar" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Filter Out DSes?
            <input type="checkbox" bind:checked={filterOutDS} id="">
            <br>
            Show only selected courses? 
            <input type="checkbox" bind:checked={showSelected} id="">
            ({$scheduleList.length} course{$scheduleList.length != 1 ? 's' : ''} selected)
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

    :global(body) {
        background-color: #1b1b1b;
        margin: 0;
    }

    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track {
        background-color: #ccc;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #1b1b1b;
    }

    .window {
        display: flex;
        font-family: 'Inconsolata';
        margin: 0;
        margin: 2.5vh;
    }

    .wrapper {
        max-width: 40vw;
        overflow-x: hidden;
        background-color: #c4122f;
        height: 95vh;
        overflow-y: scroll;

    }

    .container {
        background-color: #0d3862;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    #search-bar {
        border: #1b1b1b 0.5px solid;
        padding: 1%;
        margin-top: 5%;
        margin-bottom: 5%;
    }
</style>    