<script>
import ExercisesTable from '@/components/ExercisesTable.vue';
export default {
  name: 'HomeView',
  components: {
    ExercisesTable
  },
  data() {
    return {
      allExercises: [],
      showForm: false,
      showFormForEdit: false,
      selectedExercise: null,
      newExercise: {
        name: "",
        description: "",
        muscleGroup: ""
      },
      updateExercise: {
        name: "",
        description: "",
        muscleGroup: ""
      },
    }
  },
  created() {
    this.fetchExercises();
  },
  methods: {
    async fetchExercises() {
      try {
        const response = await fetch('http://localhost:8080/exercises');
        if (!response.ok) {
          throw new Error('Error fetching exercises');
        }
        this.allExercises = await response.json();
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
    toggleFormForEdit() {
      this.showFormForEdit = !this.showFormForEdit;
    },
    async createExercise() {
      if (!this.newExercise.name || !this.newExercise.description || !this.newExercise.muscleGroup) {
        alert('Please fill in all required fields!');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/exercises', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.newExercise.name,
            description: this.newExercise.description,
            muscleGroup: this.newExercise.muscleGroup 
          })
        });

        if (!response.ok) {
          throw new Error('Error creating exercise');
        }

        const createdExercise = await response.json();
        this.allExercises.push(createdExercise);
        
        this.newExercise = {
          name: "",
          description: "",
          muscleGroup: ""
        };
        this.showForm = false;
        await this.fetchExercises();
      } catch (error) {
        console.error('Error creating exercise:', error);
        alert('Error creating exercise: ' + error.message);
      }
    },

    startEditing(exercise) {
      if (!exercise) {
        console.error('No exercise provided to edit');
        return;
      }
      this.selectedExercise = exercise;
      this.updateExercise = {
        name: exercise.name,
        description: exercise.description,
        muscleGroup: exercise.muscleGroup
      };
      this.showFormForEdit = true;
    },

  async editExercise() {
    if (!this.selectedExercise) {
      alert('Error: Exercise not found!');
      return;
    }

    if (!this.updateExercise.name || !this.updateExercise.description || !this.updateExercise.muscleGroup) {
      alert('Please fill in all fields!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/exercises/${this.selectedExercise.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.updateExercise.name,
          description: this.updateExercise.description,
          muscleGroup: this.updateExercise.muscleGroup
        })
      });

      if (!response.ok) {
        throw new Error('Error updating exercise');
      }

      await this.fetchExercises();
      this.showFormForEdit = false;
      
      this.updateExercise = {
        name: "",
        description: "",
        muscleGroup: ""
      };
      this.selectedExercise = null;
    } catch (error) {
      console.error('Error updating exercise:', error);
      alert('Error updating exercise: ' + error.message);
    }
  },

    async deleteExercise(ExerciseId) {
      try {
        const response = await fetch(`http://localhost:8080/exercises/${ExerciseId}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Error deleting exercise');
        }

        this.allExercises = this.allExercises.filter(ex => ex.id !== ExerciseId);
      } catch (error) {
        console.error('Error deleting exercise:', error);
      }
    }
  }
}
</script>

<template>
  <main>
    <div class="button-container">
      <button @click="toggleForm" class="createButton">
        {{ showForm ? 'Cancel' : 'Add New Exercise' }}
      </button>
    </div>

    <div v-if="showForm" class="form-container">
      <div class="form-content">
        <h3>Add New Exercise</h3>
        <input 
          v-model="newExercise.name" 
          placeholder="Exercise Name *" 
          required
        >
        <input 
          v-model="newExercise.description" 
          placeholder="Description *"
          required
        >
        <input 
          v-model="newExercise.muscleGroup" 
          placeholder="Muscle Group *" 
          required
        >
        <button @click="createExercise" class="submitButton">Save</button>
      </div>
    </div>

    <div v-if="showFormForEdit" class="form-container">
    <div class="form-content">
      <h3>Edit Exercise</h3>
      <input 
        v-model="updateExercise.name" 
        required
      >
      <input 
        v-model="updateExercise.description" 
        required
      >
      <input 
        v-model="updateExercise.muscleGroup" 
        required
      >
      <div class="button-group">
        <button @click="editExercise" class="submitButton">Update</button>
        <button @click="showFormForEdit = false" class="cancelButton">Cancel</button>
      </div>
    </div>
  </div>

    <ExercisesTable 
      :items="allExercises"
      @edit="startEditing"
      @delete="deleteExercise"
    />
  </main>
</template>

<style scoped>
.form-container {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

body, h3, div, input, button, th, td {
  color: black;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
}

.error-message {
  color: #ff4444;
  font-size: 0.8em;
  margin-top: 5px;
}

input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submitButton {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.cancelButton {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #ff4444;
  color: white;
}

input[required] {
  border-left: 3px solid #ff4444;
}

.createButton {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
}

.editButton {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #2196F3;
  color: white;
}

.deleteButton {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #ff4444;
  color: white;
}

.createButton:hover {
  background-color: #45a049;
}

.submitButton {
  background-color: #2196F3;
}

.submitButton:hover {
  background-color: #1976D2;
}

.button-container {
  margin-bottom: 20px;
}
</style>
