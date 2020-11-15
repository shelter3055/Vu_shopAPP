<template>
  <div class="container" v-swiperight="back">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{required: true, message: '请填写用户名' }]"
      />
      <van-uploader  v-model="fileList" :after-read="afterRead" max-count="1" /> 
      <!-- <van-field
        v-model="phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :error-message = "phoneErrorMsg"
        @blur="checkPhone"
      /> -->
      <van-field
        v-model="phone"
        name="phone"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '手机号不能为空' },{ pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！'}]"
      />

      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import {Toast} from 'vant'
export default {
  data() {
    return {
      username: "",
      password: "",
      phone: "",
      phoneErrorMsg: '',
      fileList: []
    };
  },
  computed: {
    ...mapState('userStore',{
      pic: state => state.pic,
      regRes: state => state.regRes
    })
  },
  methods: {
    checkPhone () {
      if (!this.phone){
        this.phoneErrorMsg = '手机号是必填选项'
      } else {
        const reg = /^1[3456789]\d{9}$/
        if (reg.test(this.phone)) {
          // 验证通过了
          this.phoneErrorMsg = ''
        } else {
          // 验证没有通过
          this.phoneErrorMsg = '手机号的格式不正确'
        }
      }
      console.log('执行')
    },
    ...mapActions('userStore',['getPic','register']),
    afterRead(file) {
      this.getPic(file.file)
    },
    onSubmit(values) {
      this.register(values)
    },
  },
};
</script>
