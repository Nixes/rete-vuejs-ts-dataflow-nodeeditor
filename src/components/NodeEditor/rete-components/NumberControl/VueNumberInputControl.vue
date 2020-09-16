<template>
    <input type="number" :readonly="readonly" :value="value" @input="change($event)" @dblclick.stop="" @pointerdown.stop="" @pointermove.stop=""/>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
    data() {
        return {
            value: 0,
        }
    },
    methods: {
        change(e: InputEvent) {
            const target = e.target as HTMLInputElement;
            this.value = + target.value;
            this.update();
        },
        update() {
            if (this.ikey)
                this.putData(this.ikey, this.value)
            this.emitter.trigger('process');
        }
    },
    mounted() {
        this.value = this.getData(this.ikey);
    }
});
</script>

<style scoped>

</style>
