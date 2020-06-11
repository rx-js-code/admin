<template>
  <el-card>
    <input type="file"/>
    <el-table :data="userlist" stripe @selection-change="columnSelectChange">
      <!-- 设置列名 -->
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="账号" width="180" prop="account"></el-table-column>
      <el-table-column label="用户组" width="100" prop="userGroup"></el-table-column>
      <el-table-column label="创建时间" prop="ctime"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>

          <el-popconfirm title="确认删除这条用户数据吗?" @onConfirm="handleDelete(scope.row)">
            <el-button slot="reference" size="mini" type="danger">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="sizelist"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <el-button @click="clickRemoveAll">批量删除</el-button>
  </el-card>
</template>

<script>
import {
  API_USERS_LIST,
  API_DELETE_USER,
  API_BATCH_DELETE_USER
} from "@/api/apis";
// {
//   account: "10";
//   ctime: "2020-06-07T02:46:49.000Z";
//   id: 84;
//   imgUrl: "10";
//   userGroup: "10";
// }

export default {
  data() {
    return {
      userlist: [], //用户列表
      currentPage: 1, //当前显示的页数（默认1）
      pagesize: 5, //每页显示的条数
      sizelist: [5, 10, 15, 20],
      total: 0 //总条数
    };
  },
  created() {
    this.refreshTable(this.currentPage);
  },
  methods: {
    //  发送请求刷新表格数据
    refreshTable(page) {
      API_USERS_LIST(page, this.pagesize).then(res => {
        console.log(res.data);
        this.userlist = res.data.data; //数组
        this.total = res.data.total; //总共有多少条数据
      });
    },
    handleEdit(row) {
      console.log(row);
    },
    handleDelete(row) {
      API_DELETE_USER(row.id).then(() => {
        this.$message({
          message: "用户数据删除成功!",
          type: "success"
        });
        this.refreshTable(this.currentPage);
      });
    },

    // 分页
    // 页数改变触发
    handleSizeChange(newpagesize) {
      this.pagesize = newpagesize;
      this.refreshTable(this.currentPage);
    },

    //点击页码，页码跳转时触发的函数
    handleCurrentChange(page) {
      // 跳转到对应页码去
      this.refreshTable(page);
    },

    //获取所有选中项
    clickRemoveAll() {
      if (!this.ids  ||  this.ids.length == 0) {
        this.$message('请先选中数据');
        return;
      }

      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //发请求，批量删除
        API_BATCH_DELETE_USER(JSON.stringify(this.ids)).then(res => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.refreshTable(this.currentPage);
          }
        });
      });
    },

    //改变
    columnSelectChange(selection) {
      this.ids = selection.map(item => item.id);
      //循环数组，触发回调函数
      // arr.forEach((item, index) => {
      //     console.log(item, index)
      // })

      //循环数组，map会返回一个新数组
      // var newarr = arr.map((item) => {
      //     return item.id
      // })

      //循环数组，数组过滤器
      // var newarr2 = arr.filter((item) => {
      //     return item.age >= 18
      // })
      // console.log(newarr2)

      // selection.forEach((item) => {

      // });

      // [id,id2,id3,id4]?
    }
  }
};
</script>

<style lang="less" scoped>
</style>