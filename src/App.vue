<template>
	<ConfigProvider :prefixCls="prefixCls">
		<router-view />
	</ConfigProvider>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import { name as pkgName } from '../package.json'

export default defineComponent({
	setup() {
		const prefixCls = computed(() => pkgName + '-')

		return { prefixCls }
	},
	components: {
		ConfigProvider
	}
})
</script>
<style lang="less"></style>
