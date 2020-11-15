<template>
  <ul>
    <!-- <router-link 
      v-for = "item in lists" :key="item.id"
      tag="li"
      :to="{
        name: 'detail',
        params: {
          id: item.id
        },
        query: {
          r: 'p/d',
          ...item
        }
      }"
    >
      <h3> {{ item.d_title }} </h3>
      <van-image :src="item.pic" />
    </router-link> -->
     <router-link  tag='li' :to="{
          name: 'detail',
          params: {
            id: item.id
          },
          query: {
            r: 'p/d',
            ...item
          }
        }"
        v-for='item in lists' 
        :key="item.goodsid" 
        style="border-bottom:'1px solid #555"
      >
      <div>
          <van-image :src="item.pic" width='126' height='126'/>
          <div class="pBox">
            <p><span ><img src="https://cmsstatic.ffquan.cn//wap_new/common/images/tm.png?v=2020-09-04" alt="" width='23' height="13"></span>{{item.d_title}}</p>
            <div class='price_'>
              <span>劵后</span><span class='RMB'>￥</span><span class='pri'>{{item.jiage}}</span>
              <div class="label_box"><span style="display:inline;" ui-delete-overflow="" data-len="1" data-center="center" isload="true"><span class="juan"><span>劵</span>{{item.quan_jine}}元</span>        </span></div>
              <div class="salse"><span>已售{{Math.abs(item.percent1)}}万</span><span>评论{{item.comment}}</span></div>
              <div class="shop-name"><span class='names'>{{item.shop_name}}</span><span>进店<van-icon name="arrow" /></span> </div>
            </div>
          </div>
        </div>
      </router-link>
  </ul>
</template>
<script>
export default {
  props: ['lists']
}
</script>

<style lang="scss" scoped>
  .van-image{
    width: 126px;
    height: 126px;
  }
   li{
    padding:10px 0 10px 10px;
    border-bottom: 1px solid #f5f5f5;
    width:100%;
    float:left;
    
     .pBox{
      width: 210px;
      float: right;
      margin-right:10px;
      margin-left:10px;
      p{
        width:200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size:14px;
         span{
        display:inline-block;
        width:23px;
        height:13px;
        background:url('https://cmsstatic.ffquan.cn//wap_new/common/images/tm.png?v=2020-09-04') no-repeat;
        margin-right:8px;
      }
      }
      
     }
  }
.price_{
      margin-top: 30px;
      span{
        font-size: 10px;
      }
      .RMB{
       font-size: 12px;
      font-weight: 500;
      color: #FF2B22;
      margin-left: 1px;
      }
      .pri{
        font-size: 19px;
        font-weight: 500;
        color: #FF2B22;
      }
    }
    .label_box .juan {
      width:46px;
      height: 14px;
      background: linear-gradient(90deg,#ff8873 0,#ff4f4f 100%);
      border-radius: 2px;
      padding: 0 5px 0 1px;
      font-size: 9.5px;
      font-weight: 400;
      color: #fff;
      line-height: 14px;
      display: inline-block;
      position: relative;
      z-index: 1;
      zoom: 1;
      top: 0;
      vertical-align: middle;
      span{
        background: #fff;
        color:#FE3A33;
        margin-right:4px;
      }
    }
    .salse span {
    font-size: 10px;
    font-weight: 400;
    color: #888;
  }
  .salse span:nth-child(2)::before {
    content: '';
    width: 1px;
    background: #888;
    margin: 0 5px;
    display: inline-block;
    height: 8px;
    position: relative;
    z-index: 1;
    zoom: 1;
    top: 1px;
}
 .shop-name span {
    color: #333;
    margin-left: 5px;
    margin-right: 2px;
 
 }
   .shop-name .names {
    color: #888;
    font-size: 10px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    margin:0;
}
</style>
