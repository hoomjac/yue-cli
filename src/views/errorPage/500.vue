<template>
	<div class="error500">
		<div class="error500-body-con">
			<a-card>
				<div class="error500-body-con-title">
					5
					<span class="error500-0-span">
						<RocketOutlined />
					</span>
					<span class="error500-0-span">
						<RocketOutlined />
					</span>
				</div>
				<p class="error500-body-con-message">Oops! the server is wrong</p>
				<div class="error500-btn-con">
					<a-button
						@click="goHome"
						size="large"
						style="width: 200px"
						type="default"
						>返回首页</a-button
					>
					<a-button
						@click="backPage"
						size="large"
						style="width: 200px; margin-left: 40px"
						type="primary"
						>返回上一页</a-button
					>
				</div>
			</a-card>
		</div>
	</div>
</template>
<script lang='ts'>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { RocketOutlined } from '@ant-design/icons-vue'
export default defineComponent({
	name: 'Page500',
	setup() {
		const store = useStore()
		const router = useRouter()
		const settings = computed(() => store.state.settings)
		const goHome = () => {
			router.push({
				name: settings.value.homePath
			})
		}
		const backPage = () => {
			router.go(-1)
		}
		return {
			goHome,
			backPage
		}
	},
	components: {
		RocketOutlined
	}
})
</script>
<style lang='scss' scoped>
@import './500.scss';
</style>
