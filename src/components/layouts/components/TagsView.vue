<template>
	<div class="tags-view-container">
		<div class="tags-view-wrapper">
			<router-link
				v-for="tag in visitedViews"
				ref="tagRef"
				:key="tag.path"
				:class="isActive(tag) ? 'active' : ''"
				:to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
				tag="span"
				class="tags-view-item"
				@click.prevent.right="openMenu(tag, $event)"
			>
				{{ tag.title }}
				<CloseOutlined
					v-if="!isAffix(tag)"
					class="icon-close"
					@click.prevent.stop="closeSelectedTag(tag)"
				/>
			</router-link>
		</div>
		<ul
			v-show="visible"
			:style="{ left: left + 'px', top: top + 'px' }"
			class="contextmenu"
		>
			<li @click="refreshSelectedTag(selectedTag)">刷新页面</li>
			<li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
				关闭当前
			</li>
			<li @click="closeOthersTags">关闭其他</li>
			<li @click="closeAllTags(selectedTag)">关闭所有</li>
		</ul>
	</div>
</template>
<script lang='ts'>
import {
	computed,
	defineComponent,
	nextTick,
	onMounted,
	reactive,
	ref,
	watch
} from 'vue'
import { useStore } from 'vuex'
import { CloseOutlined } from '@ant-design/icons-vue'
import { useRoute } from 'vue-router'
import { toRefs } from '@vueuse/core'
import * as path from 'path'

export default defineComponent({
	name: 'TagsView',
	components: {
		CloseOutlined
	},
	setup() {
		const tagRef = ref() // dom ref = tagRef 的元素
		const store = reactive(useStore())
		const route = useRoute()
		const routes = computed(() => store.state.permission.routes)
		const visitedViews = computed(() => {
			return store.state.tagsView.visitedViews
		})
		const state = reactive({
			visible: false,
			top: 0,
			left: 0,
			selectedTag: {},
			affixTags: []
		})

		const addTags = () => {
			const { name } = route
			if (name) {
				store.dispatch('tagsView/addView', route)
			}
			return false
		}

		const filterAffixTags = (routes: any, basePath = '/'): [] => {
			let tags: any = []
			routes.forEach((route: any) => {
				if (route.meta && route.meta.affix) {
					const tagPath = path.resolve(basePath, route.path)
					tags.push({
						fullPath: tagPath,
						path: tagPath,
						name: route.name,
						meta: { ...route.meta }
					})
				}
				if (route.children) {
					const tempTags = filterAffixTags(route.children, route.path)
					if (tempTags.length >= 1) {
						tags = [...tags, ...tempTags]
					}
				}
			})
			return tags
		}

		const initTags = () => {
			const affixTags = (state.affixTags = filterAffixTags(routes.value))
			affixTags.forEach((tag: any) => {
				if (tag.name) {
					store.dispatch('tagsView/addVisitedView', tag)
				}
			})
		}
		const moveToCurrentTag = async () => {
			await nextTick()
			for (const tag of visitedViews.value) {
				if (tag.path === route.path) {
					// this.$refs.scrollPane.moveToTarget(tag)
					// when query is different then update
					if (tag.fullPath !== route.fullPath) {
						store.dispatch('tagsView/updateVisitedView', route)
					}
					break
				}
			}
		}

		const closeMenu = () => {
			state.visible = false
		}

		watch(
			() => route.path,
			() => {
				addTags()
				moveToCurrentTag()
			}
		)

		watch(
			() => state.visible,
			(value) => {
				if (value) {
					document.body.addEventListener('click', closeMenu)
				} else {
					document.body.removeEventListener('click', closeMenu)
				}
			}
		)

		onMounted(() => {
			addTags()
			initTags()
		})

		return {
			tagRef,
			visitedViews,
			...toRefs(state),
			moveToCurrentTag
		}
	},

	methods: {
		// 当前选中路由
		isActive(route: any) {
			return route.path === this.$route.path
		},
		// 是否固定在tags-view中
		isAffix(tag: any) {
			return tag.meta && tag.meta.affix
		},
		// 关闭选中tag
		closeSelectedTag(view: any) {
			this.$store
				.dispatch('tagsView/delView', view)
				.then(({ visitedViews }) => {
					if (this.isActive(view)) {
						this.toLastView(visitedViews, view)
					}
				})
		},
		// 跳最后一个tag
		toLastView(visitedViews: any, view: any) {
			const latestView = visitedViews.slice(-1)[0]
			if (latestView) {
				// 跳到最后一个tags路由
				this.$router.push(latestView.fullPath)
			} else {
				// 默认重定向到home主页 如果没有tags视图,
				// 你可以根据需要进行调整.
				if (view.name === 'Home') {
					// to reload home page
					this.$router.replace({ path: '/redirect' + view.fullPath })
				} else {
					this.$router.push('/')
				}
			}
		},
		// 右键打开选项卡
		openMenu(tag: any, e: any) {
			const menuMinWidth = 105
			const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
			const offsetWidth = this.$el.offsetWidth // container width
			const maxLeft = offsetWidth - menuMinWidth // left boundary
			const left = e.clientX - offsetLeft + 15 // 15: margin right

			if (left > maxLeft) {
				this.left = maxLeft
			} else {
				this.left = left
			}

			this.top = e.clientY - 40
			this.visible = true
			this.selectedTag = tag
		},
		// 刷新当前路由
		refreshSelectedTag(view: any) {
			this.$store.dispatch('tagsView/delCachedView', view).then(() => {
				const { fullPath } = view
				this.$nextTick(() => {
					this.$router.replace({
						path: '/redirect' + fullPath
					})
				})
			})
		},
		// 关闭其他tag
		closeOthersTags() {
			this.$router.push(this.selectedTag)
			this.$store
				.dispatch('tagsView/delOthersViews', this.selectedTag)
				.then(() => {
					this.moveToCurrentTag()
				})
		},
		// 关闭所有tag
		closeAllTags(view: any) {
			this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
				if (this.affixTags.some((tag: any) => tag.path === view.path)) {
					return
				}
				this.toLastView(visitedViews, view)
			})
		}
	}
})
</script>
<style lang='less' scoped>
.tags-view-container {
	height: 34px;
	width: 100%;
	background: #fff;
	border-bottom: 1px solid #d8dce5;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

	white-space: nowrap;
	position: relative;
	// overflow: hidden;
	width: 100%;
	.tags-view-wrapper {
		overflow-y: auto;
		.tags-view-item {
			display: inline-block;
			position: relative;
			cursor: pointer;
			height: 26px;
			line-height: 26px;
			border: 1px solid #d8dce5;
			color: #495060;
			background: #fff;
			padding: 0 8px;
			font-size: 12px;
			margin-left: 5px;
			margin-top: 4px;
			&:first-of-type {
				margin-left: 15px;
			}
			&:last-of-type {
				margin-right: 15px;
			}
			&.active {
				background-color: #42b983;
				color: #fff;
				border-color: #42b983;
				&::before {
					content: '';
					background: #fff;
					display: inline-block;
					width: 8px;
					height: 8px;
					border-radius: 50%;
					position: relative;
					margin-right: 2px;
				}
			}

			.icon-close {
				width: 16px;
				height: 16px;
				line-height: 15px;
				border-radius: 50%;
				text-align: center;
				transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
				transform-origin: 100% 50%;
				font-size: 7px;
				vertical-align: 1px;
				&:before {
					transform: scale(0.6);
					display: inline-block;
				}
				&:hover {
					background-color: #b4bccc;
					color: #fff;
				}
			}
		}
	}
	.contextmenu {
		margin: 0;
		background: #fff;
		z-index: 3000;
		position: absolute;
		list-style-type: none;
		padding: 5px 0;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 400;
		color: #333;
		box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
		li {
			margin: 0;
			padding: 7px 16px;
			cursor: pointer;
			&:hover {
				background: #eee;
			}
		}
	}
}
</style>
