<template>
  <div class="main-field">
    <div class="main-container">
      <Header />
      <CreateTask :task="task" @handleSetTask="handleSetTaskFNC" />
      <SearchTask />
      <Table :task="task" class="list-table" />
      <Footer />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'IndexPage',
  setup() {
    let task = ref('')
    const handleSetTaskFNC = (values) => {
      task = values
      console.log(task)
    }

    return {
      task,
      handleSetTaskFNC,
    }
  },
}
</script>

<style>
body {
}
.main-field {
  width: 100%;
  display: flex;
  justify-content: center;
}
.main-container {
  display: flex;
  max-width: 1440px;
  flex-direction: column;
  justify-content: center;
  padding: 40px 120px 0 120px;
}
@media only screen and (max-width: 1190px) {
  body {
    flex-direction: column;
  }
}
@media only screen and (max-width: 650px) {
  .main-container {
  padding: 10px 16px 0 16px;
}
}
.list-table {
  margin-top: 40px;
}
</style>
