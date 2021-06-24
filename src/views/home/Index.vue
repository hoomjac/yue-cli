<template>
	<div class="home-container">
		<a-card> 欢迎来到{{ appTitle }}！！！ </a-card>
	</div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
	name: 'home',
	setup() {
		const store = useStore()
		const appTitle = computed(() => store.state.settings.appTitle)
		return {
			appTitle
		}
	},
	components: {}
})
</script>
<style lang="less">
</style>
