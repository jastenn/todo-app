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
border-radius: 50%;
left: 3%;
top: 50%;
transform: translateY(-50%);
z-index: 10;
cursor: pointer;

//for centered checkmark
display: flex;
align-items: center;
justify-content: center; 
    > svg {
        position: relative;
        z-index: 1;
    }
    &:hover::before {
        background-image: linear-gradient(to bottom right, var(--primary-blue-light), var(--primary-violet));
    }
    &::before {
        content: '';
        background-image: linear-gradient(to bottom right, var(--app-text-completed), var(--app-text-completed));
        position: absolute;
        border-radius: 10em;
        inset: 0;
        padding: 2px;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
    }
    &.checked:hover {
        opacity: .75;
    }
    
    &.checked::before {
        content: '';
        background-image: linear-gradient(to bottom right, var(--primary-blue-light), var(--primary-violet));
        position: absolute;
        border-radius: 10em;
        inset: 0;
        padding: 2px;
        -webkit-mask: unset;
        -webkit-mask-composite: unset;
        
    }
    
}

</style>