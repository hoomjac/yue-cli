<template>
	<div class="BlankView-container">
		<router-view />
	</div>
</template>
<script lang='ts'>
// 空白视图，仅包含一个路由视图内容区
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'BlankView',
	setup() {
		return {}
	}
})
</script>
