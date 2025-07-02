<script lang="ts">
    import Links from "$lib/components/Links.svelte";
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import RepoCard from "$lib/components/RepoCard.svelte";
    import { featuredProjects } from "$lib/projects";
    import { Code, Star } from "lucide-svelte";
    import { onMount } from "svelte";

    let repos: any | null = $state(null);
    let sortingMode: string = $state("stars");

    $effect(() => {
        if (repos) {
            switch (sortingMode) {
                case "stars":
                    repos = repos.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count);
                    break;
                case "forks":
                    repos = repos.sort((a: any, b: any) => b.forks_count - a.forks_count);
                    break;
                case "issues_prs":
                    repos = repos.sort((a: any, b: any) => b.open_issues_count - a.open_issues_count);
                    break;
                case "updated":
                    repos = repos.sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
                    break;
                case "alphabetical":
                    repos = repos.sort((a: any, b: any) => a.name.localeCompare(b.name));
                    break;
                case "oldest":
                    repos = repos.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
                    break;
                case "newest":
                    repos = repos.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                    break;
            }
        }
    })

    onMount(async () => {
        try {
            const response = await fetch("https://api.github.com/users/cyteon/repos?per_page=100");

            if (!response.ok) {
                throw new Error("Failed to fetch GitHub repositories");
            }

            repos = await response.json();
        } catch (error) {
            console.error("Error fetching GitHub repositories:", error);
        }
    })
</script>

<div class="px-2 md:w-3/5 mx-auto text-lg font-mono h-screen flex flex-col">
    <div class="flex w-full flex-col md:flex-row">
        <h1 class="text-transparent text-[5rem] leading-relaxed bg-gradient-to-r from-ctp-blue to-ctp-yellow bg-clip-text font-bold inline-block text-center">
            Projects
        </h1>

        <Links />
    </div>

    <h2 class="mt-8 flex text-3xl"><Star class="my-auto mr-2 text-ctp-yellow" size={24} /> Featured Projects</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {#each featuredProjects as project}
            <ProjectCard {project} />
        {/each}
    </div>

    <div class="flex my-8 text-3xl">
        <h2 class="flex"><Code class="my-auto mr-2 text-ctp-yellow" size={24} /> Repositories</h2>

        <select bind:value={sortingMode} class="ml-auto bg-ctp-mantle text-ctp-text0 rounded-md text-base px-2">
            <option value="stars">Sort by Stars</option>
            <option value="forks">Sort by Forks</option>
            <option value="issues_prs">Sort by Issues/PRs</option>
            <option value="updated">Sort by Last Updated</option>
            <option value="alphabetical">Sort Alphabetically</option>
            <option value="oldest">Sort by Oldest</option>
            <option value="newest">Sort by Newest</option>
        </select>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {#each repos as repo}
            <RepoCard {repo} />
        {/each}
    </div>

    <footer class="mt-auto pb-4 text-sm text-ctp-subtext0">
        All Rights Reserved &copy; {new Date().getFullYear()} Cyteon
    </footer>
</div>