<template>
    <input type="checkbox" :value="isCheckboxChecked">
    <div class="custom-checkbox" 
    :class="{checked: isCheckboxChecked}" 
    @click="checkboxHandler">
        <svg v-if="isCheckboxChecked" xmlns="http://www.w3.org/2000/svg" width="11" height="9">
            <path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/>
        </svg>
    </div>
</template>

<script>
export default {
    props: {
        isCheckboxChecked: {
            type: Boolean,
            required: true
        }
    },
    emits: {
        updateCheckboxState: null
    },
    methods: {
        checkboxHandler() {
            this.$emit('updateCheckboxState')
        }
    }
}
</script>

<style lang="scss" scoped>
input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    right: 120%;
}


.custom-checkbox {
width: 1.63rem;
height: 1.63rem;
padding: 1.5px;
position: absolute;
z-index: 3;
background: linear-gradient(to left, var(--app-card-bg), var(--app-card-bg)), 
            linear-gradient(to top left, var(--app-text-completed), var(--app-text-completed));
background-clip: content-box, border-box;
border-radius: 50%;
left: 3%;
top: 50%;
transform: translateY(-50%);
cursor: pointer;

//for centered checkmark
display: flex;
align-items: center;
justify-content: center; 
    
    &.checked {
        background: linear-gradient(to bottom right, var(--primary-blue-light), var(--primary-violet));
        background-clip: border-box;
        &:hover {
            background: linear-gradient(to bottom right, var(--primary-blue-light), var(--primary-violet));
            opacity: .75;
        }
    }
    &:hover {
        background: linear-gradient(to left, var(--app-card-bg), var(--app-card-bg)), 
                    linear-gradient(to bottom right, var(--primary-blue-light), var(--primary-violet));
        background-clip: content-box, border-box;
    }
}

</style>