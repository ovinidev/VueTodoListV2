<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-4 text-white"
  >
    <div class="mx-auto max-w-2xl text-center">
      <h1
        class="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl md:text-4xl lg:text-5xl"
      >
        Welcome to Task Admin
      </h1>
      <p
        class="mb-6 text-base leading-relaxed text-gray-300 sm:mb-8 sm:text-lg md:text-xl"
      >
        Organize your tasks efficiently with our simple todo list application.
      </p>

      <div class="space-y-4">
        <router-link
          to="/todo"
          class="inline-block rounded-lg bg-purple-600 px-4 py-2 text-sm font-bold text-white transition-colors duration-200 hover:bg-purple-700 sm:px-6 sm:py-3 sm:text-base"
        >
          Let's go
        </router-link>

        <div class="text-xs text-gray-400 sm:text-sm">
          Start managing your tasks today!
        </div>
      </div>
    </div>
  </div>
</template>
