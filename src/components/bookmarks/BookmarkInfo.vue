<template>
    <ul>
        <li><strong>Title: </strong>{{data.title}}</li>
        <li><strong>URL: </strong><a :href="data.url">{{data.url}}</a> <i class="fas fa-external-link-alt"></i></li>
        <li><strong>Bookmarked At: </strong>{{data.bookmarkedAt | formatDate}}</li>
        <li><strong>Last update: </strong>{{data.lastUpdate | formatDate}}</li>
        <li><strong>Favorited: </strong>{{data.favorited}}</li>
        <li><strong>Safe: </strong>{{data.safe}}</li>
        <li><strong>Archived: </strong>{{data.archived}}</li>
        <li v-if='data.description !==null'><strong>Description: </strong>{{data.description}}</li>
    </ul>
</template>

<script>
export default {
    name: "BookmarkInfo",
    props: {
        data: {type: Object, default: ()=> {}}
    },
    filters: {
        formatDate(value) {
            let date = new Date(value)
            return `${date.toDateString()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }
    }
}
</script>

<style scoped>

</style>