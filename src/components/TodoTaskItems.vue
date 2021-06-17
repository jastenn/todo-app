<template>
    <div class="todo">
        <ul class="todo__list" v-if="taskListData.length">
            <p 
            class="noTask"
            v-if="!taskList.length && taskListData.length">No Task To Show</p>
            
            <TaskItem 
            v-for="task in taskList" :key="task.id"
            :isTaskComplete="task.isComplete"
            :taskId="task.id"
            @updateCompletedTask="updateCompletedTask"
            @removeItem="emitItemToRemove"
            > {{task.task}} 
            </TaskItem>
        </ul>
        <Menu 
        v-if="taskListData.length"
        :itemsLeft="taskLeft"
        @menuOptionChanged="menuOptionChanged"
        @clearCompletedTasks="clearCompletedTasks"/>
    </div>
</template>

<script>
import Menu from './TodoTaskItemsMenu.vue'
import TaskItem from './TodoTaskItem.vue'
export default {
    components: { Menu, TaskItem },
    props: {
        taskList: {
            type: Array,
            required: true
        },
        taskListData: {
            type: Array,
            required: true
        }
    },
    computed: {
        taskLeft() {
            let itemsLeft = this.taskListData.length
            for(let task of this.taskListData) {
                if (task.isComplete) {
                    itemsLeft--
                }
            }
            return itemsLeft
        }
    },
    methods: {
        updateCompletedTask(id) {
            this.$emit('updateCompletedTask', id)
        },
        emitItemToRemove(id) {
            this.$emit('removeItem', id)
        },
        clearCompletedTasks() {
            this.$emit('clearCompletedTasks')
        },
        menuOptionChanged(state) {
            this.$emit('menuOptionChanged', state)
        }
    },
    emits: {
        updateCompletedTask: null,
        removeItem: null,
        clearCompletedTasks: null,
        menuOptionChanged: null,
    }
}
</script>

<style lang="scss">
.todo {
    width: 100%;
    background-color: var(--app-card-bg);
    margin-top: clamp(1rem, 7vw, 1.38rem);
    border-radius: 6px;
    > * + * {
        border-top: 1px solid var(--app-borders);
    }
}
.todo__list {
    > *:not(:last-child) {
        border-bottom: 1px solid var(--app-borders);
    }
}
.noTask {
    font-size: 1rem;
    font-weight: 800;
    font-size: clamp(1rem, 3vw, 1.5rem);
    padding: 2rem 0;
    text-align: center;
}
</style>