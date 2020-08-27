<template>
  <div class="aaa">
    {{aaa}}
  </div>
</template>

<script>
console.log('好痛苦');
export default {
  setup () {
    let aaa = 'aaa';

    return {
      aaa
    }
  }
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
}
.aaa{
  background-color: #000;
}
</style>