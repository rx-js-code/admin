<template>
    <div>
        <h1>添加账号页面</h1>
        <button @click="clickBtn">添加账号</button>
    </div>
</template>

<script>
    // import { API_ADD_ACCOUNT } from '../../../api/apis'
    import { API_ADD_ACCOUNT } from '@/api/apis'
    // @/跳转到src的根目录
    export default {
        methods: {
            clickBtn(){
                API_ADD_ACCOUNT('test123', '321test', '超级管理员').then((res) => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>