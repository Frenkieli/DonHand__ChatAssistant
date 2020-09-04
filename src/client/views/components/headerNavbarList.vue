<!--
  /**
  * @description header和導覽列內的下拉式選單
  * @author frenkie
  * @date 2020-09-04
  */
-->
<template>
  <ul class="header_navbar_list">
    <li
      v-for="value in navList"
      class="header_navbar_list_item"
      :key="value.name"
    >
      <span class="header_navbar_list_item_span">{{ value.name }}</span>
      <headerNavbarList
        :navList="value.navList"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'headerNavbarList',
  props:{
    navList: {
      type: Array,
      default: []
    }
  }
}
</script>