import { defineStore } from 'pinia'

//✨
export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks:[],
    search:[],
    isSearched:false
  }),
  getters: {
    getTasks: (state) => {
     return state.tasks   
    },
    getSearchs: (state) => {
      return state.search   
     },
     getIsSearchs: (state) => {
      return state.isSearched   
     },
  },
  actions: {
    addTask(task) {
      this.tasks = task.sort((a, b) => a.description.localeCompare(b.description));
    },
    deleteTask(task) {
      this.tasks = task;
    },
    updateTask(task) {     
      this.tasks = task.sort((a, b) => a.description.localeCompare(b.description));
    },
    setIsSearchTask(task) {
      this.isSearched = task;
    },
    setSearchTask(task) {
      this.search = task;
    },
  },
})
