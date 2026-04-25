<script lang="ts">
  // Aquí podrías importar un archivo CSS global o Tailwind
  export let data;
</script>

<div class="min-h-screen bg-gray-50">
  <nav class="bg-indigo-700 text-white p-4 shadow-lg">
    <div class="max-w-5xl mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold">
        H-Digital <span class="text-indigo-200">Solutions</span>
      </h1>
      <div class="space-x-4">
        <a href="/" class="hover:underline text-sm">Panel de Licencias</a>
      </div>
    </div>
  </nav>

  <main class="max-w-5xl mx-auto p-6">
    <slot />
  </main>
</div>
