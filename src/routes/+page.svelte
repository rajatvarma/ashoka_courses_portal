<script lang="ts">
    import unfilteredCourses from '../courses_s24.json'
    import CourseCard from './CourseCard.svelte'
    import { AngleDownSolid, AngleUpSolid, CalendarDaySolid, ClockRegular, DownloadSolid, ListSolid, TriangleExclamationSolid } from "svelte-awesome-icons";
    import html2canvas from 'html2canvas';
    import CalendarView from './CalendarView.svelte';
    import { scheduleList, type CourseObject, currentScheduleIndex, days } from './things';
	import { each } from 'svelte/internal';
    
    let filterOutDS = true;
    let showSelected = false;
    let searchString = '';
    let isSsDownloading = false;
    let innerHeight = 0
    let innerWidth = 0
    let isCalendarShown = true
    let isAlertsShown = true
    let isModalShown = false
    let cookieValue = ''

    console.log($currentScheduleIndex)
    
    const courses = unfilteredCourses.map<CourseObject>(course => {
        console.log(`Course ${course.courseCode} class details len: ${course.classDetails.length}`);
        const classes = course.classDetails[0].split(' ) ');
        console.log(`${classes.length} =?= ${course.classCounts}: ${classes.length == course.classCounts}`);
        
        const timings: CourseObject["timings"] = [];

        for (let i = 0; i < classes.length; i++) {
            if (classes[i].trim() == '') continue;
            const [datetime, loc] = classes[i].split('(').map(str => str.trim());

            const [dayName, start, end] = datetime.split('-').map(str => str.trim());
            const day = days.indexOf(dayName);
            const room = loc.endsWith(')') ? loc.slice(0, -1).trim() : loc.trim();
            
            timings.push({
                day,
                start,
                end,
                room
            });
        }

        return {
            ...course,
            timings
        }
    });
    function download(uri: any, filename: string){
            var link = document.createElement('a');

            if (typeof link.download === 'string') {
                link.href = uri;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

            } else {
                window.open(uri);
            }
        }

    function saveAsImage(){
        isSsDownloading = true
        const calendar = document.getElementById('table')
        if (calendar) {
            html2canvas(calendar).then(canvas => {
                // console.log(calendar)
                download(canvas.toDataURL(), 'timetable.png')
                isSsDownloading = false
            });
        }
    }
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-00B9ZXYL94"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-00B9ZXYL94');
    </script>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500;600;700&family=Rubik:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.7/dist/html2canvas.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap" rel="stylesheet">
    <title>Pre-Registration Helper</title>
</svelte:head>
<svelte:window bind:innerHeight={innerHeight} bind:innerWidth={innerWidth} />


<div class="window">
    <div class="wrapper">
        <div style="padding: 5%; font-family: Rubik">
            <p style={"background-color: #f4af03; padding: 10px; border-radius: 5px; font-weight: 500; font-size: 0.8rem"}>Preview multiple timetables ➡️<br><br>If the course checkbox is checked even if the course is not part of that particular timetable, check and uncheck "Show only selected courses", it should fix it.</p>
            <h2 id="heading">Search for courses by course code/title</h2>
            <input type="text" bind:value={searchString} id="search-bar" />
            <!-- Filter Out DSes? -->
            <!-- <input type="checkbox" bind:checked={filterOutDS} id=""> -->
            <br>
            Show only selected courses? 
            <input type="checkbox" on:click={() => searchString = ''} bind:checked={showSelected} id="">
            ({$scheduleList[$currentScheduleIndex].length} course{$scheduleList[$currentScheduleIndex].length != 1 ? 's' : ''} selected)
        </div>
        <div class="container">
        {#if showSelected}
            {#each $scheduleList[$currentScheduleIndex] as selectedCourse}
                {#if (selectedCourse.courseCode.toLowerCase().includes(searchString.toLowerCase()) || selectedCourse.courseTitle?.toLowerCase().includes(searchString.toLowerCase()))}
                    <CourseCard course={selectedCourse} /> 
                {/if}
            {/each}
        {:else}
            {#each courses as course}
                {#if (course.courseCode.toLowerCase().includes(searchString.toLowerCase()) || course.courseTitle?.toLowerCase().includes(searchString.toLowerCase()))}
                    <CourseCard course={course} /> 
                {/if}
            {/each}
        {/if}
        </div>
    </div>
    <div id="calendar" style="display:{isCalendarShown ? 'flex' : 'none'};">
        <div class="calendar-bar">
            {#each [0,1,2,3,4] as timetableIndex}
                <div
                    class="timetable-button"
                    on:click={() => {$currentScheduleIndex = timetableIndex}} 
                    on:keypress={() => {$currentScheduleIndex = timetableIndex}}
                    style={`background-color: ${$currentScheduleIndex == timetableIndex ? 'red' : 'white'}`}>
                    <p>{timetableIndex + 1}</p>
                </div>
            {/each }
            <button id="download-button" style="border:none;" on:click={() => saveAsImage()}>
                {#if !isSsDownloading}
                <DownloadSolid size='16' />     
                {:else}
                <ClockRegular size='16' />
                {/if}
                <div style="width: 10px;"></div>
                {!isSsDownloading ? 'Download timetable snapshot' : 'Downloading...'}
            </button>
        </div>
        <CalendarView/>
    </div>

    <button class="fab" on:click={() => isCalendarShown = !isCalendarShown}>
        {#if isCalendarShown}
            <ListSolid size='16' color='white' />
        {:else}
            <CalendarDaySolid size='16' color='white' />
        {/if} 
    </button>

</div>  

<style>

    :global(body) {
        background-color: #1b1b1b;
        margin: 0;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track {
        background-color: #ccc;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #1b1b1b;
        box-shadow: #ccc 10px 10px 20px;
    }

    .window {
        display: flex;
        font-family: 'Inconsolata';
        margin: 0;
    }

    /* .alert-text {
        font-size: 0.85em; 
        text-align:justify;
        font-weight:500;
        color:#ccc
    } */

    .modal {
        position: absolute;
        height: 100vh;
        width: 100vw;
        background-color: #1b1b1b55;
        display: flex;
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 10;
    }

    .modal-box {
        background-color: #ccc;
        width: 50vw;
        padding: 5vh 10vw;
    }

    /* .alert-button {
        background-color: #f4af03;
        border: none;
        padding: 5px 20px;
        border-radius: 5px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    } */

    .wrapper {
        max-width: 40vw;
        overflow-x: hidden;
        background-color: #c4122f;
        height: 100vh;
        overflow-y: scroll;

    }

    #calendar {
        flex-direction: column;
        width: 60vw;
        height: 100vh;
        background-color: #1b1b1b;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    .calendar-bar {
        display: flex; 
        flex-direction: row; 
        justify-content: space-between; 
        width: 50vw; 
        height: 5vh; 
        padding: 0 5vw;
        /* background-color: red */
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
        margin-bottom: 5%;
    }

    .fab {
        display: none;
    }

    #download-button {
        background-color: #ccc;
        border-radius: 5px;
        display: flex;
        align-items: center;
        padding: 5px 10px;
        width: 15vw;
    }

    .timetable-button {
        background-color: #ccc;
        border-radius: 5px;
        display: flex;
        align-items: center;
        padding: 5px 10px;
        width: 5vw;
        justify-content: center;
        /* font-weight: 900; */
    }

    .timetable-button p {
        font-size: 1rem;
        font-weight: 900;
        display: flex;
        text-align: center;
    }

    @media (max-width: 450px) {
        .wrapper {
            max-width: 100vw;
        }

        #calendar {
            min-width: 100vw;
        }

        .fab {
            display: block;
            position: absolute;
            bottom: 1vh;
            right: 2vw;
            background-color: #1b1b1b;
            border: none;
            padding: 15px;
            border-radius: 100%;
        }

        .calendar-bar {
            max-width: 100vw;
            overflow: hidden;
        }
    }
</style>    