import bookmarksApi from './api/bookmarks'


export default {
    fetchCategories () {
        return bookmarksApi.get('categories/')
        .then(response => {
            return response.data
        })
    },
    fetchBookmarksByCategory (payload) {
        return bookmarksApi.get(`${payload}/`)
        .then(response => {
            return response.data
        })
    },
    deleteBookmark (payload) {
        return bookmarksApi.delete(`bookmark/${payload}`)
        .then(response => {
            return response.data
        })
    },
    postBookmark (payload) {
        return bookmarksApi.post('bookmark/create/', payload)
        .then(response => {
            return response.data
        })
    }
}