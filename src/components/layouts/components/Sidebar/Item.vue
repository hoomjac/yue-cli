<template>
	<component v-if="isIcon" :is="$antIcons[icon]" />
	<i v-else :icon-class="icon" />
	<span :title="title">{{ title }}</span>
</template>
<script lang='ts'>
import { defineComponent, computed } from 'vue'
export default defineComponent({
	name: 'MenuItem',
	functional: true,
	props: {
		icon: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		}
	},
	components: {},
	setup(props) {
		const icon = computed(() => props.icon)
		const isIcon = computed(() => {
			if (icon.value) {
				if (
					icon.value.includes('Outlined') ||
					icon.value.includes('Filled') ||
					icon.value.includes('TwoTone')
				) {
					return true
				} else {
					return false
				}
			} else {
				return false
			}
		})

		return {
			isIcon
		}
	}
})
</script>
