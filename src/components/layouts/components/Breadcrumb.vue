<template>
	<a-breadcrumb class="app-breadcrumb">
		<a-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
			<span
				v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
				class="no-redirect"
			>
				{{ item.meta.title }}
			</span>
			<a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
		</a-breadcrumb-item>
	</a-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import * as pathToRegexp from 'path-to-regexp'

export default defineComponent({
	name: 'Breadcrumb',
	setup() {
		const route = reactive(useRoute())
		// watch(
		// 	// 需要引入watch watch 我一会讲
		// 	() => route.name,
		// 	(newName, oldName) => {
		// 		console.log(newName)
		// 	}
		// )

		let levelList = ref([])
		const isHome = (route: any) => {
			const name = route && route.name
			if (!name) {
				return false
			}
			return name.trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase()
		}

		const getBreadcrumb = () => {
			// only show routes with meta.title
			let matched: any = route.matched.filter(
				(item) => item.meta && item.meta.title
			)
			const first = matched[0]

			if (!isHome(first)) {
				matched = [{ path: '/home', meta: { title: '首页' } }].concat(matched)
			}

			levelList = matched.filter(
				(item: any) =>
					item.meta && item.meta.title && item.meta.breadcrumb !== false
			)
		}
		getBreadcrumb()

		return {
			levelList
		}
	},
	methods: {
		handleLink(item: any) {
			const { redirect, path } = item
			if (redirect) {
				this.$router.push(redirect)
				return
			}
			this.$router.push(this.pathCompile(path))
		},
		pathCompile(path: string) {
			// To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
			const { params } = this.$route
			var toPath = pathToRegexp.compile(path)
			return toPath(params)
		}
	},
	components: {}
})
</script>
<style lang="less" scoped>
.app-breadcrumb {
	a {
		color: rgba(0, 0, 0, 0.9);
	}
}
</style>
