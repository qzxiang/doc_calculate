<template>
  <div>
    <h1 class="count-title">待检测文本</h1>
    <el-upload
      class="upload"
      :limit= 1
      ref="upload"
      drag
      :action="dragUrl"
      :on-exceed="onExceed"
      :before-upload="beforeUpload"
      :on-remove="onRemove"
      :on-success="onSuccess">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        <p>将文件拖到此处，或<em>点击上传</em></p>
        <p style="margin-top: 10px;font-size:8px;">目前仅支持txt文件</p>
      </div>
    </el-upload>
    <el-form :model="countForm" :rules="rules" ref="countForm">
      <el-form-item prop="text">
        <el-input type="textarea" v-model="countForm.text" placeholder="请输入长度为10-10000的字符"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" @click="submitForm('countForm')" :disabled="countForm.text.length === 0">对比</el-button>
        <el-button @click="resetForm('countForm')" :disabled="uploadList.length === 0 && countForm.text.length === 0">重置</el-button>
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
    onExceed(file, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`);
    },
    onRemove(file, fileList) {
      this.uploadList.pop();
      this.result = {};
      bus.$emit("result", this.result);
    },
    onSuccess(res, file, fileList) {
      this.uploadList = fileList;
      this.countForm.text = "";
      this.result = res;
      bus.$emit("result", this.result);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.uploadList.pop();
          this.$refs["upload"].clearFiles();
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
    resetForm(formName) {
      this.uploadList.pop();
      this.$refs[formName].resetFields();
      this.$refs["upload"].clearFiles();
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
  color: #64ab41;
  margin-bottom: 20px;
}
.upload{
  text-align: center;
  margin: 50px 0 10px 0;
}
.uploadStatus{
  margin-bottom: 20px;
}
</style>
