<template>
	<div class="error403">
		<div class="error403-body-con">
			<a-card>
				<div class="error403-body-con-title">
					4
					<span class="error403-0-span">
						<BellOutlined />
					</span>
					<span class="error403-key-span">
						<ThunderboltOutlined />
					</span>
				</div>
				<p class="error403-body-con-message">You don't have permission</p>
				<div class="error403-btn-con">
					<a-button
						@click="goHome"
						size="large"
						type="default"
						style="width: 200px"
						>返回首页</a-button
					>
					<a-button
						@click="backPage"
						size="large"
						type="primary"
						style="width: 200px; margin-left: 40px"
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
import { BellOutlined, ThunderboltOutlined } from '@ant-design/icons-vue'
export default defineComponent({
	name: 'Page403',
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
		ThunderboltOutlined,
		BellOutlined
	}
})
</script>
<style lang='scss' scoped>
@import './403.scss';
</style>
