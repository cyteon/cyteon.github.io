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
                            {#if discordData.activities[0].assets?.large_image}
                                <img
                                    class="rounded-md size-18"
                                    src={`https://cdn.discordapp.com/app-assets/${discordData.activities[0].application_id}/${discordData.activities[0].assets.large_image}.png`}
                                    alt="activity_large"
                                />
                            {:else}
                                <img
                                    class="absolute bottom-[-6px] right-[-6px] size-8 rounded-full border-2 border-ctp-mantle"
                                    src="data:image/png;base64,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"
                                    alt="activity_large"
                                />
                            {/if}

                            {#if discordData.activities[0].assets?.small_image}
                                <img
                                    class="size-18"
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
