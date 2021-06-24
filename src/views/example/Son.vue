<template>
  <div class="test-container">{{ name }}</div>
  <button @click="changeName('hongjie')">
    change name
  </button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Son',
  setup() {
    const name = ref<string>('lin')

    function changeName(newname: string) {
      name.value = newname
    }

    return { name, changeName }
  }
})
</script>
<style lang="scss" scoped></style>
