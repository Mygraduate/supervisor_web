<template>
  <div class="index-box">
    <el-tabs v-model="activeTab" type="border-card" style="height:100%">
      <!--临时表-->
      <el-tab-pane label="临时表" name="tempTable">
        <course-arrage-table :table-data-resource="getConfirmTableList" :total="getConfirmTableListTotalElements" :current-page.sync="tempTableCurrentPage" :current-change="tableCurrentChange" :btn-search-click="tableSearchClick" :btn-item-delete-click="tableItemDelete" :btn-delete-click="tableMultiplyDelete" :btn-reset-click="tableResetClick" :show-change-btn="true" :btn-item-change-status-click="updateItemStatus" :show-auto-create-btn="true"
        :show-statistics-btn="true"
        :show-item-arrage-people="true" :btn-item-arrage-people-click="openArragePeopleDialog"
        :btn-statistics-click="openStatisticsDialog" :btn-auto-create-click="openAutoCreateDialog" :is-reset-all="tempTableResetAll"></course-arrage-table>
      </el-tab-pane>

      <!--确认表-->
      <el-tab-pane label="确认表" name="comfirmTable" style="height:calc(100% - 42px)">
        <course-arrage-table :table-data-resource="getConfirmTableList" :total="getConfirmTableListTotalElements" :current-page="comfirmTableCurrentPage" :current-change="tableCurrentChange" :select-status-list="getFillterConfirmTableSelectStatusList" :btn-reset-click="tableResetClick" :btn-search-click="tableSearchClick" :btn-delete-click="tableMultiplyDelete" :btn-item-delete-click="tableItemDelete"
        :show-statistics-btn="true"
        :btn-statistics-click="openStatisticsDialog"
        :is-reset-all="comfirmTableResetAll" :show-export-excel-btn="true" :show-send-arrage-btn="true" :show-item-arrage-people="true" :btn-item-arrage-people-click="openArragePeopleDialog" :btn-send-arrage-click="sendArrageList" :btn-export-click="exportConfirmTable" :sending-arrage="sendingArrage"></course-arrage-table>
      </el-tab-pane>
    </el-tabs>

    <auto-create-dialog :show-auto-create-dialog="showAutoCreateDialog" :auto-create-mode="autoCreateMode" :btn-cancel="closeAutoCreateDialog" :btn-ok="requestAutoCreateCourse"
    :replace-mode="getAutoCreateReplaceMode"
    :is-rest-all="autoCreatDialogReset"></auto-create-dialog>

    <change-status-dialog :show-change-status-dialog="showChangeStatusDialog" :change-status-dialog-data="changeStatusDialogData" :btn-cancel="closeUpateStatusDialog" :btn-ok="updateItemStatus"
    :btn-ok-loading="false"
    ></change-status-dialog>

    <arrage-people-dialog :show-dialog="showArragePeopleDialog" :btn-cancel="closeArragePeopleDialog" :table-data-resource="getArrageSummaryList" :dialog-data="arragePeopleDialogData" :select-group-list="getUserListAll" :recommand-select-group-list="getOptimalUserList"
    :btn-ok="updateArrageEditGroups"
    :show-supervisor-form="showSupervisorForm"
    :btn-ok-loading="updatingArragePeople"
     class="arrage-pepople-dialog"> </arrage-people-dialog>
  </div>
</template>

<script src="./IndexHome.js">

</script>

<!-- Add "scoped" attribute to limit C
SS to this component only -->
<style scope>

.arrage-pepople-dialog tbody .el-table_1_column_20 .cell {

    padding: 0px  !important;

}
.el-tabs__content {
  overflow-y: auto !important;
  overflow-x: hidden !important;
  height: 75%;
}
</style>
