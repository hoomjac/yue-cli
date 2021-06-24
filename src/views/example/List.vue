<template>
	<div class="list-container">
		<h2>example list</h2>
		<ul class="list">
			<li v-for="i in 20" :key="i">
				<router-link :to="'edit/' + i">list title {{ i }}</router-link>
			</li>
		</ul>
	</div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'ExampleList',
	setup() {
		return {}
	}
})
</script>
<style lang='scss' scoped>
.list {
	li {
		padding: 10px;
	}
}
</style>
