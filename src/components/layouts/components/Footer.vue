<template>
	<div class="footer">
		<div class="links">
			<a
				target="_blank"
				:key="index"
				:href="item.link ? item.link : 'javascript: void(0)'"
				v-for="(item, index) in linkList"
			>
				{{ item.name }}
			</a>
		</div>
		<div class="copyright">
			Copyright <CopyrightCircleOutlined /> {{ copyright }}
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { CopyrightCircleOutlined } from '@ant-design/icons-vue'
export default defineComponent({
	props: ['copyright', 'linkList'],
	name: 'Footer',
	components: {
		CopyrightCircleOutlined
	}
})
</script>
<style lang="less">
@text-color-second: 'rgba(0,0,0,.45)';
.footer {
	padding: 24px 16px 24px;
	text-align: center;
	background: #f0f2f5;
	.copyright {
		color: @text-color-second;
		font-size: 14px;
		i {
			margin: 0 4px;
		}
	}
	.links {
		margin-bottom: 8px;
		a:not(:last-child) {
			margin-right: 40px;
		}
		a {
			color: @text-color-second;
			-webkit-transition: all 0.3s;
			transition: all 0.3s;
		}
	}
}
</style>
