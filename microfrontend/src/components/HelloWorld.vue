<template>
  <div class="hello">
    <div style="padding:40px;">
      <h1>
        Hello from
        <span style="color:#29558C">Middleware[i</span>
        <span style="color:#AD5353">]nventory</span>
      </h1>
      <p>
        It is good to have you here this is a Simple Page in
        <span class="bg-info">Vue JS</span> and Running on
        <span class="bg-success">Docker Container</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: "HelloWorld",
    props: {
      msg: String
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.class-test {
  background-color: black;
}
</style>