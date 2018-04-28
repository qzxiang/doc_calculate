<template>
  <div class="count-wrapper">
    <div class="line"></div>
    <el-row>
      <el-col :span="12">
        <div class="count">
          <CountForm/>
        </div>
      </el-col>
      <el-col :span="12">
        <Similar/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountForm from './CountForm'
import Similar from './Similar'

export default {
  name: 'count',
  data () {
    return {
      result: []
    }
  },
  components: {
    CountForm,
    Similar
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.count-wrapper{
  position: relative;
  height: 100%;
  padding: 20px 20px 60px 20px;
  background: #a4c7ea52;
  min-height: calc(~ '100vh - 281px');
  .count{
    padding-right: 20px;
  }
  .line{
    position: absolute;
    top: 0;
    left: 50%;
    bottom: 0;
    height: 100%;
    width: 1px;
    transform: translate(-50%,0);
    border-left: 1px dashed #ccc;
  }
}
</style>
