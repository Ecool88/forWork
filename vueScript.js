Vue.component('v-select', {
    delimiters: ["[[", "]]"],
    name: "v-select",
    props: {
        options: {
            type: Array,
            default() {
                return []
            }
        },
        selected: {
            type: String,
            default: ''
        },
        isExpanded: {
            type: Boolean,
            default: false
        },
        gg: {
            type: String,
            default: 'non'
        }
    },
    data() {
        return {
            areOptionsVisible: false
        }
    },
    methods: {
        selectOption(option) {
            this.$emit('select', option)
            this.areOptionsVisible = false;
        },
        hideSelect() {
            this.areOptionsVisible = false;
        }

    },
    mounted() {
        document.addEventListener('click', this.hideSelect.bind(this), true)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.hideSelect)
    },
    template: `  <div class='v-select'>
        <h2>[[gg]]</h2>
  </div>
`
})


const app = new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        name: 'vm-1',
        test: [
            {gg: '321'},
            {gg: '123'},
            {g: '123'}
        ]
    },
});
