<template>
  <div class="todo__menu">
      <span class="menu__todo-count">{{`${itemsLeft} ${itemsLeft > 1 ? 'items' : 'item'}`}} left</span>
      
      <form class="menu__options"
      @change="changeHandler"
      >
      
        <label class="menu__option"
        :class="{selected: selectedOption === 'all'}">
          <input 
          type="radio" 
          name="menuOptions" 
          value="all" 
          v-model="selectedOption">
          <p>All</p>
        </label>

          
        <label 
        class="menu__option"
        :class="{selected: selectedOption === 'active'}">
          <input 
          type="radio" 
          name="menuOptions" 
          value="active" 
          v-model="selectedOption">
          <p>Active</p>
        </label>

        <label 
        class="menu__option"
        :class="{selected: selectedOption === 'completed'}">
          <input 
          type="radio" 
          name="menuOptions" 
          value="completed" 
          v-model="selectedOption">
          <p>Completed</p>
        </label>
      </form>
      <button 
      class="menu__clear-completed"
      @click="clearCompletedTasks"
      >Clear Completed</button>
  </div>
</template>

<script>
export default {
  props: {
    itemsLeft: {
      type: Number,
      require: true
    }
  },
  data() {
    return {
      selectedOption: 'all',
    }
  },
  methods: {
    clearCompletedTasks() {
      this.$emit('clearCompletedTasks')
    },
    changeHandler() {
      this.$emit('menuOptionChanged', this.selectedOption)
    }
  },
  emits: {
    clearCompletedTasks: null,
    menuOptionChanged: null
  }
}
</script>

<style lang="scss">
.todo__menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 4rem;
  height: clamp(3rem, 9vw, 4rem);

  font-size: 1rem;
  font-size: clamp(0.75rem, 3vw, .875rem);
  color: var(--app-text-menu);
  position: relative;  
  transition: color 100ms ease-out;
}

.menu__clear-completed {
  font-family: inherit;
  cursor: pointer;
  color: inherit;
  background-color: unset;
  border: none;
  outline: none;
  transition: color 100ms ease-out;

  
  &:hover { color: var(--app-text-menu-active)   }

  &:active {
    border: none;
    outline: none;
    opacity: 1;
    color: var(--primary-blue-bright);
  }
}

.menu__options {
  display: flex;
  width: 30%;
  min-width: 8.625rem;
  justify-content: space-between;
  overflow: hidden;

  @media (max-width: 29.625em) {
    font-size: .875rem;
    font-weight: 800;
    align-items: center;
    justify-content: space-around;
    background-color: var(--app-card-bg);
    height: 4rem;
    height: clamp(3rem, 9vw, 4rem);
    padding: 0 25%;
    width: 100%;
    border-radius: 5px;
    
    position: absolute;
    
    bottom: -130%;
    right: 0;
    left: 0;
  }

  .menu__option {
    display: inline-block;
    padding: 1rem 0;
    color: var(--app-text-menu);
    transition: color 100ms ease-out;
    cursor: pointer;

    & + .menu__option {
      @media (max-width: 29.625em) {
        margin-left: .875rem;
      }
    }
    &:hover { color: var(--app-text-menu-active) }
    &.selected {
    color: var(--primary-blue-bright);
    opacity: 1;
    cursor: default;
    }
  }



  
  .menu__option {
    position: relative;
    

    input[type='radio'] {
      z-index: -1;
      position: absolute;
      opacity: 0;
    }
  }
  
}
</style>