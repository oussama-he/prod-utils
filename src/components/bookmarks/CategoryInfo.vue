<template>
    <ul style="list-style:none">
        <li>
            <strong>Label: </strong>
            {{ category.label }}
        </li>
        <li>
            <strong>Bookmarks Count: </strong>
            {{ bookmarkCount }}
        </li>
        <li>
            <strong>Sub Categories Count: </strong>
            {{ category.children.length }}
        </li>
        <li>
            <strong>Description: </strong>
            {{ category.description }}
        </li>
    </ul>
</template>

<script>
export default {
    name: "CategoryInfo",
    props: ["category", "bookmarkCount"]
}
</script>