<template>
  <div class="search-task">
    <h2>Görev Listesi</h2>
    <div class="container">
      <a-input
        class="search-input"
        placeholder="Görev adını filtrele"
        v-model="text"
        @change="onChangeDescription"
        style="width: 768px"
        size="large"
      />

      <a-select
        v-model="priority"
        mode="multiple"
        style="width: 385px"
        placeholder="Seçiniz"
        removeIcon=" "
        size="large"
        @change="onChangePriority"
        class="select"
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
    const showPlaceholder = ref(true)
    const onChangeDescription = (value) => {
      console.log('value', value.srcElement.value)
      text = value.srcElement.value
    }
    const onChangePriority = (value) => {
      console.log('value', value)
      priority = value
    }

    const searchResult = () => {
      // Kullanılacak inputları al
      const searchText = getTasks.value
      const searchPriority = priority

      // İki parametre varsa hem metin hem de öncelik filtresi uygula

      if (text.value !== '' && searchPriority.length) {
        let filtered = searchText.filter(
          (task) =>
            typeof text === 'string' &&
            String(task.description).toLowerCase().includes(text.toLowerCase())
        )

        filtered = filtered.filter(
          (task) =>
            Array.isArray(searchPriority) &&
            searchPriority.includes(task.priority)
        )
        filtered.length === 0
          ? taskStore.setShowData(true)
          : taskStore.setShowData(false)
        filteredTasks.value = filtered
      } else {
        // Sadece metin filtresi
        if (text) {
          let filtered = searchText.filter(
            (task) =>
              typeof text === 'string' &&
              String(task.description)
                .toLowerCase()
                .includes(text.toLowerCase())
          )
          filtered.length === 0
            ? taskStore.setShowData(true)
            : taskStore.setShowData(false)
          filteredTasks.value = filtered
        }

        // Sadece öncelik filtresi
        if (searchPriority.length && text.value === '') {
          let filtered = searchText.filter(
            (task) =>
              Array.isArray(searchPriority) &&
              searchPriority.includes(task.priority)
          )
          filtered.length === 0
            ? taskStore.setShowData(true)
            : taskStore.setShowData(false)
          filteredTasks.value = filtered
        }
      }

      taskStore.setSearchTask(filteredTasks.value)

      console.log('searchResult', filteredTasks.value)
    }
    watch(text, (newValue, oldValue) => {
      text = newValue
      searchResult()
      text.length
        ? taskStore.setIsSearchTask(true)
        :(taskStore.setIsSearchTask(false), taskStore.setShowData(false))
    })
    watch(priority, (newValue, oldValue) => {
      priority = newValue
      searchResult()
      priority.length
        ? taskStore.setIsSearchTask(true)
        : (taskStore.setIsSearchTask(false), taskStore.setShowData(false))
    })

    return {
      text,
      priority,
      options,
      onChangeDescription,
      taskStore,
      onChangePriority,
      searchResult,
      showPlaceholder,
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
  margin-top: 8px;
  margin-right: 16px;
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
  margin-top: 8px;
  margin-right: 16px;
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
  margin-top: 8px;
  margin-right: 16px;
}
@media only screen and (max-width: 950px) {
  .search-input {
    width: 100% !important;
    max-width: 600px !important;
  }
  .select {
    width: 100% !important;
    max-width: 600px !important;
  }
}
</style>
