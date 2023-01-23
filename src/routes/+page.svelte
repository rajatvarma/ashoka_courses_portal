<script lang="ts">
    import unfliteredCourses from '../courses.json'
    import CourseCard from './CourseCard.svelte'
    import { AngleDownSolid, AngleUpSolid, CalendarDaySolid, ClockRegular, DownloadSolid, ListSolid, TriangleExclamationSolid } from "svelte-awesome-icons";
    import html2canvas from 'html2canvas';
    import CalendarView from './CalendarView.svelte';
    import { scheduleList, type CourseObject } from './things';
    
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
                console.log(calendar)
                download(canvas.toDataURL(), 'timetable.png')
                isSsDownloading = false
            });
        }
    }
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500;600;700&family=Rubik:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.7/dist/html2canvas.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap" rel="stylesheet">
    <title>Pre-Registration Helper</title>
</svelte:head>
<svelte:window bind:innerHeight={innerHeight} bind:innerWidth={innerWidth} />


<div class="modal">
    <div class="modal-box">
        Experimental: This is a cool little feature that fetches your time-table from AMS and puts it in here so that you can download it as a neat little image.
        This feature serves no purpose other than to display technical prowess hehehehehe. You will have to follow some tricky steps, but it should not be very difficult.
        <ol>
            <li>Open a new tab in your browser.</li>
            <li>Press Ctrl+Shift+I</li>
            <li>Now open AMS in the same tab, and make sure you're logged in.</li>
            <li>Now, in the developer tools thing that shows up on the side, go to the "Network" tab, and set the filter to "Fetch/XHR"</li>
            <li>Click on any entry called "GetListData", and scroll down to Request Headers</li>
            <li>Right click on "Cookie", and click on copy value</li>
            <li>Paste in that value below, and click on submit</li>
        </ol>
        Enter the cookie value: <input type="text" name="cookie" id="amsCookieInput" bind:value={cookieValue}>
        <button>Submit</button>
    </div>
</div>
<div class="window">
    <div class="wrapper">
        <div style="padding: 5%;">
            <div style="display: flex;justify-content:space-between">
                <button class="alert-button" on:click={() => {isAlertsShown = !isAlertsShown}}>
                    <TriangleExclamationSolid size='16' color="#000"/>
                    <div style="width: 10px;"></div>
                    {#if isAlertsShown}
                        <AngleUpSolid size='16' />
                    {:else}
                        <AngleDownSolid size='16' />
                    {/if}
                </button>
                <!-- <button on:click={() => {
                        const amsWindow = window.open('https://www.google.com', 'amsWindow');
                        if (amsWindow) {
                            console.log('window opened')
                            setTimeout(() => {console.log(amsWindow.document.getElementsByTagName('button'))}, 500)
                            console.log('window loaded')
                        }
                    }
                }>Fetch timetable from AMS</button> -->
            </div>
            <p class="alert-text" style:display={isAlertsShown ? 'block' : 'none'}>Please note that DSes do not show their correct timings. You can see their timings in their respective cards, to help you plan your semester better. Some courses may not display correctly (apologies), and some courses may be missing, which is being worked on.</p>
            <p class="alert-text" style:display={isAlertsShown ? 'block' : 'none'}>PLEASE WATCH OUT FOR COURSES THAT TAKE UP TWO SLOTS. Again, due to processing limitations, only the starting slot of the course will be visible. For example, if a course is from 8:30 to 10:00 and 10:10 to 11:40, only the 8:30 to 10:10 slot will show up here. Please keep that in mind.</p>
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
    <div id="calendar" style="display:{isCalendarShown ? 'flex' : 'none'};">
        <button id="download-button" style="border:none;" on:click={() => saveAsImage()}>
            {#if !isSsDownloading}
                <DownloadSolid size='16' />     
                {:else}
                <ClockRegular size='16' />
            {/if}
            <div style="width: 10px;"></div>
            {!isSsDownloading ? 'Download timetable snapshot' : 'Downloading...'}
        </button>
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

    .alert-text {
        font-size: 0.85em; 
        text-align:justify;
        font-weight:500;
        color:#ccc
    }

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

    .alert-button {
        background-color: #f4af03;
        border: none;
        padding: 5px 20px;
        border-radius: 5px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

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

    .fab {
        display: none;
    }

    #download-button {
        background-color: #ccc;
        border-radius: 5px;
        display: flex;
        align-items: center;
        padding: 5px 10px;
        font-family: 'Inconsolata';
        font-weight: 900;
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
    }
</style>    