<p align="center">
  <img src="https://cr1ky0-storage.oss-cn-chengdu.aliyuncs.com/player.png" alt="player" style="width:600px;height:350px;"/>
</p>


<h1 align="center">Cy Player Vue2</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/cy-player-vue2">
    <img src="https://img.shields.io/badge/npm-1.0.0-blue" alt="npm:1.0.0">
  </a>
  <a href="https://github.com/Cr1ky0/cy-player-vue2">
    <img src="https://img.shields.io/badge/github-1.0.0-blue" alt="github">
  </a>
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.14-brightgreen" alt="vue:2.6.14">
  </a>
</p>
<p align="center">
   轻量化、性能优秀、美观的Vue3视频播放器组件
</p>


## 说明
- CyPlayer的Vue2移植版，具体使用说明参考Vue3版本文档
- Vue2版本去掉了option属性，相关属性被移到根标签上

## 安装

#### npm

```bash
npm install cy-player-vue2 --save
```

#### yarn

```bash
yarn add cy-player-vue2 
```

## 使用
- Expose内容可以通过`expose`事件获取，详细使用方式如下所示
```vue
<template>
  <div id="app">
    <CyPlayer
      :v-src="src"
      :width="width"
      :height="height"
      :quality="[
        {
          vQ: '720p',
          src: 'https://cdn.pixabay.com/video/2024/02/21/201308-915375262_small.mp4?download',
          // chosen: true,
        },
        {
          vQ: '480p',
          src: 'https://cdn.pixabay.com/video/2024/03/31/206294_small.mp4?download',
        },
      ]"
      @player-mounted="handleMounted"
      @before-player-destroy="handleBeforeDestroy"
      @play="handlePlay"
      @time-change="handleTimeChange"
      @expose="getExposedData"
    >
    </CyPlayer>
  </div>
</template>

<script>
import {CyPlayer} from 'cy-player-vue2';

export default {
  name: 'App',
  components:{
    CyPlayer
  },
  data() {
    return {
      // Expose
      exposedData: {
        videoElement: null,
        states: null,
        controller: null,
      },
      toggle: true,
      // src: 'https://cdn.pixabay.com/video/2024/03/31/206294_small.mp4?download',
      src: 'https://cdn.pixabay.com/video/2024/02/21/201308-915375262_small.mp4?download',
      themeColor: 'red',
      keepControllerShow: true,
      width: '1000',
      height: '650',

      // 测试选项
      options: {
        showToast: true,
        toastPlacement: 'center',
      },
    };
  },
  methods: {
    getExposedData(expose) {
      this.exposedData = expose;
    },
    handleMounted(v, c) {
      // console.log(v, c);
    },
    handleBeforeDestroy(v, c) {
      // console.log(v, c);
    },
    handlePlay(e) {
      // console.log(e);
    },
    handleTimeChange(e) {
      // console.log(e.currentPlayTime);
    },
    handleToast() {
      // this.showToast('test');
    },
    handleProgressMouseDown(e) {
      // console.log(e);
    },
  },
};
</script>
```