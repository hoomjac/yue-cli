<template>
	<div style="padding: 0 15px" @click="toggleClick">
		<MenuFoldOutlined v-if="isActive" class="hamburger" />
		<MenuUnfoldOutlined v-else class="hamburger" />
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
export default defineComponent({
	name: 'Hamburger',
	props: {
		isActive: {
			type: [Boolean, String],
			default: false
		}
	},
	components: {
		MenuFoldOutlined,
		MenuUnfoldOutlined
	},
	methods: {
		toggleClick() {
			this.$emit('toggleClick')
		}
	}
})
</script>
<style lang="less" scoped>
.hamburger {
	font-size: 20px;
}
</style>
