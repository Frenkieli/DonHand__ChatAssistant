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
      v-for="{name, link, navList} in navList"
      class="header_navbar_list_item"
      :key="name"
    >
      <router-link 
        :to=" '/' + link"
        custom
        v-slot="{ navigate, isActive, isExactActive }"
      >
        <a class="header_navbar_list_item_span" @click="navigate" :class="{ active: isActive, 'exact-active': isExactActive }">{{ name }}</a>
      </router-link>
      <headerNavbarList
        :navList="navList"
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