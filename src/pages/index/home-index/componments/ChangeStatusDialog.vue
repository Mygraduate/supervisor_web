<template>
  <el-dialog :title="'更改状态'" v-model="showChangeStatusDialog"  :show-close="false" :close-on-click-modal="false"  size="tiny">
    <el-form ref="form" :model="changeStatusDialogData">
      <el-form-item :label-width="formLabelWidth">
        {{changeStatusDialogData.course&&changeStatusDialogData.course.name?changeStatusDialogData.course.name:''}}
      </el-form-item>
      <el-form-item label="当前状态:" :label-width="formLabelWidth">
        <span>{{getCurrentItemStatus}}</span>
      </el-form-item>
      <el-form-item label="新状态:" :label-width="formLabelWidth">
        <el-select v-model="itemNewStatus" placeholder="请选择">
          <el-option v-for="item in getFillterItemStatusList" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="btnCancel(),itemNewStatus=''">取 消</el-button>
      <el-button type="primary" @click="btnOk({itemNewStatus}),itemNewStatus=''" :disabled="itemNewStatus.length<=0">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  let currentPageName = "change-status-dialog";

  export default {
    name: currentPageName,
    data(){
      return{
        formLabelWidth: '120',
        itemNewStatus:'',
        selectStatusList: [
          {
            name: '未确定',
            value: 0
          }, {
            name: '已确定',
            value: 1
          }, {
            name: '待执行',
            value: 2
          }, {
            name: '已执行',
            value: 3
          }

        ]
      }
    },
    props: {
     showChangeStatusDialog:{
       type:Boolean,
       default:false
     },
     changeStatusDialogData:{
       type:Object,
       default:function () {
         return {}
       }
     },
     btnCancel:{
       type:Function,
       default:function(){
       }
     },
     btnOk:{
       type:Function,
       default:function(){
       }
     }

    },
    computed:{
      /**
       * 转换状态
       *
       * @returns
       */
      getCurrentItemStatus: function () {
        let {changeStatusDialogData} = this
        if (changeStatusDialogData.status) {
          if (status === 0) {
            return '未确定'
          } else if (status === 1) {
            return '已确定'
          } else if (status === 2) {
            return '待执行'
          } else if (status === 3) {
            return '已执行'
          }
        } else {
          return '未确定'
        }
      },

    /**
     * 过滤与当前item相同的状态
     *
     * @returns
     */
    getFillterItemStatusList: function () {
      let {selectStatusList, changeStatusDialogData} = this
      return selectStatusList.filter((value) => {
        return value.value !== changeStatusDialogData.status
      })
    },
    },
    watch:{


    },
    methods:{

    }

  }

</script>

<style scoped>

</style>
