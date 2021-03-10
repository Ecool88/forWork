Vue.component('v-select', {
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
    <p
        class="title"
        @click="areOptionsVisible = !areOptionsVisible"
    >{{selected}}</p>
    <div
        class="options"
        v-if="areOptionsVisible || isExpanded"
    >
      <p
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
      >
        {{option.name}}
      </p>
    </div>
  </div>
`
})


Vue.component('v-card', {
    name: "v-card",
    props: {
        product_data: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    // methods: {
    //     removeMachine() {
    //         this.$emit('removeMachine', this.product_data)
    //         // console.log(this.product_data)
    //     },
    // },
    template: `      
        <div class="card">
            <div class="card__virtual-machine">
                <div class="virtual-machine">
                    <div class="virtual-machine__desc">
                        <div class="virtual-machine__info">
                            Virtual Machine
                        </div>
                        <div class="virtual-machine__title">
                            {{product_data.name}}
                        </div>
                        <div class="virtual-machine__subtitle">
                            Microsoft Windows Server 20 Lorem ipsum dolor.
                        </div>
                        <div class="virtual-machine__status">
                            Unsresolved<i class="fa fa-question-circle-o" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="virtual-machine__icon">
                        <i class="fa fa-desktop fa-4x"></i>
                    </div>
                </div>
            </div>
            <div class="card__desc">
                <ul class="desc">
                    <li class="desc__item">
                        <div class="item-info">
                            <div class="item-info__icon">
                                <i class="fa fa-microchip fa-2x" aria-hidden="true"></i>
                            </div>
                            <div class="item-info__specification">
                                <div class="item-info__subtitle">
                                    CPUs
                                </div>
                                <div class="item-info__text">
                                    {{product_data.cpu}}
                                </div>
                            </div>
                            <div class="item-info__detail">
                                <div class="item-info__subtitle">
                                    Lease
                                </div>
                                <div class="item-info__text">
                                    Never Expires
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="desc__item">
                        <div class="item-info">
                            <div class="item-info__icon">
                                <i class="fa fa-hdd-o fa-2x" aria-hidden="true"></i>
                            </div>
                            <div class="item-info__specification">
                                <div class="item-info__subtitle">
                                    Memory
                                </div>
                                <div class="item-info__text">
                                    {{product_data.memory}} MB
                                </div>
                            </div>
                            <div class="item-info__detail">
                                <div class="item-info__subtitle">
                                    VMware Tools
                                </div>
                                <div class="item-info__text">
                                    <i class="fa fa-exclamation-circle" style="color: rgb(230, 0, 40)" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="desc__item">
                        <div class="item-info">
                            <div class="item-info__icon">
                                <i class="fa fa-globe fa-2x" aria-hidden="true"></i>
                            </div>
                            <div class="item-info__specification">
                                <div class="item-info__subtitle">
                                    Networks
                                </div>
                                <div class="item-info__text">
                                    -
                                </div>
                            </div>
                            <div class="item-info__detail">
                                <div class="item-info__subtitle">
                                    Snapshot
                                </div>
                                <div class="item-info__text">
                                    -
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="card__control">
                <div class="control">
                    <div class="control__actions">
                        <div 
                        @click="$emit('remove-machine', product_data)"
                        class="actions__title">Actions</div>
                    </div>
                    <div></div>
                    <div class="control__details">
                        <div class="control__title"
                            @click="$emit('show-details', product_data)"
                        >Details</div>
                    </div>
                </div>
            </div>
        </div>
`
})



Vue.component('v-popup', {
    name: "v-popup",
    props: {
        product_data: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {

        }
    },
    methods: {
        closePopup(){
            this.$emit('close-popup')
        }
    },
    template: ` 
 <div 
    @click.self="closePopup"
    class="popup_wrapper">
     <div class="modal" tabindex="-1" role="dialog">
       <div class="v-popup__header">
           <h2 class="title__name">{{product_data.name}}</h2>
           <button
             @click="closePopup"
             type="button" 
             class="header__btn-close" 
             data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></i></button>
       </div>
       <div class="v-popup__content">
          <h4>Доп информация о виртуальных машинах</h4>
       </div>
    </div>
</div>
`
})




const app = new Vue({
    el: '#app',
    data: {
        categories: [
            {name: 'Все', value: 'all'},
            {name: 'Test VM', value: 'vm-1'},
            {name: 'kv-test VM 04', value: 'vm-2'},
            {name: 'VM 01', value: 'vm-3'},
            {name: 'VM 03', value: 'vm-4'},
        ],
        machines: [
            {name: 'kv-test VM 04', cpu: 2, memory: 512, id: 'vm-2'},
            {name: 'Test VM', cpu: 1, memory: 1024, id: 'vm-1'},
            {name: 'VM 01', cpu: 2, memory: 1024, id: 'vm-3'},
            {name: 'VM 03', cpu: 1, memory: 256, id: 'vm-4'},
        ],
        selected: 'Все',
        sortedProducts: [],
        isSortedName: false,
        isClearFilter: false,
        isInfoPopupVisible: false,
        modalData: null,
    },
    methods: {
        sortByCategories (category){
            this.sortedProducts = [];
            let vm = this;
            this.machines.map(item => {
                if (item.name === category.name) {
                    vm.sortedProducts.push(item)
                }
            })
            this.selected =  category.name
        },
        sortedByName(){
            this.isSortedName = !this.isSortedName;
            if (this.isSortedName){
                this.filteredMachines.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                })
            } else {
                this.filteredMachines
            }
        },
        clearFilters(){
            this.isClearFilter = !this.isClearFilter;
            this.isSortedName = false;
            vm = this;
            setTimeout(() => {vm.isClearFilter = false}, 100)
            this.sortedProducts = [];
            this.selected =  this.categories[0].name
        },
        removeMachine (data) {
            this.machines.forEach((item, index,obj) => {
                if (item.id === data.id) {
                    obj.splice(index, 1)
                }
            })
        },
        showDetails(data){
            this.modalData = data
            this.isInfoPopupVisible = true
        },
        closePopup(){
            this.isInfoPopupVisible = false
        }
    },
    computed: {
        filteredMachines() {
            if (this.sortedProducts.length){
                return this.sortedProducts
            } else {
                return this.machines
            }
        }
    }
});
