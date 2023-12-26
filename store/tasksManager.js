import { defineStore } from 'pinia'

//✨
export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks:[],
  }),
  getters: {
    getTasks: (state) => {
     return state.tasks   
    },
  },
  actions: {
    addTask(task) {
      this.tasks = task;
    },
    deleteTask(task) {
      this.tasks = task;
    },
    updateTask(task) {     
      this.tasks = task
    },
  },
})
