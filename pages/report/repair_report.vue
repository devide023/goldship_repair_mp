<template>
	<view>
		<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts"></canvas>
	</view>
</template>

<script>
	import ucharts from '../../js_sdk/u-charts/u-charts/u-charts.js'
	import reportfn from '../../api/report/repair_index.js'
	let _self;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				form:{},
				dataship: []
			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getdata();
		},
		methods: {
			getdata(){
				reportfn.repair_ship(this.form).then(res=>{
					this.dataship = res.data.result;
					this.showchart();
				});
			},
			showchart(){
				new ucharts({
					$this: this,
					canvasId: 'canvasColumn',
					type: 'pie',
					fontSize: 11,
					legend: {
						show: true
					},
					background: '#FFFFFF',
					pixelRatio: 1,
					series: this.dataship,
					animation: true,
					width: this.cWidth,
					height: this.cHeight,
					dataLabel: true,
					extra: {
						pie: {
							labelWidth: 15
						}
					},
				});
			}
		}
	}
</script>

<style>
	page {
		background: #F2F2F2;
		width: 750upx;
		overflow-x: hidden;
	}

	.qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	/* 通用样式 */
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
