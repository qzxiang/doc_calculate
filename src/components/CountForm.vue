<template>
  <div>
    <h1 class="count-title">待检测文本</h1>
    <div class="radio">
      <el-radio v-model="radio" label="2" @change="resetForm('countForm')">上传文件</el-radio>
      <el-radio v-model="radio" label="1" @change="resetUpload">关键词搜索</el-radio>
    </div>
    <el-upload
      v-show="this.radio === '2'"
      class="upload"
      ref="upload"
      drag
      :show-file-list="false"
      :action="dragUrl"
      :before-upload="beforeUpload"
      :on-progress="onUpload"
      :on-success="onSuccess">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        <p>将文件拖到此处，或<em>点击上传</em></p>
        <p style="margin-top: 10px;font-size:8px;">目前仅支持txt文件</p>
      </div>
    </el-upload>
    <el-row class="uploadStatus" v-if="uploadList.length > 0" :gutter="20">
      <el-col :span="6">
        <el-tag type="warning">{{uploadFile.name}}</el-tag>
      </el-col>
      <el-col :span="4">
        <el-tag type="warning">{{(uploadFile.size/1024).toFixed(2)}}KB</el-tag>
      </el-col>
      <el-col :span="10">
        <el-progress :text-inside="true" :stroke-width="20" :percentage="Math.floor(uploadFile.percentage)"></el-progress>
      </el-col>
      <el-col :span="4">
        <el-button v-if="uploadFile.status == 'success'" type="danger" size="mini" @click="removeDrag(uploadFile)">删除</el-button>
        <el-button v-else type="warning" size="mini" @click="abortDrag(uploadFile)">取消</el-button>
      </el-col>
    </el-row>
    <el-form class="form" :model="countForm" :rules="rules" ref="countForm" v-show="this.radio === '1'">
      <el-form-item prop="text">
        <el-input type="textarea" v-model="countForm.text" placeholder="请输入长度为10-10000的字符"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" @click="submitForm('countForm')" :disabled="countForm.text.length === 0">对比</el-button>
        <el-button @click="resetForm('countForm')" :disabled="countForm.text.length === 0">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import bus from '../config/event'
import { Config } from '../config/path'

export default {
  name: 'countForm',
  data () {
    return {
      uploadList: [],
      radio: '2',
      countForm: {
        text: ''
      },
      result: {},
      rules: {
        text: [
          { min: 10, max: 10000, message: '请输入长度为10-10000个字符', trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    dragUrl() {
      return Config.docFiles
    },
    uploadFile() {
      if(this.uploadList.length > 0){
        return this.uploadList[this.uploadList.length - 1]
      }else{
        return {}
      }
    }
  },
  methods: {
    beforeUpload(file, fileList) {
      const size = file.size/1024/1024 < 10;
      const type = file.type === "text/plain";
      if(!size) {
        this.$message.warning('上传文件大小不能超过10MB!');
      }else if(!type) {
        this.$message.warning('上传文件需为Txt文档!');
      }
      return size && type;
    },
    onUpload(event, file, fileList) {
      this.uploadList = fileList;
    },
    onSuccess(res, file, fileList) {
      this.uploadList = fileList;
      this.result = res;
      bus.$emit("result", this.result);
    },
    removeDrag() {
      this.$refs["upload"].clearFiles();
      this.uploadList = [];
      this.result = {};
      bus.$emit("result", this.result);
    },
    abortDrag(file) {
      this.$refs.upload.abort(file);
      this.$refs["upload"].clearFiles();
      this.uploadList = [];
      this.result = {};
      bus.$emit("result", this.result);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            "text": this.countForm.text,
          };
          this.$post( Config.docText, data )
            .then((response) => {
              if(response.status == 0){
                this.result = response;
                bus.$emit("result", this.result);
              }
            }).catch(err => {
            console.log(err);
          })
        }else{
          return false;
        }
      })
    },
    resetUpload() {
      this.$refs["upload"].clearFiles();
      this.uploadList = [];
      this.result = {};
      bus.$emit("result", this.result);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.result = {};
      bus.$emit("result", this.result);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.count-title{
  font-size: 20px;
  font-weight: 700;
  color: #dcdfe6;
  margin-bottom: 20px;
}
.radio{
  margin-bottom: 20px;
}
.upload{
  text-align: center;
  margin: 50px 0 10px 0;
}
.form{
  margin: 50px 0 10px 0;
}
.uploadStatus{
  margin-top: 50px;
  color: #fff;
  .el-col{
    text-align: center;
    line-height: 28px;
  }
  .el-progress{
    height: 28px;
    line-height: 28px;
    vertical-align: middle;
  }
}
</style>
