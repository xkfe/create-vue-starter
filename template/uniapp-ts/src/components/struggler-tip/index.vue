<script setup lang="ts">
interface Props {
  /** 文字提示 */
  tip?: string
  /** 显示时长，单位秒 */
  duration?: number
  /** 是否只显示一次 */
  isOnce?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tip: '点击「添加小程序」，下次访问更便捷',
  duration: 0,
  isOnce: false,
})
const showTip = ref(false)
const SHOW_TIP = 'SHOW_TIP'
const TIME_ID = ref<NodeJS.Timeout | null>()

function init() {
  const isShowed = uni.getStorageInfoSync().keys.includes(SHOW_TIP)
  if (props.isOnce && isShowed)
    return
  if (props.duration > 0) {
    showTip.value = true
    TIME_ID.value = setTimeout(() => {
      hideTip()
    }, props.duration * 1000)
    return
  }
  showTip.value = !isShowed
}

function hideTip() {
  props.isOnce && uni.setStorageSync(SHOW_TIP, true)
  showTip.value = false
}

onMounted(() => {
  init()
})
onBeforeUnmount(() => {
  TIME_ID.value && clearTimeout(TIME_ID.value)
})
</script>

<template>
  <view>
    <view v-if="showTip" class="struggler-tip-box">
      <view class="struggler-tip-content" @tap="hideTip">
        <text>{{ props.tip }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
$themeColor: #34b5e2; //主题色

.struggler-tip-box {
  position: fixed;
  top: CustomBar + 20rpx;
  right: -20rpx;
  z-index: 99999;
  opacity: 0.8;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  width: 600upx;
  animation: opacityC 1s linear infinite;
}

.struggler-tip-content::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  top: -38upx;
  right: 105upx;
  border-width: 20upx;
  border-style: solid;
  display: block;
  border-color: transparent transparent $themeColor transparent;
}

.struggler-tip-content {
  border-width: 0upx;
  margin-top: 20upx;
  position: relative;
  background-color: $themeColor;
  box-shadow: 0 10upx 20upx -10upx $themeColor;
  border-radius: 12upx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18upx 20upx;
  margin-right: 40upx;
}

.struggler-tip-content > text {
  color: #fff;
  font-size: 28upx;
  font-weight: 400;
}

@keyframes opacityC {
  0% {
    opacity: 0.8;
  }

  50% {
    opacity: 1;
  }
}
</style>
