<template>
    <div class="topbar">
        <div class="search">
          <input type="text" class="input-search" placeholder="search">
        </div>
        <div class="actions">
          <slot></slot>
          <a href="#">
            <i class="fa fa-info"></i>
          </a>
          <a href="#">
            <i class="fa fa-info-circle"></i>
          </a>
        </div>
      </div>
</template>

<script>

export default {
}
</script>

<style>
.topbar {
  display: flex;
  flex-direction: row;
  height: 10%;
}

.search {
  width: 25%;
  padding: 10px;
}

.input-search {
  border-radius: 15px;
  background: #eaecef;
  border: 0px;
  padding: 10px;
  width: 100%;
  /* font-weight: 500; */
  font-size: 16px;
}
.actions {
  padding: 10px;
  margin-left: auto;
  margin-right: 10px;
  vertical-align: middle;
}

.actions a {
  padding: 5px;
}

</style>
