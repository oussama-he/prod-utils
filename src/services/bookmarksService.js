import bookmarksApi from './api/bookmarks'


export default {
    fetchCategories () {
        return bookmarksApi.get('category/')
        .then(response => {
            return response.data
        })
    },
    postCategory(payload) {
        return bookmarksApi.post('category/', payload)
    },
    updateCategory(payload) {
        return bookmarksApi.put(`categories/${payload.id}/`, payload)
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
    getBookmarkInfo (payload) {
        return bookmarksApi.get(`bookmark/${payload}`)
        .then(response => {
            return response.data
        })
    },
    postBookmark (payload) {
        return bookmarksApi.post('bookmark/create/', payload)
        .then(response => {
            return response.data
        })
    },
    updateBookmark (bookmark) {
        return bookmarksApi.put(`bookmark/${bookmark.id}/`, bookmark)
    }
}