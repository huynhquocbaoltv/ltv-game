<template>
  <div
    class="h-[800px] w-[600px] bg-red-200 flex flex-col justify-center items-center"
  >
    <h1>Test Realtime Db</h1>
    <el-input
      v-model="content"
      type="textarea"
      placeholder="Please input content"
      :input-style="{ height: '100%' }"
    ></el-input>
    <el-button type="primary" @click="handleSubmit" class="mt-4"
      >Submit
    </el-button>
    <div>
      <!-- Hiển thị dữ liệu từ Firebase -->
      <p>Username: {{ firebaseData?.username }}</p>
      <p>Email: {{ firebaseData?.email }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";

defineOptions({
  name: "Game",
});

const content = ref("");

// Khởi tạo Realtime Database
const db = getDatabase();

// Biến lưu trữ dữ liệu từ Firebase
const firebaseData = ref<any>(null);

// Ghi dữ liệu vào Firebase

// Tham chiếu đến người dùng cụ thể
const userRef = dbRef(db, "users/user1");

// Lắng nghe sự thay đổi dữ liệu
onValue(userRef, (snapshot) => {
  const data = snapshot.val();
  firebaseData.value = data;
});

const handleSubmit = () => {};
</script>
