<script lang="ts">
    import Links from "$lib/components/Links.svelte";
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import { featuredProjects } from "$lib/projects";
    import { Github, Joystick, Star } from "lucide-svelte";
    import { onMount } from "svelte";

    // too lazy to set type rn
    let discordData: any | null = null;
    let githubData: any | null = null;

    let totalStars: number | null = null;

    onMount(async () => {
        try {
            const response = await fetch("https://api.lanyard.rest/v1/users/871722786006138960");

            if (!response.ok) {
                throw new Error("Failed to fetch Discord status");
            }

            discordData = (await response.json()).data;
        } catch (error) {
            console.error("Error fetching Discord status:", error);
        }

        try {
            const response = await fetch("https://api.github.com/users/cyteon");

            if (!response.ok) {
                throw new Error("Failed to fetch GitHub data");
            }

            githubData = await response.json();
        } catch (error) {
            console.error("Error fetching GitHub data:", error);
        }

        try {
            const response = await fetch("https://api.github.com/users/cyteon/repos?per_page=100");

            if (!response.ok) {
                throw new Error("Failed to fetch GitHub repositories");
            }

            const repos = await response.json();
            totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
        } catch (error) {
            console.error("Error fetching GitHub repositories:", error);
        }
    })

    function elapsedTime(timestamp: number): string {
        const now = Date.now();
        const diff = (now - timestamp) / 1000;

        const hoursDiff = Math.floor(diff / 3600);
        const minutesDiff = Math.floor((diff % 3600) / 60);
        const secondsDiff = Math.floor(diff % 60);

        let string = "";
        
        if (hoursDiff > 0) {
            string += `${hoursDiff.toString().padStart(2, '0')}h:`;
        }

        if (minutesDiff > 0 || hoursDiff > 0) {
            string += `${minutesDiff.toString().padStart(2, '0')}m:`;
        }

        return string + `${secondsDiff.toString().padStart(2, '0')}s`;
    }

    // bad trick to make the elapsed time go up
    setInterval(() => {
        if (discordData && discordData.activities.length > 0) {
            discordData.activities[0].timestamps.start = Date.now() - (Date.now() - discordData.activities[0].timestamps.start);
        }
    }, 1000);

    // update discord data (incase activity changes for example)
    setInterval(async () => {
        try {
            const response = await fetch("https://api.lanyard.rest/v1/users/871722786006138960");

            if (!response.ok) {
                throw new Error("Failed to fetch Discord status");
            }

            discordData = (await response.json()).data;
        } catch (error) {
            console.error("Error fetching Discord status:", error);
        }
    }, 1000 * 60 * 5); // 5 mins
</script>

<div class="px-2 md:w-3/4 xl:w-3/5 mx-auto text-xl h-screen flex flex-col">
    <div class="flex w-full flex-col md:flex-row">
        <h1 class="text-transparent text-[5.2rem] leading-relaxed bg-gradient-to-r from-ctp-blue to-ctp-yellow bg-clip-text font-bold inline-block text-center">
            Cyteon
        </h1>

        <Links />
    </div>

    <div class="flex flex-col md:flex-row gap-8">
        <div>
            <p class="text-center md:text-left mt-8 md:mt-0">
                I'm Cyteon, a developer from Norway! I am interested in fields like web development, software development, and game development.
            </p>

            <p class="text-center md:text-left mt-4">
                I have currently accumulated <span class="text-ctp-yellow font-bold">{totalStars || "?"}</span> stars and <span class="text-ctp-yellow font-bold">{githubData?.followers || "?"}</span> followers on GitHub.
            </p>

            <div class="mt-6 text-[0.9em] flex justify-center md:justify-start">
                <a href="https://github.com/cyteon" class="flex" target="_blank" rel="noopener noreferrer"><Github class="my-auto mr-2" size={18} /> Github</a>
                <p class="mx-4 text-ctp-surface2">\</p>
                <a href="https://cyteon.itch.io" class="flex" target="_blank" rel="noopener noreferrer"><Joystick class="my-auto mr-2" size={18} /> Itch.io</a>
            </div>
        </div>

        {#if discordData}
            <div class="w-full flex flex-col border border-ctp-surface0 border-dashed p-2 rounded-md bg-ctp-mantle text-lg w-full h-fit mt-1">
                <div class="flex px-2">
                    <h2>Discord</h2>
                    <div class="ml-auto flex">
                        {#if discordData.discord_status == "online"}
                            <p>Online</p> <span class="bg-ctp-green size-4 my-auto ml-2 rounded-full"></span>
                        {:else if discordData.discord_status == "idle"}
                            <p>Idle</p> <span class="bg-ctp-yellow size-4 my-auto ml-2 rounded-full"></span>
                        {:else if discordData.discord_status == "dnd"}
                            <p>Do not Disturb</p> <span class="bg-ctp-red size-4 my-auto ml-2 rounded-full"></span>
                        {:else}
                            <p>Offline</p> <span class="bg-ctp-surface2 size-4 my-auto ml-2 rounded-full"></span>
                        {/if}
                    </div>
                </div>
                <hr class="my-1 border-ctp-surface0" />
                <div class="flex h-fit">
                    {#if discordData.activities.length > 0}
                        <div class="my-auto ml-2 mr-4 relative">
                            <img
                                class="rounded-md size-18"
                                src={`https://cdn.discordapp.com/app-assets/${discordData.activities[0].application_id}/${discordData.activities[0].assets.large_image}.png`}
                                alt="activity_big"
                            />

                            {#if discordData.activities[0].assets.small_image}
                                <img
                                    class="absolute bottom-[-6px] right-[-6px] size-8 rounded-full border-2 border-ctp-mantle"
                                    src={`https://cdn.discordapp.com/app-assets/${discordData.activities[0].application_id}/${discordData.activities[0].assets.small_image}.png`}
                                    alt="activity_small"
                                />
                            {/if}
                        </div>

                        <div class="flex flex-col text-base my-auto">
                            <p class="font-bold text-">{discordData.activities[0].name}</p>
                            <p class="text-ctp-subtext0">
                                {discordData.activities[0].state || "No state available"}
                            </p>
                            <p class="text-ctp-subtext0">
                                {discordData.activities[0].details || "No details available"}
                            </p>
                            <p class="text-ctp-subtext0">
                                {elapsedTime(discordData.activities[0].timestamps.start)} elapsed
                            </p>
                        </div> 
                    {:else}
                        <p class="italic text-ctp-subtext0 m-auto">No current activity</p>
                    {/if}
                </div>
            </div>
        {/if}
    </div>

    <h2 class="my-8 flex text-3xl"><Star class="my-auto mr-2 text-ctp-yellow" size={24} /> Featured Projects</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {#each featuredProjects as project}
            <ProjectCard {project} />
        {/each}
    </div>

    <footer class="mt-auto pb-4 text-sm text-ctp-subtext0">
        All Rights Reserved &copy; {new Date().getFullYear()} Cyteon
    </footer>
</div>