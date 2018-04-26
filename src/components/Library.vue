<template>
  <div class="library-wrapper">
    <h1 class="title">
      文档列表
    </h1>
    <el-table
      :data="newLibrary"
      v-loading="loading"
      style="width: 100%"
      border>
      <el-table-column
        type="index"
        :index= "indexMethod"
        label="编号"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column
        label="名称"
        align="center"
        show-overflow-tooltip
        min-width="30%">
        <template slot-scope="scope">
          <el-tag>
            <a class="filename" :href="download + scope.row.doc_name">{{scope.row.doc_name}}</a>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="日期"
        align="center"
        show-overflow-tooltip
        min-width="30%">
        <template slot-scope="scope">
          <el-tag type="success">{{scope.row.date}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="类型"
        align="center"
        show-overflow-tooltip
        min-width="20%">
        <template slot-scope="scope">
          <el-tag type="warning">{{scope.row.type}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="大小"
        align="center"
        show-overflow-tooltip
        min-width="20%">
        <template slot-scope="scope">
          <el-tag type="info">{{(scope.row.size/(1024)).toFixed(2)}}KB</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <div class="Pagination" v-show="library.length > 0">
      <div class="pagination-result" v-if="this.start + 1 !== endItem">显示第{{this.start + 1}}至{{endItem}}项结果，共{{library.length}}项</div>
      <div class="pagination-result" v-else>显示第{{this.start + 1}}项结果，共{{library.length}}项</div>
      <div class="pagination-button">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size= "pageSize"
          :page-sizes="[5, 10]"
          layout="sizes, prev, pager, next"
          :total="library.length"
          prev-text="上页"
          next-text="下页">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {Config} from "../config/path";

export default {
  name: 'library',
  data () {
    return {
      library: [],
      loading: false,
      currentPage: 1,
      pageSize: 10,
    }
  },
  created() {
    this.fetchData();
  },
  computed: {
    download() {
      return Config.download;
    },
    start() {
      return (this.currentPage - 1) * this.pageSize;
    },
    end() {
      return this.currentPage * this.pageSize;
    },
    endItem(){
      if(this.end > this.library.length){
        return this.library.length
      }else{
        return this.end
      }
    },
    newLibrary() {
      return this.library.slice(this.start,this.end);
    }
  },
  methods: {
    /*返回页数大小*/
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    /*返回当前页数*/
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    /*计算当前列ID*/
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    fetchData() {
      this.loading = true;
      const data = {
        "page": this.currentPage,
        "size": this.pageSize
      };
      this.$get( Config.listDoc, data )
        .then((response) => {
          if(response.status == 0){
            this.library = response.data;
          }
          this.loading = false;
        }).catch(err => {
        this.loading = false;
        console.log(err);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.library-wrapper{
  position: relative;
  min-height: calc(~ '100vh - 301px');
  padding: 20px 20px 60px 20px;
  background: #f8f6f8;
  .title{
    font-size: 20px;
    font-weight: 700;
    color: #64ab41;
    margin-bottom: 20px;
  }
  .filename{
    color: #408ec0;
  }
  /* 分页 */
  .Pagination{
    position: absolute;
    bottom: 20px;
    right: 60px;
    left: 30px;
    overflow: hidden;
    .pagination-result{
      display:inline-block;
      float: left;
      height: 30px;
      line-height: 30px;
      font-size: 15px;
      color: #5a5e66;
    }
    .pagination-button{
      display:inline-block;
      float: right;
      height: 30px;
    }
  }
}
</style>
