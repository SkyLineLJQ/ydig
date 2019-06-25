<!--
 * @Description: 一对一的聊天室
 * @Author: Jayking
 * @Date: 2019-06-25 15:31:20
 * @LastEditTime: 2019-06-25 18:41:27
 * @LastEditors: Please set LastEditors
 -->

<template>
    <div class="container">
        <el-container class="socket_body">
            <el-aside class="socket_aside">
                <div class="block">
                    <img alt="Vue logo" src="../assets/logo.png" class="avatar">
                </div>
                <label class="userNameLabel">飘零落雨</label>
                <!-- 在线用户列表-->
                <div class="friendsList">
                    <el-image :src="avatarUrl" fit='fill' lazy style="width: 70px; height: 70px;border-radius: 50px">
                    </el-image>
                    <label class="friendsNameLabel">钢铁侠</label>
                    <el-badge is-dot class="item unReadMessage">
                        <el-button class="share-button" icon="el-icon-share" type="primary"></el-button>
                    </el-badge>
                </div>
                <div class="friendsList">
                    <el-image :src="avatarUrl" fit='fill' lazy style="width: 70px; height: 70px;border-radius: 50px">
                    </el-image>
                    <label class="friendsNameLabel">这是一个很长的名字</label>
                    <el-badge is-dot hidden class="item unReadMessage">
                        <el-button class="share-button" icon="el-icon-share" type="primary"></el-button>
                    </el-badge>
                </div>
                <div class="friendsList">
                    <el-image :src="avatarUrl" fit='fill' lazy style="width: 70px; height: 70px;border-radius: 50px">
                    </el-image>
                    <label class="friendsNameLabel">雷神</label>
                    <el-badge is-dot class="item unReadMessage">
                        <el-button class="share-button" icon="el-icon-share" type="primary"></el-button>
                    </el-badge>
                </div>
            </el-aside>
            <el-container>
                <el-header class="socket_head">
                    <label>绿巨人</label>
                </el-header>
                <el-main class="socket_main"></el-main>
                <el-footer class="socket_foot">
                    <el-form :model="dataForm" class="demo-dynamic sendContext">
                        <el-form-item label="">
                            <el-input v-model="dataForm.context" placeholder="说点啥呗">
                                <el-button type="primary" @click="onSubmit" slot="append" id="slot_send">发送</el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "SingleSocket",
        data() {
            return {
                avatarUrl: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                dataForm: {
                    context: ''
                }

            };
        },
        components: {},
        methods: {
            onSubmit() {
                let self = this
            }
        },
    };
</script>

<style scoped lang="scss">
    @import "../assets/css/SingleSocket.scss";
</style>