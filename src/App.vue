<template>
  <div id="app" class="content-expand">
    <modal title="New Bookmark" v-show="modalOpened" @close="modalOpened=false">
        <form action="/bookmarks/api/" method="post" @submit.prevent="createBookmark">
          <div>
            <label>URL</label>
            <input name="url" type="url" v-model="url" @change="getLink" class="form-control">
          </div>
          <div>
            <label for>Title</label>
            <input type="text" name="title" id="title" v-model="title" class="form-control">
          </div>
          <div>
            <label for="category">Category</label>
            <select name id @change="selectCategory($event)">
              <option v-for="(ctg, ctgKey) in categories" :value="ctg.id" :key="ctgKey">{{ctg.name}}</option>
            </select>
          </div>
          <div>
            <label for>Description</label>
            <textarea name="description" id="description" rows="1" class="form-control"></textarea>
          </div>
          <div class="form-check">
            <input name="safe" class="form-check-input" type="checkbox">
            <label class="form-check-label">Safe?</label>
          </div>
          <input type="submit" value="add">
        </form>
      </modal>
    
    
          <modal title="New Category" v-show="categoryModalOpened" @close="categoryModalOpened=false">
        <form action>
          <div>
            <label>Category name</label>
            <input name="name" type="text" v-model="url" class="form-control">
          </div>
        </form>
      </modal><navbar>
      <dropdown>
        <template v-slot:dropdown-links>
          <a href="#" class="dropdown-item" @click="openModal">
            <i class="fa fa-bookmark"></i> Bookmark
          </a>
          <a href="#" class="dropdown-item" @click="categoryModalOpened=true">
            <i class="fa fa-folder"></i> Category
          </a>
        </template>
      </dropdown>
    </navbar>
    <div class="main">
      <category-list @category-selected="categorySelected"></category-list>
      <div class="bookmarks-area">
        <bookmark-list :bookmarks="bookmarks" @delete-clicked="deleteBookmark"></bookmark-list>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/bookmarks/Navbar";
import BookmarkList from "./components/bookmarks/BookmarkList";
import CategoryList from "./components/bookmarks/CategoryList";
import Dropdown from "./components/common/dropdown";
import Modal from "./components/common/modal";
import Cookies from "js-cookie";

export default {
  components: {
    Navbar,
    BookmarkList,
    CategoryList,
    Dropdown,
    Modal
  },
  data() {
    return {
      title: "",
      url: "",
      categoryID: "",
      bookmarks: [],
      categories: this.getCategories(),
      modalOpened: true,
      categoryModalOpened: false,
      categories: null,
      selectedCatg: null
    };
  },
  methods: {
    getLink() {
      console.log("from get link", this.url);

      this.axios
        .get("/api/bookmarks/get-page-title/" + this.url)
        .then(response => {
          let pageTitle = response.data.title;
          this.title = pageTitle;
        })
        .catch(error => {
          console.log("error when getting page title", error);
        });
      /*
      // this.axios.get('https://cors-anywhere.herokuapp.com/' + this.url,{
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
      //   }
      // }) 
      this.axios('https://cors-anywhere.herokuapp.com/' + this.url, {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then(response => {
      console.log('document title', response)
    })
    .catch(error => {
      console.log('problem with this site', this.url)
    })
    */
    },
    deleteBookmark(bookmark) {
      let answer = confirm(
        `Want you to delete this bookmark: \n ${bookmark.title}`
      );
      if (answer) {
        let data = {
          id: bookmark.id
        };
        console.log("csrf", Cookies.get("csrftoken"));
        let headers = {
          "X-CSRFToken": Cookies.get("csrftoken")
        };
        this.axios
          .delete(`/api/bookmarks/bookmark/${bookmark.id}`, data, headers)
          .then(response => {
            let deletedBookmark = bookmark;
            this.bookmarks = this.bookmarks.filter(
              bookmark => !(bookmark.id === deletedBookmark.id)
            );
          });
      }
    },
    getCategories() {
      this.axios({
        method: "GET",
        url: "/api/bookmarks/categories/"
      })
        .then(response => {
          this.categories = this.flatCategories(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    flatCategories(array) {
      let result = [];
      array.forEach(catg => {
        result.push({ id: catg.id, name: catg.name });
        if (catg.subCategories && catg.subCategories.length) {
          result = result.concat(this.flatCategories(catg.subCategories));
        }
      });
      return result;
    },
    createBookmark() {
      let url = "/api/bookmarks/bookmark/create/";
      let csrftoken = Cookies.get("csrftoken");
      console.log("csrf-token", csrftoken);
      let headers = {
        "X-CSRFToken": csrftoken
      };
      let data = {
        title: this.title,
        description: "desc",
        url: this.url,
        category: this.categoryID
      };
      // this.axios.defaults.headers.common = {
      //   "X-Requested-With": "XMLHttpRequest",
      //   "X-CSRF-TOKEN": csrftoken
      // };
      this.axios.post(url, data, { headers }).then(response => {
        this.cleanFields();
      });
    },
    openModal() {
      this.modalOpened = true;
    },
    cleanFields() {
      (this.url = ""), (this.title = "");
    },
    loadBookmarks(category) {
      this.axios({
        method: "get",
        url: `/api/bookmarks/${category.name}/`
      })
        .then(response => {
          this.bookmarks = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    categorySelected(catg) {
      this.loadBookmarks(catg);
      let category = this.$store.state.activeCategory;
    },
    selectCategory(event) {
      this.categoryID = event.target.value;
    }
  }
};
</script>

<style>
a {
  color: #495057;
}
.content-expand {
  display: block;
  height: 100vh;
  padding: 10px 10px 0;
  background: #f8f9fa;
}
.main {
  display: flex;
  height: 80%;
  margin-left: -10px;
}
.bookmarks-area {
  /* height: 500px; */
  /* flex: none; */
  overflow-y: scroll;
  border-radius: 25px;
  background: white;
}
.bookmarks-area {
  width: 75%;
}
</style>
