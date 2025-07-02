<script lang="ts">
    import { Code, FileCode, ForkKnife, GitPullRequestArrow, Globe, Scroll, Star, Tag } from "lucide-svelte";

    let { repo } = $props();

    export function randomColor() {
        const colors = [
            "text-ctp-pink",
            "text-ctp-mauve",
            "text-ctp-red",
            "text-ctp-peach",
            "text-ctp-yellow",
            "text-ctp-green",
            "text-ctp-blue",
        ];

        return colors[Math.floor(Math.random() * colors.length)];
    }
</script>

<div class="flex flex-col border border-ctp-surface0 rounded-lg hover:border-ctp-blue bg-ctp-mantle">
    <div class="flex flex-col py-2 px-4 h-full">
        <div class="flex">
            <h3 class="text-2xl font-bold">{repo.name}</h3>

            <p class="ml-auto flex">
                {repo.stargazers_count} <Star class="ml-2 mt-[0.3rem] text-ctp-yellow" size={20} />
            </p>
        </div>
        <p class="text-lg mb-auto">{repo.description || "No Description"}</p>

        <div class="flex flex-col mt-4">
            <div class="flex text-base">
                <FileCode class="my-auto mr-2" size={16} />
                <a href={repo.html_url} target="_blank" class="text-ctp-blue hover:underline">
                    View on GitHub
                </a>
            </div>

            <div class="flex text-base">
                {#if repo.homepage}
                    <Globe class="my-auto mr-2" size={16} />
                    <a href={repo.homepage} target="_blank" class="text-ctp-blue hover:underline">
                        {repo.homepage}
                    </a>
                {/if}
            </div>

            {#if repo.topics.length > 0}
                <div class="flex">
                    <Tag class="my-auto mr-2" size={16} />
                    <div class="flex flex-wrap gap-2">
                        {#each repo.topics as topic}
                            <span class={`bg-ctp-surface0 rounded-sm text-sm px-1.5 ${randomColor()}`}>
                                {topic}
                            </span>
                        {/each}
                    </div>
                </div>
            {/if}

            <div class="flex flex-wrap gap-2 mt-1 text-sm">
                {#if repo.language}
                    <Code class="my-auto" size={16} />

                    <span>
                        {repo.language}
                    </span>

                    <p class="mx-1 text-ctp-surface2">|</p>
                {/if}


                {#if repo.license && repo.license.spdx_id}
                    <Scroll class="my-auto" size={16} />
                    <span>
                        {repo.license.spdx_id}
                    </span>

                    <p class="mx-1 text-ctp-surface2">|</p>
                {/if}

                <ForkKnife class="my-auto" size={16} />
                <span>
                    {repo.forks_count} Forks
                </span>

                <p class="mx-1 text-ctp-surface2">|</p>

                <GitPullRequestArrow class="my-auto" size={16} />
                <span>
                    {repo.open_issues_count} Issues/PRs
                </span>
            </div>
        </div>
    </div>
</div>