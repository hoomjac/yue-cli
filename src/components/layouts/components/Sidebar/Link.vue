<template>
	<component :is="type" v-bind="linkProps(to)">
		<slot />
	</component>
</template>
<script lang='ts'>
import { computed, defineComponent } from 'vue'
import { isExternal } from '@/utils/validate'
export default defineComponent({
	name: 'Link',
	props: {
		to: {
			type: String,
			required: true
		}
	},
	setup(props) {
		const isExternalPath = computed(() => isExternal(props.to))

		const type = computed(() => {
			if (isExternalPath.value) {
				return 'a'
			}
			return 'router-link'
		})

		const linkProps = (to: string) => {
			if (isExternalPath.value) {
				return {
					href: to,
					target: '_blank',
					rel: 'noopener'
				}
			}
			return {
				to: to
			}
		}
		return {
			type,
			linkProps
		}
	}
})
</script>
