<script lang="ts">
    import { browser } from "$app/environment";

    let path: string = "";

    if (browser) {
        path = window.location.pathname;
    }
</script>

<div class="md:ml-auto mt-[-24px] md:mt-8 flex justify-center md:justify-end">
    <a href="/" class={path == "/" ? "underline" : ""}>home</a>
    <p class="mx-4 text-ctp-surface2">\</p>
    <a href="/projects" class={path == "/projects" ? "underline" : ""}>projects</a>
    <p class="mx-4 text-ctp-surface2">\</p>
    <a href="https://blog.cyteon.dev?utm_source=cyteon.dev&utm_medium=navlink" target="_blank">
        blog
    </a>
</div>