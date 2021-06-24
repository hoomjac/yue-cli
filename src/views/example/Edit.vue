<template>
	<div style="padding: 15px">
		<h2>example edit {{ $route.params.id }}</h2>
		<a-button @click="$router.go(-1)">返回</a-button>
	</div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'ExampleEdit',
	setup() {
		return {}
	}
})
</script>
<style lang='scss' scoped>
</style>
