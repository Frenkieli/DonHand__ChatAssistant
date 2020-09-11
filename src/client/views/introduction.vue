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
                  <div class="div_test">
                    <img src="https://picsum.photos/400/300/?random=1" />
                  </div>
                </div>
              </div>
              <div class="whirlShow__card whirlShow__card2">
                <div class="whirlShow__card__container">
                  <div class="div_test">
                    <img src="https://picsum.photos/500/400/?random=2" />
                  </div>
                </div>
              </div>
              <div class="whirlShow__card whirlShow__card3">
                <div class="whirlShow__card__container">
                  <div class="div_test">
                    <img src="https://picsum.photos/300/800/?random=3" />
                  </div>
                </div>
              </div>
              <div class="whirlShow__card whirlShow__card4">
                <div class="whirlShow__card__container">
                  <div class="div_test">
                    <img src="https://picsum.photos/800/200/?random=4" />
                  </div>
                </div>
              </div>
              <div class="whirlShow__card whirlShow__card5">
                <div class="whirlShow__card__container">
                  <div class="div_test">
                    <img src="https://picsum.photos/700/800/?random=5" />
                  </div>
                </div>
              </div>
              <div class="whirlShow__card whirlShow__card6">
                <div class="whirlShow__card__container">
                  <div class="div_test">
                    <img src="https://picsum.photos/500/400/?random=6" />
                  </div>
                </div>
              </div>
              <div class="whirlShow__card whirlShow__card7">
                <div class="whirlShow__card__container">
                  <div class="div_test">
                    <img src="https://picsum.photos/100/400/?random=7" />
                  </div>
                </div>
              </div>
              <div class="whirlShow__card whirlShow__card8">
                <div class="whirlShow__card__container">
                  <div class="div_test">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam placeat quam ipsam rem, odit nihil. Minus autem exercitationem ea asperiores. Quo impedit laudantium quia sequi reprehenderit, accusamus earum consectetur eaque.
                    </p>
                  </div>
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
@keyframes whirlShow-carousel {
  0% {
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
@keyframes whirlShow-carousel-item-neutralize {
  0% {
    transform: rotateY(0deg);
  }
  100%{
    transform: rotateY(360deg);
  }
}
.whirlShow {
  width: 100%;
  height: 80vh;
  // background-color: #ccc;
  perspective: 2000; // 這個要動態
  perspective-origin: center;
  // overflow: hidden;
  &__container {
    width: 100%;
    height: 100%;
    transform: rotateX(90deg) translateZ(-375px);
    transform-style: preserve-3d;
    &-carouselbase{
      border-radius: 50%;
      // background-color: #ffc;
      background-image: url('../assets/images/startfloor.png');
      width: 100%;
      padding-bottom: 100%;
      transform: rotate(0deg);
      transform-style: preserve-3d;
      animation: whirlShow-carousel 10s infinite linear;
    }
  }
  &__card {
    position: absolute;
    top: 50%;
    left: 50%;
    box-sizing: border-box;
    width: 300px;
    height: 380px;
    transform-style: preserve-3d;
    // border: 1px solid #f00;
    &1{
      transform: translate(-50%, -50%) rotate(0deg) translateY(400px) rotate(-0deg) rotateX(-90deg) translateY(-100%);
    }
    &2{
      transform: translate(-50%, -50%) rotate(45deg) translateY(400px) rotate(-45deg) rotateX(-90deg) translateY(-100%);
    }
    &3{
      transform: translate(-50%, -50%) rotate(90deg) translateY(400px) rotate(-90deg) rotateX(-90deg) translateY(-100%);
    }
    &4{
      transform: translate(-50%, -50%) rotate(135deg) translateY(400px) rotate(-135deg) rotateX(-90deg) translateY(-100%);
    }
    &5{
      transform: translate(-50%, -50%) rotate(180deg) translateY(400px) rotate(-180deg) rotateX(-90deg) translateY(-100%);
    }
    &6{
      transform: translate(-50%, -50%) rotate(225deg) translateY(400px) rotate(-225deg) rotateX(-90deg) translateY(-100%);
    }
    &7{
      transform: translate(-50%, -50%) rotate(270deg) translateY(400px) rotate(-270deg) rotateX(-90deg) translateY(-100%);
    }
    &8{
      transform: translate(-50%, -50%) rotate(315deg) translateY(400px) rotate(-315deg) rotateX(-90deg) translateY(-100%);
    }
    &__container {
      position: relative;
      animation: whirlShow-carousel-item-neutralize 10s infinite linear;
      width: 100%;
      height: 100%;
    }
  }
}
.div_test{
  text-align: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15px;
  vertical-align: middle;
  img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }
  p{
    display: inline-block;
    width: 100%;
    vertical-align: middle;
  }
  &::before {
    display: inline-block;
    content: "";
    width: 0;
    height: 100%;
    vertical-align: middle;
  }
}
</style>