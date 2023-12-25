<template>
  <div class="search-task">
    <h2>Görev Listesi</h2>
    <div class="container">
      <a-input
        class="search-input"
        size="large"
        placeholder="Görev adını filtrele"
        v-model="text"
        @change="onChangeDescription"
      />

      <a-select
        v-model="priority"
        mode="multiple"
        style="width: 409px"
        size="large"
        placeholder="Seçiniz"
        option-label-prop="label"
        removeIcon
        @change="onChangePriority"
      >
        <a-select-option value="Yüksek" label="Yüksek">Yüksek</a-select-option>
        <a-select-option value="Orta" label="Orta">Orta</a-select-option>
        <a-select-option value="Düşük" label="Düşük">Düşük</a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useTasksStore } from '~/store/tasksManager'
import { storeToRefs } from 'pinia'
import descriptions from 'ant-design-vue/lib/descriptions'

export default defineComponent({
  setup() {
    const taskStore = useTasksStore()
    let text = ref('')
    const filteredTasks = ref([])
    const { getTasks } = storeToRefs(taskStore)
    let priority = ref()
    const options = ref([
      {
        value: 'Yüksek',
        label: 'Yüksek',
      },
      {
        value: 'Orta',
        label: 'Orta',
      },
      {
        value: 'Düşük',
        label: 'Düşük',
      },
    ])

    const onChangeDescription = (value) => {
      console.log('value', value.srcElement.value)
      text = value.srcElement.value
    }
    const onChangePriority = (value) => {
      console.log('value', value)
      priority = value
    }
    const searchResult = () => {
      console.log("getTasks.value",getTasks.value)
      const filtered = getTasks.value
        .filter(item=> priority.length ===0 ||  priority.includes(item.priority) )
        .filter(item =>!text || item?.description.includes(text))
  
      filteredTasks.value = filtered;
      console.log("filtered",filtered)
    }
    watch(text, (newValue, oldValue) => {
        text = newValue
      searchResult()
    })
    watch(priority, (newValue, oldValue) => {
      priority = newValue
      searchResult()
    })

    return {
        text,
      priority,
      options,
      onChangeDescription,
      taskStore,
      onChangePriority,
      searchResult,
    }
  },
})
</script>
<style>
.search-task {
  margin-top: 66px;
}
.container {
  display: flex;
  margin-bottom: 28px;
  justify-content: space-between;
  gap: 20px;
}
.search-input {
  width: 768px;
}
.select {
  width: 100%;
  max-width: 409px;
}
.ant-select-lg
  .ant-select-selection--multiple
  .ant-select-selection__rendered
  [title='Yüksek'] {
  display: flex;
  justify-content: center;
  background-color: #fcdcdc;
  align-items: center;
  height: 22px;
  color: #bc1919;
  box-shadow: 0px 0.83px 1.66px 0px rgba(16, 24, 40, 0.05);
  width: 100px;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 137.5% */
  letter-spacing: 0.08px;
  padding: 4px 8px;
}
.ant-select-lg
  .ant-select-selection--multiple
  .ant-select-selection__rendered
  [title='Orta'] {
  display: flex;
  justify-content: center;
  background-color: #fffadb;
  height: 22px;
  align-items: center;
  width: 100px;
  padding: 4px 8px;
  color: #998200;
  box-shadow: 0px 0.83px 1.66px 0px rgba(16, 24, 40, 0.05);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 137.5% */
  letter-spacing: 0.08px;
}

.ant-select-lg
  .ant-select-selection--multiple
  .ant-select-selection__rendered
  [title='Düşük'] {
  display: flex;
  justify-content: center;
  background-color: #dfeafe;
  align-items: center;
  height: 22px;
  padding: 4px 8px;
  width: 100px;
  color: #20509e;
  box-shadow: 0px 0.83px 1.66px 0px rgba(16, 24, 40, 0.05);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 137.5% */
  letter-spacing: 0.08px;
}
</style>
