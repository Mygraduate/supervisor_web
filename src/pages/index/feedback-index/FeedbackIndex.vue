<template>
  <div class="ReferCourseIndex-box el-tabs__content">
            <feedback-table
            :table-data-resource="getEveluateList"
            :total="getEveluateListTotalElements"
            :current-page="currentPage"
            :current-change="tableCurrentChange"
            :btn-reset-click="tableResetClick"
            :btn-search-click="tableSearchClick"
            :btn-item-download-click="tableItemDownload"
            :show-create-by-hand="false"
            :show-course-content="false"
            :show-mutiply-delete-btn="false"
            :show-item-delete-btn="false"
            :show-item-download-btn="true"
            :show-arrage-people-count="true"
            :show-arrage-people="false"
            :show-week-selected="false"
            :show-day-selected="false"
            :show-date-selected="true"
            :show-export-excel-btn="true"
            :is-reset-all="tableResetAll"></feedback-table>
  </div>
</template>

<script src="./FeedbackIndex.js">
</script>

<!-- Add "scoped" attribute to limit C
SS to this component only -->
<style scope>

</style>
