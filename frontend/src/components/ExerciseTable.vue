<script>
export default {
    name: "ExercisesTable",
    props:{
        items: Array
    },
}
</script>

<template>
<table class="table table-striped">
    <thead class="table-dark">
    <tr>
        <th>Name</th>
        <th>Description</th>
        <th>MuscleGroup</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items">
        <td>{{ item.name}}</td>
        <td>{{ item.description}}</td>
        <td>{{ item.muscleGroup}}</td>
    </tr>
    <tr>
        <td>Push-up</td>
        <td>An exercise in wich a person keeping a prone position with the hands palms down under the shoulders the balls of the feet on the ground, and the back straight pushes the body up and lets it down by an alternate straightening and bending of the arms.</td>
        <td>Chest</td>
    </tr>
    </tbody>

</table>
</template>

<style scoped>

</style>