<script lang="ts">
  import { enhance } from "$app/forms";
  export let data; // Datos que vienen de la función 'load'
  export let form; // Datos que vienen de la función 'actions' (errores, etc)
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  <section class="md:col-span-1 bg-white p-6 rounded-lg shadow-sm border">
    <h2 class="text-xl font-bold mb-4">Registrar Licencia</h2>

    <form
      method="POST"
      action="?/create"
      use:enhance
      class="flex flex-col gap-4"
    >
      <div>
        <label class="block text-sm font-medium text-gray-700">Cliente</label>
        <input
          name="clientName"
          value={form?.values?.clientName ?? ""}
          class="w-full border p-2 rounded mt-1 {form?.errors?.clientName
            ? 'border-red-500'
            : ''}"
        />
        {#if form?.errors?.clientName}
          <p class="text-red-500 text-xs mt-1">{form.errors.clientName[0]}</p>
        {/if}
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Servicio</label>
        <input
          name="serviceName"
          value={form?.values?.serviceName ?? ""}
          class="w-full border p-2 rounded mt-1"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Plan</label>
        <select name="plan" class="w-full border p-2 rounded mt-1">
          <option value="FREE">Free</option>
          <option value="BASIC">Basic</option>
          <option value="PREMIUM">Premium</option>
          <option value="ENTERPRISE">Enterprise</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Meses de duración</label
        >
        <input
          type="number"
          name="durationMonths"
          value="12"
          class="w-full border p-2 rounded mt-1"
        />
      </div>

      <button
        type="submit"
        class="bg-indigo-600 text-white py-2 rounded font-bold hover:bg-indigo-700 transition"
      >
        Generar Licencia
      </button>
    </form>
  </section>

  <section class="md:col-span-2">
    <h2 class="text-xl font-bold mb-4">Licencias Activas</h2>
    <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="p-3 text-sm font-semibold">Cliente</th>
            <th class="p-3 text-sm font-semibold">Servicio</th>
            <th class="p-3 text-sm font-semibold">Key</th>
            <th class="p-3 text-sm font-semibold">Plan</th>
          </tr>
        </thead>
        <tbody>
          {#each data.licenses as license}
            <tr class="border-b hover:bg-gray-50">
              <td class="p-3 text-sm">{license.clientName}</td>
              <td class="p-3 text-sm">{license.serviceName}</td>
              <td class="p-3 text-sm font-mono text-indigo-600"
                >{license.licenseKey}</td
              >
              <td class="p-3 text-sm">
                <span
                  class="px-2 py-1 rounded text-xs font-bold bg-indigo-100 text-indigo-700"
                >
                  {license.plan}
                </span>
              </td>
            </tr>
          {:else}
            <tr>
              <td colspan="4" class="p-4 text-center text-gray-500"
                >No hay licencias registradas.</td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</div>
