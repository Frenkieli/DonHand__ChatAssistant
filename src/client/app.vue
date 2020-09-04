<template>
  <headerItem class="main_header"></headerItem>
  <router-view
    class="main_container"
  />
  <footer class="main_footer">footer</footer>
</template>

<script>
import headerItem from './views/headerItem';
export default {
  name: 'homePage',
  components: {
    headerItem
  }
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
  height: 50px;
}
</style>