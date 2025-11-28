<template>
  <div class="p-6 space-y-6">
    <!-- Guest Count Slider -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Jumlah Tamu: {{ builderStore.invitation?.guestCount }}
      </label>
      <input
        v-model.number="builderStore.invitation!.guestCount"
        type="range"
        min="10"
        max="2000"
        step="5"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
      />
      <div class="flex justify-between text-xs text-gray-500 mt-1">
        <span>10</span>
        <span>2000</span>
      </div>
    </div>

    <!-- Active Days Slider -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Durasi Aktif: {{ builderStore.invitation?.activeDays }} hari
      </label>
      <input
        v-model.number="builderStore.invitation!.activeDays"
        type="range"
        min="7"
        max="365"
        step="1"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
      />
      <div class="flex justify-between text-xs text-gray-500 mt-1">
        <span>7 hari</span>
        <span>365 hari</span>
      </div>
    </div>

    <!-- Price Breakdown -->
    <div class="bg-gray-50 p-4 rounded-lg">
      <h4 class="font-semibold mb-3">Detail Harga</h4>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span>Harga Dasar:</span>
          <span>{{ formatPrice(builderStore.basePrice) }}</span>
        </div>
        <div class="flex justify-between">
          <span>{{ builderStore.invitation?.guestCount }} tamu × {{ formatPrice(2500) }}:</span>
          <span>{{ formatPrice((builderStore.invitation?.guestCount || 0) * 2500) }}</span>
        </div>
        <div class="flex justify-between">
          <span>{{ builderStore.invitation?.activeDays }} hari × {{ formatPrice(1000) }}:</span>
          <span>{{ formatPrice((builderStore.invitation?.activeDays || 0) * 1000) }}</span>
        </div>
        <div class="border-t pt-2 flex justify-between font-semibold">
          <span>Total:</span>
          <span class="text-rose-600">{{ formatPrice(builderStore.totalPrice) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBuilderStore } from '~/stores/builder'
import { usePrice } from '~/composables/usePrice'

const builderStore = useBuilderStore()
const { formatPrice } = usePrice()
</script>