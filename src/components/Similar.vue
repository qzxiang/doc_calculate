<template>
  <div class="similar-wrapper">
    <h1 class="title">
      相似度检测
    </h1>
    <div v-if="result.data && result.data.length > 0">
      <p class="filename" v-if="result.filename && result.filename.length > 0">检测文档：<span class="name">{{result.filename}}</span></p>
      <el-card class="box-card" v-for="(item,index) in result.data" :key="index">
        <el-row>
          <el-tag type="warning">编号：{{index +1}}</el-tag><el-tag type="success">相似度：{{item.doc_weight.toFixed(2)}}</el-tag>
        </el-row>
        <el-row>
          <el-tag type="warning">对应文档：{{item.doc_name}}</el-tag>
        </el-row>
      </el-card>
    </div>
    <div v-else-if="result.data && result.data.length === 0">
      <p class="filename">无相似文档</p>
    </div>
    <div v-else style="text-align: center;padding-top: 150px;">
      <img :src="img" alt="">
    </div>
  </div>
</template>

<script>
import bus from '../config/event'
import img from '../image/waiting.png'

export default {
  name: 'similar',
  data () {
    return {
      result: {},
      img: img
    }
  },
  mounted() {
    var self = this;
    bus.$on("result",function (data) {
      self.result = data;
    });
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.similar-wrapper{
  padding: 0 20px;
  .title{
    font-size: 20px;
    font-weight: 700;
    color: #dcdfe6;
    margin-bottom: 20px;
  }
  .filename{
    padding-left: 10px;
    font-size: 16px;
    color: #66b1ff;
    margin-bottom: 20px;
    .name{
      font-size: 20px;
      font-weight: 700;
      color: #66caff;
    }
  }
  .box-card{
    margin-bottom: 10px;
    .el-tag{
      margin: 0 10px 10px 0;
    }
  }
}
</style>
