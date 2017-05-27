<template>
  <div class="index-box">
    <el-tabs v-model="activeTab" type="border-card">
      <!--临时表-->
      <el-tab-pane label="临时表" name="tempTable">
        <course-arrage-table :table-data-resource="getConfirmTableList" :total="getConfirmTableListTotalElements" :current-page.sync="tempTableCurrentPage" :current-change="tableCurrentChange"  :btn-search-click="tableSearchClick" :btn-item-delete-click="tableItemDelete" :btn-delete-click="tableMultiplyDelete" :btn-reset-click="tableResetClick" :show-change-btn="true" :btn-item-change-status-click="openUpateStatusDialog" :show-auto-create-btn="true" :btn-auto-create-click="openAutoCreateDialog" :is-reset-all="tempTableResetAll"></course-arrage-table>
      </el-tab-pane>

      <!--确认表-->
      <el-tab-pane label="确认表" name="comfirmTable">
        <course-arrage-table :table-data-resource="getConfirmTableList" :total="getConfirmTableListTotalElements" :current-page="comfirmTableCurrentPage" :current-change="tableCurrentChange" :select-status-list="getFillterConfirmTableSelectStatusList" :btn-reset-click="tableResetClick" :btn-search-click="tableSearchClick" :btn-delete-click="tableMultiplyDelete" :btn-item-delete-click="tableItemDelete" :is-reset-all="comfirmTableResetAll"></course-arrage-table>
      </el-tab-pane>
      <el-tab-pane label="发送日志" name="sendLog">
        <!--<div class="block">
                                        <span class="wrapper">
                                          <el-button type="success">重发</el-button>
                                        </span>


                                        <el-table class="tempform-table" v-bind:data="tempTableData" border style="width: 100%">
                                          <el-table-column type="selection" width="55">
                                          </el-table-column>
                                          <el-table-column prop="reciever" label="收件人" width="120">
                                          </el-table-column>
                                          <el-table-column prop="identity" label="身份" width="120">
                                          </el-table-column>
                                          <el-table-column prop="topic" label="主题" show-overflow-tooltip>
                                          </el-table-column>
                                          <el-table-column prop="time" label="时间" width="120">
                                          </el-table-column>
                                          <el-table-column prop="type" label="类型" width="120">
                                          </el-table-column>
                                          <el-table-column prop="status" label="状态" width="120">
                                          </el-table-column>
                                          <el-table-column prop="opertate" label="操作" width="180">
                                            <template scope="scope">
                                              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
                                            </template>
                                          </el-table-column>

                                        </el-table>

                                        <div class="block ta-c mg-top10">
                                          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
                                          </el-pagination>
                                        </div>
                                      </div>-->
      </el-tab-pane>
    </el-tabs>

    <auto-create-dialog :show-auto-create-dialog="showAutoCreateDialog" :auto-create-mode="autoCreateMode" :btn-cancel="closeAutoCreateDialog" :btn-ok="requestAutoCreateCourse" :is-rest-all="autoCreatDialogReset"></auto-create-dialog>

    <change-status-dialog :show-change-status-dialog="showChangeStatusDialog" :change-status-dialog-data="changeStatusDialogData" :btn-cancel="closeUpateStatusDialog" :btn-ok="updateItemStatus"></change-status-dialog>

  </div>
</template>

<script src="./IndexHome.js">

</script>

<!-- Add "scoped" attribute to limit C
SS to this component only -->
<style scope>

</style>
