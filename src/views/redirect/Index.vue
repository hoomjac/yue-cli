<template>
	<div class="index-container"></div>
</template>
<script lang='ts'>
import { defineComponent, onActivated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
	name: 'index',
	setup() {
		onActivated(() => {
			const route = useRoute()
			const router = useRouter()
			const { params, query } = route
			const { path } = params
			router.replace({ path: '/' + path, query })
		})
		return {}
	}
})
</script>
<style lang='scss' scoped>
</style>
