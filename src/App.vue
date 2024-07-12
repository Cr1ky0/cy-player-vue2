<template>
  <div
      id="cy-player-container"
      class="cy-player-container">
    <video
        class="cy-player"
        id="cy-player"
        ref="videoRef"
        :autoplay="option.autoPlay"
        :src="option.videoSrc"
    >
      <source :src="option.videoSrc" type="video/mp4"/>
      <source :src="option.videoSrc" type="video/webm"/>
      <source :src="option.videoSrc" type="video/ogg"/>
      <source :src="option.videoSrc" type="application/x-mpegURL"/>
      <source :src="option.videoSrc" type="application/vnd.apple.mpegURL"/>
    </video>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {}
}
</script>

<style>

</style>
