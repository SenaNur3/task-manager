<template>
  <div>
    <h2>Yeni Görev Oluştur</h2>
    <div class="container">
      <div class="input-field">
        <div>Görev Adı</div>
        <a-input
          v-model:value="description"
          placeholder="Görev Adını Giriniz "
          size="large"
        />
      </div>
      <div class="select-field">
        <div>Görev Önceliği</div>
        <a-select
          ref="select"
          v-model:value="priority"
          style="width: 288px"
          size="large"
        >
          <a-select-option value="Yüksek">Yüksek</a-select-option>
          <a-select-option value="Orta">Orta</a-select-option>
          <a-select-option value="Düşük">Düşük</a-select-option>
        </a-select>
      </div>
      <a-button style="width: 89px" class="create-button" @click="createTask()"
        >Oluştur</a-button
      >
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useTasksStore } from '~/store/tasksManager'
import { message } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import axios from 'axios'
export default defineComponent({
  props: ['task'],
  emits: ['handleSetTask'],
  name: 'CreateTask',
  setup() {
    const taskStore = useTasksStore()
    let description = ref('')
    let priority = ref('')
    const { getTasks } = storeToRefs(taskStore)
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
  
    const createTask = () => {
      if (description.value.trim() === '' || description.value.length > 255) {
        message.error(
          'Görev adı geçerli değil. 255 karakteri geçmemeli ve sadece alfanümerik karakterler içermelidir.'
        )
        return
      }
      if (priority.value.trim() === '' || priority.value.trim() === '') {
        message.error('Görev adı ve öncelik seçimi zorunludur.')
        return
      }
      axios.post('http://localhost:3001/tasks', {
        description: description.value,
        priority: priority.value,
      })
      .then(response => {
        console.log('Başarıyla eklendi:', response.data);

        let setData = getTasks.value ? [...getTasks.value, response.data] : [response.data ]
        taskStore.addTask(setData);

        description.value = '';
        priority.value = '';
      })
      .catch(error => {
     
        console.error('İstek hatası:', error);
      });
    }
  
  
    return {
      description,
      priority,
      options,
      createTask,
    }
  },
})
</script>

<style>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}

.input-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 783px;
}

.select-field {
  width: 288px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.create-button {
  background-color: #ff6f09;
  color: #fff;
  width: 89px;
  height: 40px;
}
.ant-btn:hover,
.ant-btn:focus,
.ant-btn:active,
.ant-btn.active {
  -webkit-text-decoration: none;
  text-decoration: none;
  background: #ff6f09;
  color: #fff;
}
</style>
