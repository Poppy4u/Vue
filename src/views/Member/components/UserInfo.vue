<script setup>
import { useUserStore } from "@/stores/user.js";
import { ref } from "vue";
const userStore = useUserStore();

const editing = ref(false);
const newName = ref("");

// 开始编辑用户名
const startEdit = () => {
  editing.value = true;
  newName.value = userStore.userInfo.username;
};
// 保存用户名
const saveEdit = async () => {
  if (newName.value && newName.value !== userStore.userInfo.username) {
    const success = await userStore.updateUserName(newName.value);
    if (success) {
      editing.value = false;
    }
  } else {
    editing.value = false; // 没有变化直接退出编辑
  }
};
</script>

<template>
  <div class="home-overview">
    <!-- 用户信息 -->
    <div class="user-meta">
      <div class="avatar">
        <img :src="userStore.userInfo.user_img" alt="用户头像" />
      </div>
      <h4 v-if="!editing">
        {{ userStore.userInfo.username }}
        <button @click="startEdit" style="margin-left: 10px;">编辑</button>
      </h4>
      <div v-else>
        <input v-model="newName" style="margin-right: 8px;" />
        <button @click="saveEdit">保存</button>
        <button @click="editing = false" style="margin-left: 4px;">取消</button>
      </div>
    </div>
    <!-- 下面可保留你的猜你喜欢等内容 -->
    <div class="item">
      <a href="javascript:;">
        <span class="iconfont icon-hy"></span>
        <p>会员中心</p>
      </a>
      <a href="javascript:;">
        <span class="iconfont icon-aq"></span>
        <p>安全设置</p>
      </a>
      <a href="javascript:;">
        <span class="iconfont icon-dw"></span>
        <p>地址管理</p>
      </a>
    </div>
  </div>
  <!-- 下面是你页面其它内容 -->
  <div class="like-container">
    <div class="home-panel">
      <div class="header">
        <h4>猜你喜欢</h4>
      </div>
      <div class="goods-list">
        <!-- 这里可根据你项目实际情况保留或修改 -->
        <!-- <GoodsItem v-for="good in likeList" :key="good.id" :good="good" /> -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-overview {
  height: 132px;
  background: url(@/assets/images/center-bg.png) no-repeat center / cover;
  display: flex;

  .user-meta {
    flex: 1;
    display: flex;
    align-items: center;

    .avatar {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 60px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    h4 {
      padding-left: 26px;
      font-size: 18px;
      font-weight: normal;
      color: white;
    }
    input {
      padding-left: 26px;
      font-size: 18px;
    }
    button {
      font-size: 14px;
      margin-left: 4px;
    }
  }

  .item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;

    &:first-child {
      border-right: 1px solid #f4f4f4;
    }

    a {
      color: white;
      font-size: 16px;
      text-align: center;

      .iconfont {
        font-size: 32px;
      }

      p {
        line-height: 32px;
      }
    }
  }
}

.like-container {
  margin-top: 20px;
  border-radius: 4px;
  background-color: #fff;
}

.home-panel {
  background-color: #fff;

  .header {
    height: 66px;
    border-bottom: 1px solid #f5f5f5;
    padding: 18px 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    h4 {
      font-size: 22px;
      font-weight: 400;
    }
  }

  .goods-list {
    display: flex;
    justify-content: space-around;
  }
}
</style>