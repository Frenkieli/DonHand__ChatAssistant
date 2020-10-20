<template>
  <!-- <headerItem class="main_header"></headerItem> -->
  <router-view
    class="main_container"
  />
  <footer class="main_footer">
    <p class="main_footer_copyright">
      Copyright &copy; 2020 DonHand.&nbsp;
      <a class="main_footer_copyright_link" target="_blank" title="DonHand ChatAssistant github page" href="https://github.com/Frenkieli/DonHand__ChatAssistant">
        Source code
      </a>.
    </p>
    <!-- <iframe src="https://ghbtns.com/github-btn.html?user=Frenkieli&repo=DonHand__ChatAssistant&type=star&count=true&v=2" frameborder="0" scrolling="0" width="100px" height="20px">
    </iframe> -->
  </footer>
  <div id="canvasNest" ref="canvasNest"></div>
</template>

<script>
import headerItem from './views/headerItem';
import { ref, onMounted } from 'vue';

export default {
  name: 'homePage',
  components: {
    headerItem
  },
  setup(){
    // const config = {
    //   color: '255,255,255',
    //   count: 168,
    // };
    // const canvasNest = ref(null);
    // // Hooks
    // onMounted(() => {
    //   console.log("canvasNest", canvasNest.value);
    //   const cn = new CanvasNest(canvasNest.value, config);
    // });
    return {
      // canvasNest
    }
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;700&display=swap');
body{
  font-family: 'Noto Sans TC', sans-serif;
}
.displaynone{
  display: none;
}
</style>

<style lang="scss">
.section {
  overflow: hidden;
  padding: 50px 0;
  .container {
    max-width: 1200px;
    margin: auto;
  }
}
</style>
<style lang="scss" scoped>
.main_header{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
}
.main_container{
  min-height: calc(100vh - 50px);
}
.main_footer{
  color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 12px;
  padding-bottom: 2px;
  box-sizing: border-box;
  background-color: #333;
  background-position: bottom;
  background-size: 100% 100%;
  &::before{
    content: '';
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: bottom;
  }
  &_copyright{
    width: 100%;
    font-size: 16px;
    display: inline-block;
    text-align: center;
    vertical-align: bottom;
    $colorSoure : 0.25s;
    &_link{
      vertical-align: bottom;
      position: relative;
      display: inline-block;
      transition: padding $colorSoure $colorSoure,
                  font-size $colorSoure $colorSoure;
      color: #fff;
      text-decoration: none;
      &::after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        border-bottom: 0px solid transparent;
        transition: border 0s $colorSoure,
                    width $colorSoure 0s;
      }
      &:hover{
        font-size: 1.5em;
        padding-bottom: 2px;
        transition: padding $colorSoure 0s,
                    font-size $colorSoure 0s;
        &::after{
          width: 100%;
          border-bottom: 2px solid #fff;
          transition: border 0s $colorSoure,
                      width $colorSoure $colorSoure;
        }
      }
    }
  }
}
</style>