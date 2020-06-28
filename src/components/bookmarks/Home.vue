<template>
  <div class="home">
    <div>
      <h1>VueJS & Django Bookmark Web App</h1>
      <ul>
        <li>This is a bookmark app built using VueJS that consumes API which is built by Django web framework and DRF.</li>
        <li>
          You can use the plus sign
          <i class="fa fa-plus"></i> in the top right of the page to create new bookmark or category.
        </li>
        <li>Or you can browse bookmarks by category using the category list in the left side.</li>
        <li>
          Suggestions and contributions are welcome at
          <a href="https://github.com/oussama-he/vuejs-bookmark-app">
            <i class="fab fa-github"></i>/oussama-he
          </a>.
        </li>
      </ul>
    </div>
    <div class="links">
      <a href="https://github.com/oussama-he">
        <i class="fab fa-github fa-2x"></i>
      </a>
      <a href="https://twitter.com/oussama_he_">
        <i class="fab fa-twitter fa-2x"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style lang="css" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2.5em 2.5em 0 2.5em;
  background-color: #fff;
  height: 100%;
}

.home h1,
.home ul li {
  margin-bottom: 0.7em;
}

.home ul {
  padding-left: 2.5em;
}

.links {
  text-align: right;
}

.links a {
  padding: 0 0.5em 0 0;
}
</style>