<!--
  /**
  * @description 介紹頁面，首頁
  * @author frenkie
  * @date 2020-09-04
  */
-->
<template>
  <div>
    <section class="section memeshow">
      <div class="container">
        <div class="whirlShow">
          <div class="whirlShow__container">
            <div class="whirlShow__container-carouselbase">
              <div class="whirlShow__card whirlShow__card1">
                <div class="whirlShow__card__container">
                  <img src="https://picsum.photos/400/300/?random=1" />
                </div>
              </div>
              <div class="whirlShow__card whirlShow__card2">
                <div class="whirlShow__card__container">
                  <img src="https://picsum.photos/500/400/?random=2" />
                </div>
              </div>
              <div class="whirlShow__card whirlShow__card3">
                <div class="whirlShow__card__container">
                  <img src="https://picsum.photos/300/800/?random=3" />
                </div>
              </div>
              <div class="whirlShow__card whirlShow__card4">
                <div class="whirlShow__card__container">
                  <img src="https://picsum.photos/800/200/?random=4" />
                </div>
              </div>
              <div class="whirlShow__card whirlShow__card5">
                <div class="whirlShow__card__container">
                  <img src="https://picsum.photos/700/800/?random=5" />
                </div>
              </div>
              <div class="whirlShow__card whirlShow__card6">
                <div class="whirlShow__card__container">
                  <img src="https://picsum.photos/500/400/?random=6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="class"></div>
    <h2 id="author" name="author">作者</h2>
    <div class="class"></div>
    <h2 id="idea" name="idea">理念</h2>
    <div class="class"></div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.class {
  height: 100vh;
}
.section {
  padding: 50px 0;
  .container {
    max-width: 1200px;
    margin: auto;
  }
}
@keyframes whirlShow-carousel {
  0% {
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
.whirlShow {
  width: 100%;
  height: 80vh;
  background-color: #ccc;
  perspective: 2000; // 這個要動態
  perspective-origin: center;
  // overflow: hidden;
  &__container {
    width: 100%;
    height: 100%;
    transform: rotateX(90deg) translateZ(-375px);
    transform-style: preserve-3d;
    &-carouselbase{
      background-color: #ffc;
      width: 100%;
      height: 100%;
      transform: rotate(0deg);
      transform-style: preserve-3d;
      // animation: whirlShow-carousel 10s infinite;
    }
  }
  &__card {
    position: absolute;
    top: 50%;
    left: 50%;
    box-sizing: border-box;
    width: 300px;
    height: 300px;
    border: 1px solid #d00;
    &1{
      transform: translate(-50%, -50%) rotate(0deg) translate(150px) rotateX(-90deg) translateY(-100%) rotate(-0deg);
    }
    &2{
      transform: translate(-50%, -50%) rotate(60deg) translate(150px) rotateX(-90deg) translateY(-100%) rotate(-60deg);
    }
    &3{
      transform: translate(-50%, -50%) rotate(120deg) translate(150px) rotateX(-90deg) translateY(-100%) rotate(-120deg);
    }
    &4{
      transform: translate(-50%, -50%) rotate(180deg) translate(150px) rotateX(-90deg) translateY(-100%) rotate(-180deg);
    }
    &5{
      transform: translate(-50%, -50%) rotate(270deg) translate(150px) rotateX(-90deg) translateY(-100%) rotate(-270deg);
    }
    &6{
      transform: translate(-50%, -50%) rotate(360deg) translate(150px) rotateX(-90deg) translateY(-100%) rotate(-360deg);
    }
    &__container {
      position: relative;
      &::before {
        display: inline-block;
        content: "";
        width: 0;
        height: 100%;
        vertical-align: middle;
      }
      width: 100%;
      height: 100%;
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      img {
        max-width: 100%;
        max-height: 100%;
        vertical-align: middle;
      }
    }
  }
}
</style>