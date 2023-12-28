import { defineStore } from 'pinia'

//✨
export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks:[],
    search:[],
    isSearched:false,
    showData:true,
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
     getShowData:(state)=>{
      return state.showData
     }
  },
  actions: {
    addTask(task) {
      this.tasks = task.sort((a, b) => {
        const priorityOrder = { 'Yüksek': 0, 'Orta': 1, 'Düşük': 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority] || a.description.localeCompare(b.description);
      });
    },
    deleteTask(task) {
      this.tasks = task;
    },
    updateTask(task) {     
      this.tasks = task.sort((a, b) => {
        const priorityOrder = { 'Yüksek': 0, 'Orta': 1, 'Düşük': 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority] || a.description.localeCompare(b.description);
      });
    },
    setIsSearchTask(task) {
      this.isSearched = task;
    },
    setSearchTask(task) {
      this.search = task;
    },
    setShowData(task){
      this.showData=task
    }
  },
})
