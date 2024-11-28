<script setup>
import ExercisesTable from '../components/ExercisesTable.vue';
// export default {
//   components: {
//     ExercisesTable,
//   },
//   data() {
//     return {
//       allExercises: []
//     }
//   },
//   async created() {
//     this.allExercises = await (await fetch('http://localhost:5173/exercises')).json()
//   }
// }
</script>

<template>
  <main>
    <ExercisesTable :items=allExercises/>
  </main>
</template>
