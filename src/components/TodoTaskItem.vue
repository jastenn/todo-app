<template>
  <li class="todo__task">
      <Checkbox 
      @updateCheckboxState="checkboxHandler"
      :isCheckboxChecked="isTaskComplete"/>
      <p class="task__content" :class="{complete : isTaskComplete}">
          <slot></slot>
      </p>
      <button class="task__remove-todo" @click="removeItem">
            <svg xmlns="http://www.w3.org/2000/svg" >
                <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
            </svg>
      </button>
  </li>
</template>

<script>
import Checkbox from './TodoCheckbox.vue'
export default {
    props: {
        isTaskComplete:{
            type: Boolean,
            required: true
        },
        taskId: {
            type: Number,
            required: true
        }
    },
    components: {Checkbox},
    emits: {
        updateCompletedTask: null,
        removeItem: null
    },
    methods: {
        checkboxHandler() {
            this.$emit('updateCompletedTask', this.taskId)
        },
        removeItem() {
            this.$emit('removeItem', this.taskId)
        }
    }
}
</script>

<style lang="scss" scoped>
.todo__task { 
    list-style: none;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .875rem 1rem .875rem 0;
    min-height: 4rem;
    min-height: clamp(3rem, 9vw, 4rem);
}
.task__remove-todo {
    background-color: unset;
    border: none;
    outline: none;
    cursor: pointer;
    > svg {
        width: 1.125rem;
        width: clamp(.875rem, 5vw, 1.125rem);
        height: 1.125rem;
        height: clamp(.875rem, 5vw, 1.125rem);
    }

    &:active {
        border: none;
        outline: none;
    }
}
.task__content {
    padding-left: 3.25rem;
    font-size: 1rem;
    font-size: clamp(0.875rem, 3vw, 1.125rem);
    &.complete {
        text-decoration: line-through;
        color: var(--app-text-menu);
        opacity: .8;
    }
}
</style>