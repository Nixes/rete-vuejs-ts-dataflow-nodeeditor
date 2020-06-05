<template>
  <div id="rete" v-show="visible" ref="rete"></div>
</template>

<script lang="ts">

import NodeEditor from "./NodeEditor";
import Vue from "vue";

export default Vue.extend( {
  data() {
    return {
      visible: true
    };
  },
  methods: {
    keydown(e) {
      if (e.key === "Control") this.visible = false;
    },
    keyup(e) {
      if (e.key === "Control") this.visible = true;
    }
  },
  mounted() {
    NodeEditor(this.$refs.rete);

    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  }
});
</script>

<style>
  .node .control input, .node .input-control input {
    width: 140px;
  }
  select, input {
    width: 100%;
    border-radius: 30px;
    background-color: white;
    padding: 2px 6px;
    border: 1px solid #999;
    font-size: 110%;
    width: 170px;
  }

</style>
