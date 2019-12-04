<template>
	<div class="popup" id="popup" v-show="open" :class="{active:getIsShow}">
		<div class="popup-mask"></div>
		<div class="popup-box">
			<div class="popup-box-bd">
				<div class="popup-box-bd-body">
					<div class="popup-box-bd-body-title clear">
						<div class="popup-title-icon fl">
							<i></i>
							{{title}}
						</div>
						<div class="popup-title-close" @click="close">
						</div>
					</div>
					<div class="popup-box-content">
              <slot name="content"></slot>
          </div>
				</div>
			</div>
      <div class="clear"></div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			open: {
				type: Boolean,
				default: true
			},
			title: {
				type: String,
				default: '信息提示'
			},
			width: {
				type: Number,
				default: 442
			},
			height: {
				type: Number,
				default: 550
			},
			top:{
				type:Number,
				default:320
			}
		},
		methods: {
			close: function() {
				this.$emit('close');

			},
			show:function(){
			  this.$emit('show')
			}
		},
		data() {
			return {
			}
    },
    computed:{
      getIsShow(){
        return this.$store.state.treasure.isLoginAddActive
      },
    },
	}
</script>
<style lang="scss" scoped src="@/assets/css/login.css"></style>
