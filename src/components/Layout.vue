<template>
  <div class="fillcontain">
    <el-container>
      <el-header>
        <div class="title-wrapper">
          <div class="logo">
            <img :src="logo">
          </div>
          <div class="title">
            <span>文档相似度检测</span>
          </div>
        </div>
      </el-header>
      <el-main>
        <el-menu :default-active="activeIndex" class="el-menu"
                 background-color="#476795" text-color="#fff" active-text-color="#5eb2eb" mode="horizontal" router>
          <el-menu-item index="calculate">相似度计算</el-menu-item>
          <el-menu-item index="library">文件库</el-menu-item>
        </el-menu>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <p>由以下机构提供技术支持:<a href="http://www.avlsec.com/" target="_blank">武汉安天信息技术有限责任公司</a></p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import logo from '../image/logo.png'

export default {
  name: 'Layout',
  data () {
    return {
      logo: logo
    }
  },
  computed: {
    activeIndex() {
      return this.$route.path.replace('/', '');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.el-container{
  height: 100%;
}
.el-header{
  background: #193c6d;
  color: #fff;
  .title-wrapper{
    display: flex;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    font-weight: 700;
    vertical-align: middle;
    .logo{
      flex: 0 0 40px;
      img{
        margin-top: 15px;
        width: 30px;
      }
    }
    .title{
      flex: 1;
    }
  }
}
.el-main{
  background-image: url("../image/background.jpg");
  background-size: cover;
  padding-top: 0;
  min-height: calc(~ '100vh - 140px');
}
.el-footer{
  background: #193c6d;
  color: #fff;
  text-align: center;
  height: 60px;
  line-height: 60px;
  a{
    color: #ccc;
  }
}
</style>
