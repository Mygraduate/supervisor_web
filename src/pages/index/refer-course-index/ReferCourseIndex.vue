<template>
  <div class="ReferCourseIndex-box el-tabs__content">
            <course-arrage-table :table-data-resource="getConfirmTableList" :total="getConfirmTableListTotalElements" :current-page="currentPage" :current-change="tableCurrentChange" :btn-reset-click="tableResetClick" :btn-search-click="tableSearchClick" :btn-delete-click="tableMultiplyDelete" :btn-item-delete-click="tableItemDelete"
            :show-create-by-hand="true"
            :btn-item-create-by-hand-click="openArrargeByHandDialog"
            :show-mutiply-delete-btn="false"
            :show-item-delete-btn="false"
            :show-arrage-people-count="true"
            :show-arrage-people="false"
            :is-reset-all="tableResetAll"></course-arrage-table>

            <create-by-hand-dialog
            :dialog-data="createByHandDialogData"
            :showDialog="showCreateByHandDialog"
            :btn-cancel="closeArrargeByHandDialog"
            :btn-ok="commitCreateArrageByHand"
            :select-group-list="getUserListAll"
            :recommand-select-group-list="getOptimalUserList"
            ></create-by-hand-dialog>
  </div>
</template>

<script src="./ReferCourseIndex.js">
</script>

<!-- Add "scoped" attribute to limit C
SS to this component only -->
<style scope>

</style>
