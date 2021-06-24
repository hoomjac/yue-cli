<template>
	<div class="error404">
		<div class="error404-body-con">
			<a-card>
				<div class="error404-body-con-title">
					4
					<span>
						<FrownOutlined />
					</span>
					1
				</div>
				<p class="error404-body-con-message">
					YOU&nbsp;&nbsp;LOOK&nbsp;&nbsp;LOST
				</p>
				<div class="error404-btn-con">
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
import { FrownOutlined } from '@ant-design/icons-vue'
export default defineComponent({
	name: 'Page401',
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
		FrownOutlined
	}
})
</script>
<style lang='scss' scoped>
@import './404.scss';
</style>
