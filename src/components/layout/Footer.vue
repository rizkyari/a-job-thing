<template>
    <footer class="border-t bg-white">
        <div class="mx-auto max-w-6xl px-4 py-4 text-sm text-gray-600">
            {{ year }} A Job Thing -- Demo
        </div>
    </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>