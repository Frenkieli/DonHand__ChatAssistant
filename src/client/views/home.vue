<!--
  /**
  * @description 推廣首頁
  * @author frenkie
  * @date 2020-10-20
  */
-->

<template>
  <div 
    id="phone"
    class="phone"
  >
    <div class="phone_body">
      <img class="phone_body_border" src="../assets/images/linebackground/iphone.png" alt="iphone">
      <div class="phone_body_container">
        <div class="phone_body_container_message"></div>
        <div class="phone_body_container_textfield">
          <input
            type="text"
            class="phone_body_container_textfield_input"
          />
          <font-awesome-icon 
            icon="play" 
            class="phone_body_container_textfield_icon"
          />
        </div>
      </div>
    </div>
    <div class="phone_background">
      <img 
        class="phone_background_card"
        src="../assets/images/linebackground/phonebackgroun.jpg">
    </div>
  </div>
  <section class="banner">
    <banner-svg />
  </section>
</template>

<script>

import bannerSvg from "./bannerSvg.vue";

export default {
  components: {
    bannerSvg
  },
  setup() {

    return {
    };
  },
};
</script>
<style lang="scss" scoped>
.phone{
  z-index: 1;
  position: fixed;
  width: 360px;
  height: 600px;
  // top: -50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.3s;
  &_body{
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    &_border{
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
    &_container{
      position: absolute;
      bottom: 17px;
      left: 23px;
      right: 23px;
      &_textfield{
        display: flex;
        align-items: center;
        background-color: #fff;
        padding: 5px;
        padding-bottom: 15px;
        padding-top: 4px;
        height: 30px;
        border-top: 1px solid #00000022;
        &_input{
          display: block;
          position: relative;
          z-index: 2;
          width: 90%;
          border-radius: 8px;
          height: 30px;
          border: 1px inset #00000022;
          margin: auto;
        }
        &_icon {
          cursor: pointer;
          position: relative;
          margin-top: 5px;
          z-index: 2;
        }
      }
    }
  }
  
  &_background{
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border-radius: 30px;
    overflow: hidden;
    z-index: 0;
    &_card{
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
}
.banner {
  height: 100vh;
}
</style>