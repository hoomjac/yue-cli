<template>
	<template v-if="!item.hidden">
		<template
			v-if="
				hasOneShowingChild(item.children, item) &&
				(!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
				!item.alwaysShow
			"
		>
			<a-menu-item
				:key="resolvePath(onlyOneChild.path)"
				:class="{ 'submenu-title-noDropdown': !isNest }"
			>
				<AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
					<item
						:icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
						:title="onlyOneChild.meta.title"
					/>
				</AppLink>
			</a-menu-item>
		</template>

		<a-sub-menu
			v-else
			ref="subMenu"
			:key="resolvePath(item.path)"
			v-bind="$attrs"
		>
			<template #title>
				<item
					v-if="item.meta"
					:icon="item.meta && item.meta.icon"
					:title="item.meta.title"
				/>
			</template>
			<sidebar-item
				v-for="child in item.children"
				:key="child.path"
				:is-nest="true"
				:item="child"
				:base-path="resolvePath(child.path)"
				class="nest-menu"
			/>
		</a-sub-menu>
	</template>
</template>
<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import { RouteConfig } from '@/router/routes'
import * as path from 'path'
import { isExternal } from '@/utils/validate'
import AppLink from './Link.vue'
import Item from './Item.vue'

export default defineComponent({
	name: 'SidebarItem',
	props: {
		// route object
		item: {
			type: Object,
			required: true
		},
		isNest: {
			type: Boolean,
			default: false
		},
		basePath: {
			type: String,
			default: ''
		}
	},
	components: {
		AppLink,
		Item
	},
	setup() {
		const onlyOneChild = reactive({})
		return {
			onlyOneChild
		}
	},
	methods: {
		hasOneShowingChild(children = [], parent: RouteConfig) {
			const showingChildren = children.filter((item: RouteConfig) => {
				if (item && item.hidden) {
					//  当设置 true 的时候该路由不会在侧边栏出现
					return false
				} else {
					// Temp set(will be used if only has one showing child)
					this.onlyOneChild = item
					return true
				}
			})

			// 当只有一个子路由时，默认显示该子路由
			if (showingChildren.length === 1) {
				return true
			}

			// 如果没有子路由显示，则显示父路由
			if (showingChildren.length === 0) {
				this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
				return true
			}

			return false
		},
		resolvePath(routePath: string) {
			if (isExternal(routePath)) {
				return routePath
			}
			if (isExternal(this.basePath)) {
				return this.basePath
			}

			return path.resolve(this.basePath, routePath)
		}
	}
})
</script>
