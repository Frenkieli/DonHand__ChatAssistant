<template>
  <div class="container">
    hello {{state.message}}
    <div>count: {{count}}</div>
    <div>doubleCount: {{doubleCount}}</div>
    <button @click="increment" class="button">increment</button>
  </div>
  <!-- asd -->
</template>

<script>
import { computed, ref, reactive } from 'vue';
export default {
  setup () {  
    // asdfasffasdf
    const count = ref(0)

    const state = reactive({
      message: 'Vue3'
    })

    const doubleCount = computed(() => count.value * 2)

    const increment = e => {
      console.log(e)
      count.value += 10
      state.message = 'Vue3. GoGoGo!'
    }

    return {
      count,
      state,
      doubleCount,
      increment
    }
  }
}
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;700&display=swap');
  body{
    font-family: 'Noto Sans TC', sans-serif;
  }
</style>
<style lang="scss" scoped>

body {
  .container {
    @include fontStyle('text');
    width: 250px;
    border-radius: 20px;
    padding: 30px;
    border: 1px solid #333;
    line-height: 2;
    text-align: center;
    margin: 100px auto;
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