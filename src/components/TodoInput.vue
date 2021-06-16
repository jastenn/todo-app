<template>
  <div class="todo__input">
      <TodoCheckbox @updateCheckboxState="checkboxHandler"
      :isCheckboxChecked="isTaskInputComplete"/>
      <input v-model="taskInputValue"
      @keyup.enter="todoInputHandler"
      class="todo__input-field" 
      type="text" 
      :placeholder="placeholder">
  </div>
</template>

<script>
import TodoCheckbox from './TodoCheckbox.vue'
export default {
    components: {TodoCheckbox},
    props: {
        placeholder: {
            type: String,
            default: 'Create a new todo...' ,
        }
    },
    data() {
        return {
            taskInputValue: '',
            isTaskInputComplete: false,
        }
    },
    methods: {
        checkboxHandler() {
            this.isTaskInputComplete = !this.isTaskInputComplete
        },
        todoInputHandler() {
            if(this.taskInputValue === '') return;
            this.$emit('addNewItem', this.taskInputValue, this.isTaskInputComplete)
            this.taskInputValue = ''
            this.isTaskInputComplete = false
        }
    },
    emits: {
        addNewItem: null,
    }
}
</script>

<style lang="scss">
input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    right: 120%;
}
.todo {
    &__input {
        position: relative;
    }

    &__input-field {
    display: block;
    box-sizing: border-box;
    width: 100%;
    font-size: 1rem;
    font-size: clamp(0.875rem, 3vw, 1.125rem);
    background-color: var(--app-card-bg);
    caret-color: var(--primary-blue-bright);
    height: 4rem;
    height: clamp(3rem, 9vw, 4rem);
    padding-left: 3.25rem;
    
    //resets
    border: 0 ;
    outline: 0;
    color: inherit;
    font-family: inherit;
    border-radius: 5px;
        
        &::placeholder {
            color: var(--app-text-menu);
        }

        &:active {
        border: 0;
        outline: 0;
        }
    }

}

</style>