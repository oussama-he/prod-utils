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
    archiveBookmark (payload) {
        return bookmarksApi.patch(`bookmark/${payload}/`)
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
    updateBookmark (payload) {
        return bookmarksApi.put(`bookmark/${payload.pk}/`, payload)
    }
}