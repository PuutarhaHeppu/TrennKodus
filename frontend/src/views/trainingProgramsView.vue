<script>
import TrainingProgramsTable from '../components/TrainingProgramsTable.vue';
export default {
    name: "trainingProgramsView",
    components: {
        TrainingProgramsTable,
    },
    data() {
        return {
            allTrainingPrograms: []
        }
    },
    async created() {
        this.allTrainingPrograms = await (await fetch('http://localhost:8080/trainingPrograms')).json()
    }
}
</script>
<template>
    <main>
        <TrainingProgramsTable :items=allTrainingPrograms />
    </main>
</template>