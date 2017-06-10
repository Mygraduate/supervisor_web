<template>
  <div class="cc-index">
    <!--头布局-->

    <div class="headerWrapper">
      <div class="header">
        <div class="container">
          <h1>教学督导平台</h1>
          <div class="welcome">
            <div class="welcome-msg">
              <img src="../../assets/iconMeWhite.png" class="welcome-icon">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  欢迎{{getUserName}}，{{getRoleName}}
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-row>
      <el-col :span="4"  style="height:100vh;">
        <el-menu :default-active="selectedMenu" class="el-menu-vertical-demo fs20" style="height:100%;">
          <router-link :to="{name:'indexHome'}" v-if="getRoleId()===2">
            <el-menu-item index="indexHome">
              <img class="el-menu-icon index-icon" src="../../assets/iconIndexBlack.png">主页</el-menu-item>
          </router-link>
          <router-link :to="{name:'progressPage'}" v-if="getRoleId()===2">
            <el-menu-item index="progressPage">
              <img class="el-menu-icon index-icon" src="../../assets/iconProgressBlack.png">进度表</el-menu-item>
          </router-link>
          <router-link :to="{name:'referCoursePage'}" v-if="getRoleId()===2">
            <el-menu-item index="referCoursePage">
              <img class="el-menu-icon index-icon" src="../../assets/iconReferBlack.png">手动排课</el-menu-item>
          </router-link>
          <router-link :to="{name:'feedbackPage'}" v-if="getRoleId()===2">
            <el-menu-item index="feedbackPage">
              <img class="el-menu-icon index-icon" src="../../assets/feedback.png">听课反馈</el-menu-item>
          </router-link>
          <router-link :to="{name:'teacherInfoPage'}" v-if="getRoleId()===2">
            <el-menu-item index="teacherInfoPage">
              <img class="el-menu-icon index-icon" src="../../assets/iconTeachInfoBlack.png">教师信息</el-menu-item>
          </router-link>

          <router-link :to="{name:'userPage'}" v-if="getRoleId()===2||getRoleId()===1">
            <el-menu-item index="userPage">
              <img class="el-menu-icon index-icon" src="../../assets/iconSupervisorBlack.png">用户信息</el-menu-item>
          </router-link>
          <router-link :to="{name:'supervisorPage'}" v-if="getRoleId()===2||getRoleId()===3">
            <el-menu-item index="supervisorPage">
              <img class="el-menu-icon index-icon" src="../../assets/iconSupervisorBlack.png">督导信息</el-menu-item>
          </router-link>
          <router-link :to="{name:'settingPage'}" v-if="getRoleId()===1">
            <el-menu-item index="settingPage">
              <img class="el-menu-icon index-icon" src="../../assets/iconSettingBlack.png">设置</el-menu-item>
          </router-link>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height:100vh;">
        <transition v-bind:name="transitionName" mode="out-in">
          <router-view class="view" style="height:100vh;"></router-view>
        </transition>
      </el-col>

    </el-row>


  </div>
</template>

<script src="./Index.js">

</script>

<style scoped>
.el-dropdown-link {
  color: white !important;
}
</style>
