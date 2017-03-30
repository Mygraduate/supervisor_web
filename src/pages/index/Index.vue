<template>
    <div class="cc-index">
        <!--头布局-->

        <div class="headerWrapper">
            <div class="header">
                <div class="container">
                    <h1>督导听课系统</h1>
                    <div class="welcome">
                        <div class="welcome-msg"> <img src="../../assets/iconMeWhite.png" class="welcome-icon">欢迎你，管理员</div>
                    </div>
                </div>
            </div>
        </div>


        <!--中间布局-->
        <div class="main-cnt">
            <div class="page-compoment page-compoment-p">
                <div class="cc-row">
                    <!--左侧栏-->
                    <el-row class="tac left-row">
                        <el-col v-bind:span="8" class="col">
                            <el-menu default-active="1" class="el-menu-vertical-demo fs20">
                                <router-link to="indexHome">
                                    <el-menu-item index="1"><img class="el-menu-icon index-icon" src="../../assets/iconIndexBlack.png">主页</el-menu-item>
                                </router-link>
                                <router-link to="progressPage">
                                    <el-menu-item index="2"><img class="el-menu-icon index-icon" src="../../assets/iconProgressBlack.png">进度表</el-menu-item>
                                </router-link>
                                <router-link to="referCoursePage">
                                    <el-menu-item index="3"><img class="el-menu-icon index-icon" src="../../assets/iconReferBlack.png"></i>排课参考</el-menu-item>
                                </router-link>
                                <router-link to="autobuildPage">
                                    <el-menu-item index="4"><img class="el-menu-icon index-icon" src="../../assets/iconBuildBlack.png"></i>自动生成</el-menu-item>
                                </router-link>
                                <router-link to="teacherInfoPage">
                                    <el-menu-item index="5"><img class="el-menu-icon index-icon" src="../../assets/iconTeachInfoBlack.png"></i>教师信息</el-menu-item>
                                </router-link>
                                <router-link to="supervisorPage">
                                    <el-menu-item index="6"><img class="el-menu-icon index-icon" src="../../assets/iconSupervisorBlack.png"></i>督导信息</el-menu-item>
                                </router-link>
                                <router-link to="permissionPage">
                                    <el-menu-item index="7"><img class="el-menu-icon index-icon" src="../../assets/iconPermissionBlack.png"></i>权限管理</el-menu-item>
                                </router-link>
                                <router-link to="settingPage">
                                    <el-menu-item index="8"><img class="el-menu-icon index-icon" src="../../assets/iconSettingBlack.png"></i>设置</el-menu-item>
                                </router-link>
                            </el-menu>
                        </el-col>
                    </el-row>
                </div>

                <div class="cc-row-right">
                    <transition v-bind:name="transitionName" mode="out-in">
                        <keep-alive>
                            <router-view class="view"></router-view>
                        </keep-alive>
                    </transition>
                </div>

            </div>
        </div>


        <!--脚布局-->

        <div class="footer">
            <div class="foot-container">
                <div class="footer-main">
                    <p class="footer-main-title">毕业项目设计</p>
                    <!--<div class="footer-main-subtitle">关于我们</div>-->
                    <div class="footer-main-subtitle"> 分工--------- Web前端：洛.曦. </div>
                    <div class="footer-main-subtitle">WebChat前端：J I E </div>
                    <div class="footer-main-subtitle">后端：小孔成像</div>
                    <div class="footer-main-subtitle">测试、文档：Eyes乀</div>
                </div>

                <div class="footer-social">
                    <span></span>
                    <i class="doc-icon-weixin elementdoc"></i>
                </div>
            </div>
        </div>

    </div>

</template>

<script src="./Index.js">

</script>

<style scoped>

</style>
