<template>
  <el-dialog :title="'自动排课'" v-model="showAutoCreateDialog" :modal="false" :close-on-click-modal="false" :show-close="false" size="small">
    <el-form ref="autoCreateDialog" :label-position="'right'" label-width="120px" :rules="autoCreateDialogDataRule" :model="autoCreateDialogData">
      <el-form-item label="听课起始:" required>

        <el-col style="width:217px">

          <el-form-item prop="startWeek">
            <el-select v-model="autoCreateDialogData.startWeek" placeholder="起始周">

              <el-option v-for="item in 20" :key="item" :label="item.name" :value="item">
              </el-option>
            </el-select>
          </el-form-item>

        </el-col>

        <el-col style="text-align: center;" :span="1">-</el-col>

        <el-col style="width:217px">
          <el-form-item prop="endWeek">
            <el-select v-model="autoCreateDialogData.endWeek" placeholder="终止周">
              <el-option v-for="item in 20" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>

        </el-col>

      </el-form-item>
      <el-form-item label="听课起始日:" required prop="startDay">
        <el-select v-model="autoCreateDialogData.startDay" placeholder="起始日">
          <el-option v-for="item in selectDayList" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="督导人数:" required>
        <el-col style="width:217px">
          <el-form-item prop="minPeople">
            <el-input v-model.number="autoCreateDialogData.minPeople" placeholder="最少人数" auto-complete="off" style="width:217px"></el-input>
          </el-form-item>
        </el-col>
        <el-col style="text-align: center;" :span="1">-</el-col>
        <el-col style="width:217px">
          <el-form-item prop="maxPeople">
            <el-input placeholder="最多人数" v-model.number="autoCreateDialogData.maxPeople" auto-complete="off" style="width:217px"></el-input>
          </el-form-item>
        </el-col>

      </el-form-item>
      <el-form-item label="周听课次数:" prop="weekListen">
        <el-input v-model.number="autoCreateDialogData.weekListen" placeholder="次数" auto-complete="off" style="width:217px"></el-input>
      </el-form-item>
      <el-form-item label="日听课次数:" prop="dayListen">
        <el-input v-model.number="autoCreateDialogData.dayListen" placeholder="次数" auto-complete="off" style="width:217px"></el-input>
      </el-form-item>
      <el-form-item label="理论课占比例:" prop="apercent">
        <el-slider v-model="autoCreateDialogData.apercent" style="width:300px">
        </el-slider>
        {{autoCreateDialogData.apercent}}
      </el-form-item>
      <el-form-item label="总听课:" prop="total">
        <el-input v-model.number="autoCreateDialogData.total" placeholder="总听课" auto-complete="off" style="width:217px"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="btnCancel(),resetAll()">取 消</el-button>
      <el-button type="primary" @click="btnOk(autoCreateDialogData)" :disabled="getBtnOkDisabled">{{autoCreateMode==='create'?'确 定':'重新排课'}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
let currentPageName = "auto-create-dialog";

export default {
  name: currentPageName,
  data() {
    return {
      autoCreateDialogDataRule: {
        dayListen: [
          { required: true, message: '此参数不能为空' },
          {
            type: 'number',
            message: '日听课次数必须为数字值'
          }
        ],
        maxPeople: [
          { required: true, message: '此参数不能为空' },
          {
            type: 'number',
            message: '督导人数必须为数字值'
          }
        ],
        minPeople: [
          { required: true, message: '此参数不能为空' },

          {
            type: 'number',
            message: '督导人数必须为数字值'
          }
        ],
        weekListen: [
          { required: true, message: '此参数不能为空' },

          {
            type: 'number',
            message: '周听课次数必须为数字值'
          }
        ],
        total: [
          { required: true, message: '此参数不能为空' },

          {
            type: 'number',
            message: '总听课安排必须为数字值'
          }
        ],
        apercent: [
          { required: true, message: '此参数不能为空' },
          {
            type: 'number',
            message: '日理论课占比例必须为数字值'
          }
        ],

        endWeek: [
          { required: true, message: '此参数不能为空' },
        ],
        startDay: [
          { required: true, message: '此参数不能为空' },
        ],
        startWeek: [
          { required: true, message: '此参数不能为空' },
        ],
      },
      autoCreateDialogData: {
        apercent: 0,
        dayListen: '',
        endWeek: '',
        maxPeople: '',
        minPeople: '',
        startDay: '',
        startWeek: '',
        total: '',
        weekListen: '',
      },
      selectDayList: [
        {
          name: '星期一',
          value: 1
        }, {
          name: '星期二',
          value: 2
        }, {
          name: '星期三',
          value: 3
        }, {
          name: '星期四',
          value: 4
        }, {
          name: '星期五',
          value: 5
        }, {
          name: '星期六',
          value: 6
        }, {
          name: '星期天',
          value: 7
        }
      ],
      constValue: false
    }
  },
  props: {
    showAutoCreateDialog: {
      type: Boolean,
      default: false
    },
    autoCreateMode: {
      type: String,
      default: 'create'
    },
    btnCancel: {
      type: Function,
      default: function () {
      }
    },
    btnOk: {
      type: Function,
      default: function () {
      }
    },
    isRestAll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getBtnOkDisabled: function () {
      let { apercent,
        dayListen,
        endWeek,
        maxPeople,
        minPeople,
        startDay,
        startWeek,
        total,
        weekListen } = this.autoCreateDialogData
      return !(apercent > 0 &&
        dayListen > 0 &&
        endWeek > 0 &&
        maxPeople > 0 &&
        minPeople > 0 &&
        startDay > 0 &&
        startWeek > 0 &&
        weekListen > 0 && total > 0)
    }

  },
  watch: {
    isRestAll: function (value) {
      // alert(value)
      let that = this
      if (value !== that.constValue) {
        this.resetAll()
        that.constValue = value
      }
    }


  },
  methods: {
    resetAll: function () {
      let that = this
      that.autoCreateDialogData = {
        apercent: 0,
        dayListen: '',
        endWeek: '',
        maxPeople: '',
        minPeople: '',
        startDay: '',
        startWeek: '',
        total: '',
        weekListen: ''
      }
      that.$refs.autoCreateDialog.resetFields()
    }
  }

}

</script>

<style scoped>

</style>
