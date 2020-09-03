<template>
  <div class="container">
    <img class="container_img" src="../assets/images/lineBotQrcode.png" alt="lineBotQrcode">
    <p>用line加入好友的</p>
    <p>行動條碼功能去掃條碼</p>
    <router-view/>
    <p>
      DonHand_ChatAssistant
    </p>
    hello {{state.message}}
    <div>count: {{count}}</div>
    <div>doubleCount: {{doubleCount}}</div>
    <button @click="increment" class="button">increment</button>
  </div>
  <!-- asd -->
</template>

<script>
import { addNumber } from '../composition/addNumber'
export default {
  setup () {  
    const { count, state, doubleCount, increment } = addNumber();
    return {
      count,
      state,
      doubleCount,
      increment
    }
  }
}
</script>
<style lang="scss" scoped>

body {
  p{
    line-height: 20px;
  }
  .container {
    @include fontStyle('text');
    width: 250px;
    border-radius: 20px;
    padding: 30px;
    border: 1px solid #333;
    line-height: 2;
    text-align: center;
    margin: 100px auto;
    &_img{
      width: 100%;
      vertical-align: middle;
      margin-bottom: -16px;
    }
  }
  .button{
    cursor: pointer;
    outline: none;
    @include fontStyle('title');
    margin-top: 20px;
    border: 3px double #333;
    border-radius: 5px;
    background-color: map-get($map: $color, $key: 'active');
    transition: 0.2s;
    &:hover{
      transform: skew( 3deg, -3deg);
      color: map-get($map: $color, $key: 'graphicInterfaceOptionLight');
      background-color: map-get($map: $color, $key: 'string');
    }
  }
}
</style>