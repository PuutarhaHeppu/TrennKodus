<script>
import TrainingProgramsTable from '../components/TrainingProgramsTable.vue';
export default {
    name: "TrainingProgramsView",
    components: {
        TrainingProgramsTable,
    }
}
</script>

<template>
<table class="table table-striped">
    <thead class="table-dark">    
    <tr>
        <th>Name</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items">
        <td>{{ item.name}}</td>
        <td>{{ item.description}}</td>
    </tr>
    </tbody>
 
</table>
</template>

<style scoped>

</style>