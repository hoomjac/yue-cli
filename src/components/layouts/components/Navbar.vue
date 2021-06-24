<template>
	<div class="navbar">
		<Hamburger
			id="hamburger-container"
			:is-active="sidebar.opened"
			class="hamburger-container"
			@toggleClick="toggleSideBar"
		/>

		<Breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
		<div class="right-menu">
			<a-dropdown
				:trigger="['click']"
				class="avatar-container right-menu-item hover-effect"
			>
				<a class="ant-dropdown-link" @click.prevent>
					<img src="../../../assets/avatar.png" class="user-avatar" />
					<CaretDownOutlined class="icon-caret-bottom" />
				</a>
				<template #overlay>
					<a-menu>
						<a-menu-item key="0">
							<a @click.prevent="showSetDrawer"> 设 置 </a>
						</a-menu-item>
						<a-menu-divider />
						<a-menu-item key="3">Log Out</a-menu-item>
					</a-menu>
				</template>
			</a-dropdown>
		</div>
	</div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import Breadcrumb from './Breadcrumb.vue'
import Hamburger from './Hamburger.vue'
import { useStore } from 'vuex'
import { CaretDownOutlined } from '@ant-design/icons-vue'
export default defineComponent({
	name: 'Navbar',
	components: {
		Breadcrumb,
		Hamburger,
		CaretDownOutlined
	},
	setup(props, { emit }) {
		const store = useStore()
		const sidebar = computed(() => store.state.app.sidebar)
		const showSetDrawer = () => {
			emit('toggleDrawer')
		}
		return {
			sidebar,
			showSetDrawer
		}
	},
	methods: {
		toggleSideBar() {
			this.$store.dispatch('app/toggleSideBar')
		}
	}
})
</script>
<style lang="less" scoped>
.navbar {
	height: 50px;
	overflow: hidden;
	position: relative;
	background: #fff;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

	.hamburger-container {
		// line-height: 46px;
		line-height: 50px;
		height: 100%;
		float: left;
		cursor: pointer;
		transition: background 0.3s;
		-webkit-tap-highlight-color: transparent;

		&:hover {
			background: rgba(0, 0, 0, 0.025);
		}
	}

	.breadcrumb-container {
		float: left;
		line-height: 50px;
	}

	.errLog-container {
		display: inline-block;
		vertical-align: top;
	}

	.right-menu {
		float: right;
		height: 100%;
		line-height: 50px;

		&:focus {
			outline: none;
		}

		.right-menu-item {
			display: inline-block;
			padding: 0 8px;
			height: 100%;
			font-size: 18px;
			color: #5a5e66;
			vertical-align: text-bottom;

			&.hover-effect {
				cursor: pointer;
				transition: background 0.3s;

				&:hover {
					background: rgba(0, 0, 0, 0.025);
				}
			}
		}

		.avatar-container {
			margin-right: 30px;
			margin-top: 5px;
			position: relative;
			.user-avatar {
				cursor: pointer;
				width: 40px;
				height: 40px;
				border-radius: 10px;
			}
			.icon-caret-bottom {
				cursor: pointer;
				position: absolute;
				right: -10px;
				top: 25px;
				font-size: 12px;
				color: #333;
			}
		}
	}
}
</style>
