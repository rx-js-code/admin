<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="http://127.0.0.1:5000/users/avatar_upload" 
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :data="data"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      data: {id: localStorage.id}
    };
  },
  methods: {
    handleAvatarSuccess() {
        // window.location.reload()    //刷新页面 ==  F5
        // document.getE().src = URL.createObjectURL(file.raw)
    //   this.imageUrl = URL.createObjectURL(file.raw);
    //   console.log()
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less" scoped>
</style>