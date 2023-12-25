import { defineStore } from 'pinia'
import axios from 'axios';

//✨
export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks:[],
  }),
  getters: {
    getTasks: (state) => {
      axios.get('http://localhost:3000/posts')
      .then(response => {
        console.log('başarıyla veri yüklendi', response.data);
        return response.data
      })
      .catch(error => {
     
        console.error('İstek hatası:', error);
      });
   
    },
  },
  actions: {
    addTask(task) {
      this.tasks = [
        ...this.tasks,
        {
          description: task.description,
          priority: task.priority,
          key: this.tasks?.length + 1,
        },
      ]
      console.log('data', this.tasks)
      localStorage.setItem('taskStore', JSON.stringify(this.tasks))
    },
    deleteTask(task) {
      this.tasks = task
      console.log('this.tasks', task)
      localStorage.setItem('taskStore', JSON.stringify(task))
    },
    updateTask(updatedTask) {
      const updatedTaskKey = updatedTask.key
      const updatedTasks = this.tasks.map((task) => {
        if (task.key === updatedTaskKey) {
          return updatedTask
        }
        return task
      })
      this.tasks = updatedTasks
      localStorage.setItem('taskStore', JSON.stringify(updatedTasks))
    },
  },
})
