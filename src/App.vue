<template>
  <div id="app">
    <top-nav></top-nav>
    <router-view></router-view>
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import TopNav from "./components/TopNav";
import FooterNav from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import chainOpt from "./utils/web3/chainOperation";
import {tokenAddr} from "@/utils/web3/constant";

export default {
  name: 'app',
  components: {
    FooterNav,
    TopNav
  },

  mounted() {
    chainOpt.opt.load(tokenAddr)
  }
}
</script>

<style>
html {
  height: 100%;
  color: #4ac7c9;
}
body {
  height: 100%;
}
#app {
  font-family: 'FZQingKeBenYueSongS-R-GB', PingFang SC, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* container width set 1280px */
.container-fluid {
  padding-right: 0;
  padding-left: 0;
}
.row {
  max-width: 1280px;
  margin: 0 auto !important;
}
</style>
