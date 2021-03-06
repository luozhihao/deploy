<template>
  <div class="btn-group" v-bind:class="{open:show}">
    <button v-el:btn type="button" class="btn btn-default dropdown-toggle" 
      @click="toggleDropdown"
      @blur="show = (search ? show:false)"
    >
      <span class="placeholder" v-show="showPlaceholder">{{placeholder}}</span>
      <span class="content">{{ selectedItems }}</span>
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
      <template v-if="options.length">
        <li v-if="search" class="bs-searchbox">
          <input type="text" placeholder="Search" v-model="searchText" class="form-control" autocomplete="off">
        </li>
        <li v-for="option in options | filterBy searchText " v-bind:id="option.value" style="position:relative">
          <a @mousedown.prevent="select(option.value)" style="cursor:pointer">
            {{ option.label }}
            <span class="glyphicon glyphicon-ok check-mark" v-show="multiple ? value.indexOf(option.value) !== -1 : value === option.value"></span>
          </a>
        </li>
      </template>
      <slot v-else></slot>
      <div class="notify" v-show="showNotify" transition="fadein">最多选择 ({{limit}} 个)</div>
    </ul>
  </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            default() { return [] },
        },
        value: {
            twoWay: true
        },
        placeholder: {
            type: String,
            default: 'Nothing Selected'
        },
        multiple: {
            type: Boolean,
            default: false
        },
        search: { // Allow searching (only works when options are provided)
      	    type: Boolean,
      	    default: false
        },
        limit: {
            type: Number,
            default: 1024
        },
        closeOnSelect: { // only works when multiple==false
            type: Boolean,
            default: true
        }
    },
    ready() {
        if (this.multiple) {
            this.value=[]
        }
    },
    data() {
        return {
            searchText: null,
            show: false,
            showNotify: false
        }
    },
    computed: {
        selectedItems() {
            if (!this.multiple) {
                if (!this.options.length) {
                    for (var c of this.$children) {
                        if (c.value == this.value) {
                            return c.$els.v.innerText
                        }
                    }
                } else {
                    for(var i = 0; i<this.options.length; i++) {
                        if (this.options[i].value === this.value) {
                            return this.options[i].label;
                        }
                    }
                }

                return ""
            } else {
                if (!this.options.length){
        			var r = []
                    for(var c of this.$children){
                        if(this.value.indexOf(c.value)!==-1){
                            r.push(c.$els.v.innerText)
                        }
                    }
                    
                    return r.join(',');

                } else {

    			    // we were given bunch of options, so pluck them out to display
          			var foundItems = [];

                    for (var item of this.options){
                  	    if (this.value.indexOf(item.value) !== -1)
                      	foundItems.push(item.label);
      			    }

                    return foundItems.join(', ');
                }
            }
        },
        showPlaceholder() {
          	return this.multiple ? this.value.length <= 0 : (typeof this.value==='undefined' || this.value=='');
        }
    },
    watch: {
        value(val) {
            let timeout
            if (timeout) clearTimeout(timeout)
                if (val.length > this.limit) {
                    this.showNotify = true
                    this.value.pop()
                    timeout = setTimeout(()=> this.showNotify = false, 1000)
                }
        }
    },
    methods: {
        select(v) {
            if(this.multiple != false){
                var index = this.value.indexOf(v);
                if (index === -1) {
                    this.value.push(v);
                }
                else {
                    this.value.$remove(v)
                }
            } else {
                if (this.value === v) {
                    this.value = ''
                } else {
                    this.value = v
                }

                if (this.closeOnSelect) {
                    this.toggleDropdown();
                }
            }
        },
        toggleDropdown() {
            this.show = !this.show

            return false
        }
    },

    ready () {
        let _this = this
        $(document).click(function(e){
            var target = $(e.target);

            if (target.closest(".btn-group").length === 0) {
                if ($('.btn-group').hasClass('open')) {
                    _this.show = false
                }
            }
        });
    }
}
</script>
<style>
.bs_searchbox {
  padding: 4px 8px;
}
.btn-group .dropdown-menu .notify {
  position: absolute;
  bottom: 5px;
  width: 96%;
  margin: 0 2%;
  min-height: 26px;
  padding: 3px 5px;
  background: #f5f5f5;
  border: 1px solid #e3e3e3;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
   pointer-events: none;
  opacity: .9;
}
</style>