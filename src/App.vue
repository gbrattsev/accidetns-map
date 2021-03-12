<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
h3 {
  text-align: center;
  margin: 20px 0;
}
header button {
  margin: 0 10px;
}
.ymap-container {
  width: 100%;
  height: 80%;
}
input.suggestions-input {
  position: relative;
  padding: 7px !important;
  width: 100%;
  padding: 5px;
  border: 1px solid #999999;
  border-radius: 4px;
  outline: none;
}
input.suggestions-input:focus {
  border: 2px solid #1976d2;  
}
.suggestions-wrapper {
  position: relative;
}
.suggestions-suggestions {
  position: absolute;
  left: 0;
  top: 0;
  background: #fff !important;
  z-index: 1000;
}
</style>