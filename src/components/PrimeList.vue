<!-- src/components/PrimeList.vue -->
<template>
  <div class="prime-container">
    <div class="action-bar">
      <button @click="handleAdd" :disabled="loading" class="btn btn-add">
        ➕ 增加最小素数
      </button>
      <button @click="handleDelete" :disabled="loading" class="btn btn-delete">
        🗑️ 删除最大素数
      </button>
      <span v-if="operationMessage" class="operation-msg">{{ operationMessage }}</span>
    </div>
    <div v-if="loading" class="loading">⏳ 加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <ul v-else class="prime-list">
      <li v-for="item in primes" :key="item.id">
        {{ item.prime }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { CdsItem } from '@/types';
import { getCdsList, addPrime, deleteLargestPrime } from '@/services/api';

const primes = ref<CdsItem[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const operationMessage = ref<string | null>(null);

const fetchPrimes = async () => {
  try {
    const data = await getCdsList();
    primes.value = data;
  } catch (err) {
    error.value = '获取数据失败，请检查后端服务是否运行。';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const handleAdd = async () => {
  loading.value = true;
  operationMessage.value = null;
  try {
    const result = await addPrime();
    operationMessage.value = result.message;
    await fetchPrimes();
  } catch (err: any) {
    const msg = err.response?.data?.error || '增加失败，请重试。';
    operationMessage.value = msg;
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const handleDelete = async () => {
  loading.value = true;
  operationMessage.value = null;
  try {
    const result = await deleteLargestPrime();
    operationMessage.value = result.message;
    await fetchPrimes();
  } catch (err: any) {
    const msg = err.response?.data?.error || '删除失败，请重试。';
    operationMessage.value = msg;
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPrimes();
});
</script>

<style scoped>
</style>