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
      <headerNavbarList
        :navList="navList"
      />
      <!-- <ul class="header_navbar_list">
        <li class="header_navbar_list_item">
          <span class="header_navbar_list_item_span">基本介紹</span>
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
          <span class="header_navbar_list_item_span">試用功能</span>
        </li>
        <li class="header_navbar_list_item">
          <ul class="header_navbar_list">
            <li class="header_navbar_list_item">
              <span class="header_navbar_list_item_span">typescript</span>
              <ul class="header_navbar_list">
                <li class="header_navbar_list_item">
                  <span class="header_navbar_list_item_span">立即前往</span>
                  <ul class="header_navbar_list">
                    <li class="header_navbar_list_item">
                      <span class="header_navbar_list_item_span">立即前往2</span>
                      <ul class="header_navbar_list">
                        <li class="header_navbar_list_item">
                          <span class="header_navbar_list_item_span">立即前往3</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li class="header_navbar_list_item">
              <span class="header_navbar_list_item_span">express</span>
            </li>
          </ul>
          <span class="header_navbar_list_item_span">學習參考</span>
        </li>
        <li class="header_navbar_list_item">
          <span class="header_navbar_list_item_span">使用條款</span>
        </li>
      </ul> -->
    </nav>
  </header>
</template>

<script>
import headerNavbarList from '@@/views/components/headerNavbarList';
export default {
  components:{
    headerNavbarList
  },
  setup() {
    const navList = [
      {
        name: "基本介紹",
        link: '/',
        navList: [
          {
            name: "作者",
            link: '/#author'
          },
          {
            name: "理念",
            link: '/#idea'
          },
        ],
      },
      {
        name: "試用功能",
        link: '/chatroom'
      },
      {
        name: "學習參考",
        link: '/reference',
        navList: [
          {
            name: "typescript",
            link: '/reference#typescript',
            navList: [
              {
                name: "立即前往",
                link: 'https://www.google.com/',
                navList: [
                  {
                    name: "立即前往2",
                    link: 'https://www.google.com/',
                    navList: [
                      {
                        name: "立即前往3",
                        link: 'https://www.google.com/',
                        navList: [{}],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "express",
            link: '/reference#express',
          },
        ],
      },
      {
        name: "使用條款",
        link: '/TermsOfUse',
      },
    ];

    return {
      navList
    };
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
      height: 40px;
      vertical-align: middle;
    }
  }
  ::v-deep(.header_navbar) {
    &_list {
      text-align: right;
      &_item {
        transition: width 0.3s;
        position: relative;
        display: inline-block;
        width: 100px;
        margin-left: 20px;
        padding: 5px;
        box-sizing: border-box;
        &_span {
          z-index: 1;
          position: relative;
          box-sizing: border-box;
          height: 40px;
          line-height: 40px;
          white-space: nowrap;
        }
        .header_navbar_list {
          transition: 0.3s;
          position: absolute;
          top: 0%;
          right: 0;
          .header_navbar_list {
            transition: 0.3s;
            width: 0;
            &_item {
              display: block;
              width: 0;
              padding: 0;
              margin-left: 0;
              &_span {
                transition: 0.3s;
                display: inline-block;
                width: 0;
                height: 0;
                overflow: hidden;
              }
            }
          }
        }
        &:hover {
          > .header_navbar_list {
            top: 100%;
            > .header_navbar_list_item {
              width: 100px;
              &:hover {
                > .header_navbar_list {
                  top: 18px;
                  right: 100%;
                  width: 100px;
                }
              }
              > .header_navbar_list_item_span {
                height: 40px;
                width: 100%;
                padding: 5px;
                line-height: 30px;
              }
            }
          }
        }
      }
    }
  }
}
</style>