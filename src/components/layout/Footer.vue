<template>
    <footer class="bg-brand-primary backdrop-blur border-t border-red-500">
        <div class="mx-auto max-w-6xl px-4 py-4 text-sm text-white text-center">
            Copyright &copy; {{ year }} A Job Thing -- Demo. All rights reserved.
        </div>
    </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>