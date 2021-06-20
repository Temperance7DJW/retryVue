<template>
  <el-container>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>1</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">1-1</el-menu-item>
          <el-menu-item index="2-2">2-2</el-menu-item>
        </el-menu-item-group>
    </el-menu>
  </el-container>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>