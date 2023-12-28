<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <th class="table-description">Açıklama</th>
          <th class="table-priority">Öncelik</th>
          <th class="table-buttons">İşlem</th>
        </tr>
      </thead>
      <template v-if="!getShowData">
        <tbody>
          <tr
            v-for="(task, index) in getIsSearchs ? getSearchs : getTasks"
            :key="index"
          >
            <td class="table-description">{{ task.description }}</td>
            <td class="table-priority">
              <div class="priority">
              <span :class="getPriorityClass(task.priority)">{{
                task.priority
              }}</span>
              </div>
            </td>
            <td class="table-buttons">
              <div class="buttons">
              <a-popconfirm
                v-if="getTasks.length"
                title="Silmek istediğine emin misin ?"
                @confirm="onDelete(task)"
                okText="Evet"
                cancelText="Hayır"
              >
                <a><img src="~/assets/Trash.svg" /></a>
              </a-popconfirm>
              <a @click="showModal(task)"><img src="~/assets/Edit.svg" /></a>
            </div>
            </td>
          </tr>
        </tbody>
      </template>

    </table>
    <template v-if="getShowData">
            <a-empty :image="simpleImage" description="veri yok"/>
      </template>
    <a-modal v-model:visible="visible" @ok="update">
      <h2 class="modal-title">Görevi Düzenle</h2>
      <div class="container-modal">
        <div class="modal-input-field">
          <div>Görev Adı</div>
          <a-input v-model:value="description" placeholder="Basic usage" />
        </div>
        <div class="modal-select-field">
          <div>Görev Önceliği</div>
          <a-select ref="select" v-model:value="priority" style="width: 473px">
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
import { defineComponent, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTasksStore } from '~/store/tasksManager'
import axios from 'axios'
import { message } from 'ant-design-vue'
import { Empty } from 'ant-design-vue'
export default defineComponent({
  name: 'Table',
  setup() {
    let replacedList = []
    let description = ref('')
    let priority = ref('')

    let updateData = ref()
    let data = ref([])
    const taskStore = useTasksStore()
    const { getTasks, getSearchs, getIsSearchs, getShowData } =
      storeToRefs(taskStore)

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
      updateData.value = task
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
      replacedList = getTasks.value.filter((item) => item.id !== value.id)
      replacedList.length === 0
            ? taskStore.setShowData(true)
            : taskStore.setShowData(false)
      axios
        .delete(`http://localhost:3001/tasks/${value.id}`)
        .then((response) => {
          console.log('Silindi:', response.data)
        
          description.value = ''
          priority.value = ''
        })
        .catch((error) => {
          console.error('İstek hatası:', error)
        })
      console.log('replacedList', replacedList)
      taskStore.deleteTask(replacedList)
    }
    const update = () => {
      console.log('burdayım')
      if (!description.value.trim()) {
        message.error('Görev adı boş olamaz.')
        return
      }
      if (
        description.value.length > 255 ||
        !/^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ\s]+$/.test(description.value)
      ) {
        message.error(
          'Görev adı geçerli değil. 255 karakteri geçmemeli ve sadece alfanümerik karakterler içermelidir.'
        )
        return
      }
      if (!priority.value.trim()) {
        message.error('Görev önceliği boş olamaz.')
        return
      }
      if (description.value && priority.value) {
        onUpdate()
      }
    }
    const onUpdate = () => {
      const replacedList = []
      console.log('descriptionmodal', description)
      console.log('prioritymodal', priority)
      getTasks.value.map((item) => {
        if (item.id === updateData.value.id) {
          replacedList.push({
            description: description.value,
            priority: priority.value,
            id: updateData.value.id,
          })
        } else {
          replacedList.push(item)
        }
      })

      axios
        .put(`http://localhost:3001/tasks/${updateData.value.id}`, {
          description: description.value,
          priority: priority.value,
        })
        .then((response) => {
          console.log('Güncellendi:', response.data)
          description.value = ''
          priority.value = ''
        })
        .catch((error) => {
          console.error('İstek hatası:', error)
        })

      taskStore.updateTask(replacedList)
      visible.value = false
    }

    const getTableDatas = async () => {
      await axios
        .get('http://localhost:3001/tasks')
        .then((response) => {
          data = response.data
          console.log('başarıyla veri yüklendi', data)
          console.log('getshow data', getShowData.value)
          response.data.length === 0
            ? taskStore.setShowData(true)
            : taskStore.setShowData(false)
          taskStore.addTask(response.data)
        })
        .catch((error) => {
          console.error('İstek hatası:', error)
          data = []
        })
    }

    onMounted(() => {
      getTableDatas()
    })

    return {
      data,
      update,
      onDelete,
      onUpdate,
      options,
      description,
      priority,
      visible,
      getTasks,
      showModal,
      getPriorityClass,
      getSearchs,
      getIsSearchs,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      getShowData,
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
  border: 1px solid #f0f0f0;
}
th {
  padding: 16px;
  overflow-wrap: break-word;
  color: #3981f6;
  font-weight: 500;
  text-align: left;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
}
th:first-child {
  border-top-left-radius: 2px;
  border-right: 1px solid #f0f0f0;
}
th:nth-child(2) {
  border-right: 1px solid #f0f0f0;
}
th:last-child {
  border-top-right-radius: 2px;
}
td {
  padding: 16px;
  overflow-wrap: break-word;
  border-bottom: 1px solid #f0f0f0;
}
td:nth-child(1) {
  border-right: 1px solid #f0f0f0;
}
td:nth-child(2) {
  border-right: 1px solid #f0f0f0;
}
td:nth-child() {
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
.ant-modal-footer {
  display: flex;
  justify-content: space-around;
  gap: 16px;
}
.ant-modal-footer .ant-btn {
  width: 212px;
  background-color: #fff6ef;
  color: #ff6f09;
}

.ant-modal-footer .ant-btn-primary {
  width: 212px;
  background-color: #ff6f09;
  color: #fff6ef;
  border-color: #fff;
}
.container-modal {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.table .container-modal .modal-input-field {
  padding: 9px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 212px;
  height: 22px;
}
.modal-select-field {
  width: 504px;
}
.modal-title {
  display: flex;
  justify-content: center;
}
.ant-popover-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.ant-btn-sm {
}
.ant-popover-buttons .ant-btn-primary {
  background-color: #ff6f09 !important;
  border-color: #fff;
}
.priority{
display: flex;
justify-content: center;
}
</style>
