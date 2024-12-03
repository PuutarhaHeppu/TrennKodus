<script>
export default {
    name: "ExercisesTable",
    props: {
        items: Array
    }
}
</script>

<template>
<table class="table table-striped">
    <thead class="table-dark">    
    <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Musclegroup</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items">
        <td>{{ item.name}}</td>
        <td>{{ item.description}}</td>
        <td>{{ item.muscleGroup}}</td>
    </tr>
    </tbody>
 
</table>
</template>

<style scoped>

</style>