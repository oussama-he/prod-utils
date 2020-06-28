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
        .then(response => response.data)
    },
    fetchCategory(slug) {
        return bookmarksApi.get(`category/${slug}/`)
        .then(response => response.data)
    },
    updateCategory(payload) {
        return bookmarksApi.put(`category/${payload.slug}/`, payload)
    },
    deleteCategory(payload) {
        return bookmarksApi.delete(`category/${payload.slug}/`)
    },
    fetchBookmarksByCategory (slug) {
        return bookmarksApi.get(`category/${slug}/bookmarks`)
        .then(response => {
            return response.data
        })
    },
    deleteBookmark (payload) {
        return bookmarksApi.delete(`bookmark/${payload.slug}`)
        .then(response => {
            return response.data
        })
    },
    getBookmarkInfo (payload) {
        return bookmarksApi.get(`bookmark/${payload.slug}`)
        .then(response => {
            return response.data
        })
    },
    postBookmark (payload) {
        return bookmarksApi.post('bookmark/', payload)
        .then(response => {
            return response.data
        })
    },
    updateBookmark (bookmark) {
        return bookmarksApi.put(`bookmark/${bookmark.slug}/`, bookmark)
    }
}