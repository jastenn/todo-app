<template>
  <div class="container">
    <Header
    :isDarkTheme="isDarkTheme"
    @toggleTheme="toggleTheme"
    />
    <Input 
    @addNewItem="addItem"
    />
    <TaskItems 
    :taskList="displayedTaskList" 
    :taskListData="taskListData" 
    @updateCompletedTask="updateCompletedTask"
    @removeItem="removeItem"
    @menuOptionChanged="updateDisplayedTasks"
    @clearCompletedTasks="clearCompleted"
    />
  </div>
  <div class="attribution">
    Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
    Coded by <a href="https://github.com/jastenn">Justine Aviso</a>.
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import {storeDataToLs, getDataToLs} from './composites/storage'

import Header from './components/TheHeader.vue'
import Input from './components/TodoInput.vue'
import TaskItems from './components/TodoTaskItems.vue'
import { onMounted, watch } from '@vue/runtime-core'



export default {
  name: 'App',
  components: { Header, Input, TaskItems},

  setup() {
    const isDarkTheme = ref(false)
    const taskListData = ref(null)
    
    const displayedTaskList = ref(null)

    const currentSelectedOption = ref('all')
    
    taskListData.value = getDataToLs()
    displayedTaskList.value = taskListData.value
    if(new Date().getHours() > 19 || new Date().getHours() < 4) isDarkTheme.value = true

    if(isDarkTheme.value === true) {
        app.dataset.theme = 'dark'
    } else {
      app.dataset.theme = 'light'
    }

    const toggleTheme = () => {
      isDarkTheme.value = !isDarkTheme.value
      const app = document.getElementById('app')
      app.classList.add('color-theme-in-transition')
      if(isDarkTheme.value === true) {
        app.dataset.theme = 'dark'
      } else {
        app.dataset.theme = 'light'
      }
      setTimeout(() => {
        app.classList.remove('color-theme-in-transition')
      }, 1500)
    }

    const updateCompletedTask = (id) => {
      taskListData.value.map(task => {
        if(task.id !== id) return task;
        task.isComplete = !task.isComplete
      })

      storeDataToLs(taskListData)
    }
    
    
    watch(taskListData, () => {
      if(currentSelectedOption.value === 'all') displayedTaskList.value = taskListData.value
      if(currentSelectedOption.value === 'active') {
        displayedTaskList.value = taskListData.value.filter(task => {
          return !task.isComplete
        })
      }
      if(currentSelectedOption.value === 'completed') {
        displayedTaskList.value = taskListData.value.filter(task => {
          return task.isComplete
        })
      }
      storeDataToLs(taskListData)
    })

    
    const addItem = (task, isComplete) => {
      const taskItem = {
        task,
        isComplete,
        id: taskListData.value.length + 1
      }
      if(taskListData.length !== 0) {
        taskListData.value = [taskItem, ...taskListData.value]
      } else {
        taskListData.value = [taskItem]
      }
    }

    const removeItem = (id) => {
      taskListData.value = taskListData.value.filter(task => {
        return task.id !== id
      })
    }

    const clearCompleted = () => {
      taskListData.value = taskListData.value.filter(curTask => {
        return !curTask.isComplete
      })
    }

    const updateDisplayedTasks = (newState) => {
      currentSelectedOption.value = newState
      if(currentSelectedOption.value === 'all') displayedTaskList.value = taskListData.value
      if(currentSelectedOption.value === 'active') {
        displayedTaskList.value = taskListData.value.filter(task => {
          return !task.isComplete
        })
      }
      if(currentSelectedOption.value === 'completed') {
        displayedTaskList.value = taskListData.value.filter(task => {
          return task.isComplete
        })
      }
    }
    
    return {
      isDarkTheme,
      taskListData,
      toggleTheme,
      updateCompletedTask,
      removeItem,
      addItem,
      updateDisplayedTasks,
      clearCompleted,
      displayedTaskList,
    }
  }
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root{
  --primary-blue-bright: hsl(220, 98%, 61%);
  --primary-blue-light: hsl(192, 100%, 67%);
  --primary-violet: hsl(280, 87%, 65%);
}

html { font-size: 100% }

#app[data-theme='light']{
  --app-background: hsl(0, 0%, 98%);
  --app-card-bg: #fff;
  --app-text: hsl(235, 19%, 35%); 
  --app-text-completed: hsl(233, 11%, 84%);
  --app-text-menu: hsl(236, 9%, 61%);
  --app-text-menu-active: hsl(235, 19%, 35%);
  --app-borders: hsl(233, 11%, 84%);

  background: var(--app-background) url('./assets/img/bg-desktop-light.jpg') no-repeat center top;
  
  @media (max-width: 35.25em) {
    background: var(--app-background) url('./assets/img/bg-mobile-light.jpg') no-repeat center top;
    background-size: 100%;
  }
  @media (max-width: 23.4375em) {
    background-size: unset;
  }
}

#app[data-theme='dark']{
  
  --app-background: hsl(235, 21%, 11%);
  --app-card-bg: hsl(235, 24%, 19%);
  --app-text: hsl(234, 39%, 85%); 
  --app-text-completed: hsl(237, 14%, 26%);
  --app-text-menu: hsl(233, 14%, 35%);
  --app-text-menu-active: hsl(236, 33%, 92%);
  --app-borders: hsl(233, 14%, 35%);

  background: var(--app-background) url('./assets/img/bg-desktop-dark.jpg') no-repeat center top;
  
  @media (max-width: 35.25em) {
    background: var(--app-background) url('./assets/img/bg-mobile-dark.jpg') no-repeat center top;
    background-size: 100%;
  }
  @media (max-width: 23.4375em) {
    background-size: unset;
  }
}

#app {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--app-text);
  overflow: hidden;

  min-height: 100vh;
  position: relative;
  padding-bottom: 7rem;
  @media (min-width: 87.5rem) {
    background-size: 100%;
  }

  
  
}

.container {
  width: 87%;
  max-width: 33.63rem;
  margin: 0 auto;
}

.attribution {
  position:absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 2%;
  font-size: 11px; 
  text-align: center;
  line-height: 1.5;
  min-width: 11.5rem;
}
.attribution a { color: var(--primary-blue-bright) }

#app.color-theme-in-transition,
#app.color-theme-in-transition *,
#app.color-theme-in-transition *:before,
#app.color-theme-in-transition *:after {
  transition: all 750ms !important;
  transition-delay: 0 !important;
}
</style>
