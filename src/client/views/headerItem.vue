<!--
  /**
  * @description header和導覽列
  * @author frenkie
  * @date 2020-09-01
  */
-->
<template>
  <header class="header">
    <h1 class="displaynone">DonHand - 助手(驢驢)</h1>
    <input type="checkbox" name="header_checkbox" class="displaynone" id="header_checkbox" />
    <label for="header_checkbox" class="header_navButton"></label>
    <figure class="header_logo">
      <img class="header_logo_img" src="../assets/images/logo.png" alt="DonHand - 助手(驢驢)的logo" />
      <figcaption class="displaynone">DonHand - 助手(驢驢)，一個擅長傳梗圖的linebot機器人</figcaption>
    </figure>
    <nav class="header_navbar">
      <ul class="header_navbar_list">
        <li class="header_navbar_list_item">
          <span class="header_navbar_list_item_span">介紹</span>
          <ul class="header_navbar_list">
            <li class="header_navbar_list_item">
              <span class="header_navbar_list_item_span">作者</span>
            </li>
            <li class="header_navbar_list_item">
              <span class="header_navbar_list_item_span">理念</span>
            </li>
          </ul>
        </li>
        <li class="header_navbar_list_item">
          <span class="header_navbar_list_item_span">試用</span>
        </li>
        <li class="header_navbar_list_item">
          <span class="header_navbar_list_item_span">學習參考</span>
          <ul class="header_navbar_list">
            <li class="header_navbar_list_item">
              <span class="header_navbar_list_item_span">typescript</span>
              <ul class="header_navbar_list">
                <li class="header_navbar_list_item">
                  <span class="header_navbar_list_item_span">立即前往</span>
                </li>
              </ul>
            </li>
            <li class="header_navbar_list_item">
              <span class="header_navbar_list_item_span">express</span>
            </li>
          </ul>
        </li>
        <li class="header_navbar_list_item">
          <span class="header_navbar_list_item_span">使用條款</span>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.header {
  max-width: 1200px;
  padding: 5px;
  margin: auto;
  position: relative;
  box-sizing: border-box;
  &_logo {
    position: absolute;
    &_img {
      height: 60px;
      vertical-align: middle;
    }
  }
  &_navbar {
    &_list {
      text-align: right;
      &_item {
        position: relative;
        display: inline-block;
        width: 150px;
        margin-left: 20px;
        padding: 5px;
        box-sizing: border-box;
        border-right: 1px solid #f00;
        .header_navbar_list{
          position: absolute;
          right: -2px;
          border-right: 1px solid #0f0;
        }
        &_span {
          height: 60px;
          box-sizing: border-box;
          line-height: 60px;
        }
      }
    }
  }
}
</style>