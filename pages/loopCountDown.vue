<template>
  <!-- 循环计时器页面 -->
  <view class="main">
    <view></view>
    <view class="panel">
      <!-- 当前步骤的标题 -->
      <view class="currentTitle">
        {{ currentStep.title }}
      </view>

      <!-- 当前计时器剩余时间显示在页面上的字符串 -->
      <span class="loopTimerLeftTimeText">{{
        $time.secondsToString(leftTime)
      }}</span>

      <!-- 辅助线 -->
      <u-line
        color="gray"
        length="75%"
        margin="30rpx auto"
        :hair-line="false"
      />

      <!-- 下一步骤的信息 -->
      <view class="nextTimerInfo">
        <!-- 剩余次数 -->
        <view class="infoBox">
          <view class="info">{{ timerList.length - 1 }}</view>
          <view class="description">{{ $t('cycle.leftSteps') }}</view>
        </view>

        <!-- 下个步骤的名称 -->
        <view class="infoBox">
          <view class="info">{{ nextStep.title }}</view>
          <view class="description">{{ $t('cycle.nextTimerName') }}</view>
        </view>

        <!-- 下个步骤的时长 -->
        <view class="infoBox">
          <view class="info">{{ nextStep.time }}</view>
          <view class="description">{{ $t('cycle.nextTimerDuration') }}</view>
        </view>
      </view>
    </view>

    <!-- 底部按钮组 -->
    <view class="buttonGroup">
      <!-- 倒计时进行时显示的按钮： 重启、暂停、下个步骤 -->
      <view v-if="isPaused == false" class="buttonGroup">
        <view class="button" @click="restart">
          <u-icon name="reload" size="50"></u-icon>
        </view>
        <view class="button" @click="pause">
          <u-icon name="pause" size="50"></u-icon>
        </view>
        <view class="button" @click="goNextStep">
          <u-icon name="arrow-rightward" size="50"></u-icon>
        </view>
      </view>
      <!-- 倒计时暂停时显示的按钮：继续、退出返回 -->
      <view v-else class="buttonGroup">
        <view class="button" @click="goOn">
          <u-icon name="play-right-fill" size="50"></u-icon>
        </view>
        <view class="button" @click="goback">
          <u-icon name="close" size="50" color="red"></u-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 计时器组列表
      timerList: [],
      // 计时器组件信息
      countDownTime: 0,
      // 暂停功能相关变量
      isPaused: false,
      pauseTime: 0,
      // 定时器ID
      animationFrameId: null,
      startTime: null,
      pauseTime: 0,
      pauseStartTime: null,
      // 剩余时间
      leftTime: 0,
      // 总循环次数
      cycleTimes: 0,
      timerIndex: 0,
      nextTimerIndex: 0,
      currentIndex: 0,
    };
  },
  watch: {
    leftTime(value) {
      if (value === 5) {
        this.playAudio();
      } else if (value === 0) {
        this.stopAudio();
        clearInterval(this.timerId);
        if (this.storage.setting.timerSwitchType === 'auto') {
          this.timerList.shift();
          if (this.timerList.length === 0) {
            this.gotoIndexPage('loop');
          }
          this.startTimer();
        }
      }
    },
    timerList(value) {
      if (value.length - 1 < 0) {
        this.gotoIndexPage('loop');
      }
    },
  },
  computed: {
    nextStep() {
      if (!this.timerList[this.currentIndex + 1]) {
        return {
          title: this.$t('system.none'),
          time: this.$time.secondsToString(0),
        };
      }
      const { time, title } = this.timerList[this.currentIndex + 1];
      return {
        title,
        time: this.$time.secondsToString(time),
      };
    },
    currentStep() {
      if (!this.timerList[this.currentIndex]) {
        return {
          title: this.$t('system.none'),
          time: this.$time.secondsToString(0),
        };
      }
      const { time, title } = this.timerList[this.currentIndex];
      this.leftTime = time;
      return {
        title,
      };
    },
  },
  methods: {
    playAudio() {
      if (!this.isPaused && this.leftTime <= 5 && this.leftTime >= 1) {
        if (this.ringtoneAudio && this.ringtoneAudio.paused) {
          this.ringtoneAudio.play().catch((err) => {
            console.error('音频播放失败:', err);
          });
        }
      }
    },
    stopAudio() {
      if (this.ringtoneAudio) {
        this.ringtoneAudio.pause();
        this.ringtoneAudio.currentTime = 0;
      }
    },
    // 暂停
    pause() {
      this.stopAudio();
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      this.isPaused = true;
      this.pauseStartTime = Date.now();
    },
    // 继续
    goOn() {
      this.pauseTime += Date.now() - this.pauseStartTime;
      this.startTimer();
      this.isPaused = false;
    },
    // 重启
    restart() {
      this.stopAudio();
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      this.leftTime = this.timerList[0].time;
      this.startTime = Date.now();
      this.pauseTime = 0;
      this.startTimer();
    },
    // 退出返回首页
    goback() {
      this.stopAudio();
      this.leftTime = 0;
      clearInterval(this.timerId);
      this.gotoIndexPage('loop');
    },
    // 跳转到下一步骤
    goNextStep() {
      this.stopAudio();
      // 索引号 + 1
      clearInterval(this.timerId);
      this.timerList.shift();
      this.startTimer();
    },
    startTimer() {
      if (!this.startTime) {
        this.startTime = Date.now();
        this.pauseTime = 0;
      }

      const updateTimer = () => {
        if (!this.isPaused) {
          const currentTime = Date.now();
          const elapsedTime = Math.floor(
            (currentTime - this.startTime - this.pauseTime) / 1000
          );
          const newLeftTime = Math.max(this.timerList[0].time - elapsedTime, 0);

          if (this.leftTime !== newLeftTime) {
            this.leftTime = newLeftTime;
          }

          if (this.leftTime === 0) {
            this.stopAudio();
            if (this.timerList.length > 1) {
              this.timerList.shift();
              this.startTime = Date.now();
              this.pauseTime = 0;
            }
          }
        }
        this.animationFrameId = requestAnimationFrame(updateTimer);
      };

      this.animationFrameId = requestAnimationFrame(updateTimer);
    },
    leavePage() {
      this.stopAudio();
      if (this.ringtoneAudio) {
        this.ringtoneAudio.destroy();
      }
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    },
  },
  created() {
    const { timerList, cycleTimes } = this.storage.currentLoopTimer;

    let newArr = [];
    for (let i = 0; i < cycleTimes; i++) {
      newArr = [...newArr, ...timerList];
    }

    if (timerList.length === 0) {
      this.toastThenJumpToIndex(
        this.$t('index.cycle.timerListCannotBeEmpty'),
        'loop'
      );
    } else if (cycleTimes <= 0) {
      this.toastThenJumpToIndex(
        this.$t('index.cycle.cyclceTimesWrongTip'),
        'loop'
      );
    } else {
      for (let i = 0; i < cycleTimes; i++) {
        this.timerList = [...this.timerList, ...timerList];
      }
      this.leftTime = timerList[0].time;
      this.createRingtoneAudio();
      this.startTimer();
    }
  },
  onUnload() {
    this.leavePage();
  },
  beforeDestroy() {
    this.leavePage();
  },
  onHide() {
    this.leavePage();
  },
};
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 40px;
  box-sizing: border-box;
  background-color: white;
}

.panel {
  width: 100%;

  .loopTimerLeftTimeText {
    font-size: 150rpx;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .nextTimerInfo {
    display: flex;
    justify-content: space-around;
    margin-top: 25px;

    .infoBox {
      display: flex;
      flex-direction: column;
      align-items: center;

      .info {
        font-size: 60rpx;
      }

      .description {
        font-size: 30rpx;
        color: gray;
      }
    }
  }

  .currentTitle {
    text-align: center;
    font-size: 75rpx;
    color: gray;
  }
}

.buttonGroup {
  width: 100%;
  display: flex;
  justify-content: space-around;

  .button {
    border: 1px solid #f1f1f1;
    width: 90rpx;
    height: 90rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: rgb(34, 131, 246);
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.19);
  }
}
</style>
