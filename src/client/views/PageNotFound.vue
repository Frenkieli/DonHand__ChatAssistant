
<template>
  <div class="lightbox">
    <img src="../assets/images/404.png" alt="DonHand - 助手(驢驢) 404找不到頁面">
    <p>
      真想不到你能來到這邊呢，但是就到此為止了！接下來就由我""無盡守衛""的404機器人來當你的對手！
    </p>
  </div>
</template>
<style>
  .lightbox{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50%);
    margin: auto;
    width: 95%;
    max-width: 600px;
  }
  .lightbox img{
    width: 100%;
    box-sizing: border-box;
    vertical-align: middle;
    border: 3px solid #111;
    border-radius: 3px;
    padding: 2px;
  }
</style>