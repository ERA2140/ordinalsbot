<script lang="ts" setup>
import Wallet from "../components/Wallet.vue";
</script>

<template>
  <main class="flex flex-col gap-3">
    <Wallet provider="unisat"></Wallet>
    <Wallet provider="xverse"></Wallet>
    <Wallet provider="magic-eden"></Wallet>
  </main>
</template>
