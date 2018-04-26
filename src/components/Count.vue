<template>
  <div class="count-wrapper">
    <el-row>
      <el-col :span="12" style="border-right: 1px solid #ccc;">
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
  height: 100%;
  padding: 20px 20px 60px 20px;
  background: #f8f6f8;
  min-height: calc(~ '100vh - 301px');
  .count{
    padding-right: 50px;
  }
}
</style>
