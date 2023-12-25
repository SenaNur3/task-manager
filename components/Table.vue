<template>
  <div class="">
    <table>
      <tr>
        <th class="table-description">Açıklama</th>
        <th class="table-priority">Öncelik</th>
        <th class="table-buttons">İşlem</th>
      </tr>
      <tr v-for="task in getTasks">
        <td class="table-description">{{ task.description }}</td>
        <td class="table-priority">
          <span :class="getPriorityClass(task.priority)">{{
            task.priority
          }}</span>
        </td>
        <td class="table-buttons buttons">
          <a @click="onDelete(task)"><img src="~/assets/Trash.svg" /></a>
          <a @click="showModal(task)"><img src="~/assets/Edit.svg" /></a>
        </td>
      </tr>
    </table>

    <a-modal v-model:visible="visible" title="Basic Modal" @ok="onUpdate">
      <h2>Yeni Görev Oluştur</h2>
      <div class="container">
        <div class="input-field">
          <div>Görev Adı</div>
          <a-input v-model:value="description" placeholder="Basic usage" />
        </div>
        <div class="select-field">
          <div>Görev Önceliği</div>
          <a-select ref="select" v-model:value="priority" style="width: 288px">
            <a-select-option value="Yüksek">Yüksek</a-select-option>
            <a-select-option value="Orta">Orta</a-select-option>
            <a-select-option value="Düşük">Düşük</a-select-option>
          </a-select>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTasksStore } from '~/store/tasksManager'

export default defineComponent({
  name: 'Table',
  setup() {
    let replacedList = []
    let description = ref('')
    let priority = ref('')
    const selectedTask = ref(null)
    let data =ref()
    const taskStore = useTasksStore()
    const { getTasks } = storeToRefs(taskStore)
    

    const getPriorityClass = (priority) => {
      if (priority === 'Yüksek') {
        return 'high-priority'
      } else if (priority === 'Orta') {
        return 'medium-priority'
      } else if (priority === 'Düşük') {
        return 'low-priority'
      } else {
        return ''
      }
    }

    const showModal = (task) => {
      selectedTask.value = task
      description.value = task.description
      priority.value = task.priority
      visible.value = true
    }
    const visible = ref(false)

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
  
    const onDelete = (value) => {
      console.log('value', value)
      console.log('getTasks', getTasks)
      replacedList = getTasks.value.filter((item) => item.key !== value.key)
      axios.post('http://localhost:3000/posts', {
        description: replacedList.value,
        priority: replacedList.value,
      })
      .then(response => {
        console.log('Başarıyla eklendi:', response.data);
        taskStore.addTask(response.data);

        description.value = '';
        priority.value = '';
      })
      .catch(error => {
     
        console.error('İstek hatası:', error);
      });
      console.log('replacedList', replacedList)
      taskStore.deleteTask(replacedList)
    }
    const onUpdate = () => {
      if (selectedTask.value) {
        selectedTask.value.description = description.value
        selectedTask.value.priority = priority.value
      }
      console.log('selectedTask', selectedTask.value)
      taskStore.updateTask(selectedTask.value)
      visible.value = false
    }
    return {
      getTasks,
      onDelete,
      onUpdate,
      options,
      description,
      priority,
      visible,
      showModal,
      getPriorityClass,
      data,
    }
  },
})
</script>
<style>
table {
  width: 100%;
  text-align: left;
  border-radius: 2px 2px 0 0;
  border-collapse: separate;
  border-spacing: 0;
}
th {
  padding: 16px;
  overflow-wrap: break-word;
  color: #000000d9;
  font-weight: 500;
  text-align: left;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
}
th:first-child {
  border-top-left-radius: 2px;
}
th:last-child {
  border-top-right-radius: 2px;
}
td {
  padding: 16px;
  overflow-wrap: break-word;
  border-bottom: 1px solid #f0f0f0;
}

.table-description {
  width: 788px;
}
.table-priority {
  width: 206px;
}
.table-buttons {
  width: 206px;
}
.buttons {
  display: flex;
  justify-content: space-around;
}
.high-priority {
  background-color: #fcdcdc;
  color: #bc1919;
  display: flex;
  width: 100px;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0px 0.83px 1.66px 0px rgba(16, 24, 40, 0.05);
}
.medium-priority {
  background-color: #fffadb;
  color: #998200;
  display: flex;
  width: 100px;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0px 0.83px 1.66px 0px rgba(16, 24, 40, 0.05);
}
.low-priority {
  background-color: #dfeafe;
  color: #20509e;
  display: flex;
  width: 100px;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0px 0.83px 1.66px 0px rgba(16, 24, 40, 0.05);
}
</style>
