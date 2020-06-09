<template>
  <div class="index">
    <!-- 搜索框 -->
    <van-nav-bar class="index-navbar">
      <van-button plain type="info" slot="title" icon="search">搜索</van-button>
    </van-nav-bar>

    <!-- 推荐频道 -->
    <van-tabs v-model="active">
      <van-tab v-for="(item, index) in channels" :key="index" :title="item.name">
        <!-- 数据列表 -->
        <van-list finished-text="没有更多了">
          <van-cell v-for="item in 20" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getAllChannels } from "@/util/api";
export default {
  data() {
    return {
      active: 0,
      value: "",
      channels: []  
    };
  },
  async created() {
    try {
      let ret = await getAllChannels();
      this.channels = ret.data.data.channels;
    } catch (error) {
      this.$toast.fail("获取频道数据失败！");
    }
  }
};
</script>

<style lang="less">
.index-navbar {
  .van-nav-bar__title {
    height: 80%;
    border-radius: 50px;
    width: 90%;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .van-button {
    background-color: rgba(255, 255, 255, 0.2);
    width: 100%;
    height: 100%;
    &__icon {
      color: white !important;
    }
    &__text {
      font-weight: normal;
      color: white;
    }
  }
}
</style>
