<template>
 <div>
  <Header/>
  <CreateTask :task="task" @handleSetTask="handleSetTaskFNC"/>
  <SearchTask/>
  <Table :task="task" class="list-table"/>
 </div>
</template>
</template>

<script>
import { ref} from 'vue';
export default {
  name: 'IndexPage',
  setup(){
    let task = ref('');
    const handleSetTaskFNC=(values)=>{
     task=values
     console.log(task)
    }

    return{
      task,
      handleSetTaskFNC
    }
  }
}

</script>

<style>
 body{
  width: 100%;
  max-width: 1440px;
  display: flex;
  justify-content: center;
  padding: 40px 120px 0 120px;
 }
 @media only screen and (max-width: 1190px) {
body{
  flex-direction: column;
}
 }
 .list-table{
  margin-top: 40px;
 }
</style>