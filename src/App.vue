<template>
  <div id="app">
    <NodeEditorComponent></NodeEditorComponent>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NodeEditorComponent from "@/components/NodeEditor/NodeEditorComponent.vue";

export default Vue.extend({
  name: 'App',
  components: {
    NodeEditorComponent,
  }
});
</script>

<style>
    html, body, #app {
        height: 100%;
        width: 100%;
    }
</style>
