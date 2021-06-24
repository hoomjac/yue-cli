<template>
	<section class="app-main">
		<router-view v-slot="{ Component }">
			<transition name="fade-transform" mode="out-in">
				<keep-alive :include="cachedViews">
					<component :is="Component" :key="$route.path" />
				</keep-alive>
			</transition>
		</router-view>
	</section>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
	name: 'AppMain',
	setup() {
		const store = useStore()
		const cachedViews = computed(() => store.state.tagsView.cachedViews)
		return {
			cachedViews
		}
	},
	components: {}
})
</script>
<style lang="less" scoped>
.app-main {
	/* 50= navbar  50  */
	min-height: calc(100vh - 50px);
	width: 100%;
	position: relative;
	overflow: hidden;
	padding: 10px;
}

.fixed-header + .app-main {
	padding-top: 50px;
}

.hasTagsView {
	.app-main {
		/* 84 = navbar + tags-view = 50 + 34 */
		min-height: calc(100vh - 84px);
	}

	.fixed-header + .app-main {
		padding-top: 84px;
	}
}
</style>
