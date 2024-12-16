<script>
import TrainingProgramsTable from '@/components/TrainingProgramsTable.vue';
export default {
  name: 'HomeView',
  components: {
    TrainingProgramsTable
  },
  data() {
    return {
      allTrainingPrograms: [],
      showForm: false,
      showFormForEdit: false,
      selectedTrainingProgram: null,
      newTrainingProgram: {
        name: "",
        description: ""
      },
      updateTrainingProgram: {
        name: "",
        description: ""
      },
    }
  },
  created() {
    this.fetchTrainingPrograms();
  },
  methods: {
    async fetchTrainingPrograms() {
      try {
        const response = await fetch('http://localhost:8080/trainingPrograms');
        if (!response.ok) {
          throw new Error('Error fetching trainingPrograms');
        }
        this.allTrainingPrograms = await response.json();
      } catch (error) {
        console.error('Error fetching trainingPrograms:', error);
      }
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
    toggleFormForEdit() {
      this.showFormForEdit = !this.showFormForEdit;
    },
    async createTrainingProgram() {
      if (!this.newTrainingProgram.name || !this.newTrainingProgram.description) {
        alert('Please fill in all required fields!');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/trainingPrograms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.newTrainingProgram.name,
            description: this.newTrainingProgram.description
          })
        });

        if (!response.ok) {
          throw new Error('Error creating trainingProgram');
        }

        const createdTrainingProgram = await response.json();
        this.allTrainingPrograms.push(createdTrainingProgram);
        
        this.newTrainingProgram = {
          name: "",
          description: ""
        };
        this.showForm = false;
        await this.fetchTrainingPrograms();
      } catch (error) {
        console.error('Error creating trainingProgram:', error);
        alert('Error creating trainingProgram: ' + error.message);
      }
    },

    startEditing(trainingprogram) {
      if (!trainingprogram) {
        console.error('No trainingProgram provided to edit');
        return;
      }
      this.selectedTrainingProgram = trainingprogram;
      this.updateTrainingProgram = {
        name: trainingprogram.name,
        description: trainingprogram.description
      };
      this.showFormForEdit = true;
    },

  async editTrainingProgram() {
    if (!this.selectedTrainingProgram) {
      alert('Error: Trainingprogram not found!');
      return;
    }

    if (!this.updateTrainingProgram.name || !this.updateTrainingProgram.description) {
      alert('Please fill in all fields!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/trainingPrograms/${this.selectedTrainingProgram.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.updateTrainingProgram.name,
          description: this.updateTrainingProgram.description
        })
      });

      if (!response.ok) {
        throw new Error('Error updating trainingProgram');
      }

      await this.fetchTrainingPrograms();
      this.showFormForEdit = false;
      
      this.updateTrainingProgram = {
        name: "",
        description: ""
      };
      this.selectedTrainingProgram = null;
    } catch (error) {
      console.error('Error updating trainingProgram:', error);
      alert('Error updating trainingProgram: ' + error.message);
    }
  },

    async deleteTrainingProgram(TrainingProgramId) {
      try {
        const response = await fetch(`http://localhost:8080/trainingPrograms/${TrainingProgramId}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Error deleting trainingProgram');
        }

        this.allTrainingPrograms = this.allTrainingPrograms.filter(ex => ex.id !== TrainingProgramId);
      } catch (error) {
        console.error('Error deleting trainingProgram:', error);
      }
    }
  }
}
</script>

<template>
  <main>
    <div class="button-container">
      <button @click="toggleForm" class="createButton">
        {{ showForm ? 'Cancel' : 'Add New TrainingProgram' }}
      </button>
    </div>

    <div v-if="showForm" class="form-container">
      <div class="form-content">
        <h3>Add New TrainingProgram</h3>
        <input 
          v-model="newTrainingProgram.name" 
          placeholder="TrainingProgram Name *" 
          required
        >
        <input 
          v-model="newTrainingProgram.description" 
          placeholder="Description *"
          required
        >
        <button @click="createTrainingProgram" class="submitButton">Save</button>
      </div>
    </div>

    <div v-if="showFormForEdit" class="form-container">
    <div class="form-content">
      <h3>Edit TrainingProgram</h3>
      <input 
        v-model="updateTrainingProgram.name" 
        required
      >
      <input 
        v-model="updateTrainingProgram.description" 
        required
      >
      <div class="button-group">
        <button @click="editTrainingProgram" class="submitButton">Update</button>
        <button @click="showFormForEdit = false" class="cancelButton">Cancel</button>
      </div>
    </div>
  </div>

    <TrainingProgramsTable 
      :items="allTrainingPrograms"
      @edit="startEditing"
      @delete="deleteTrainingProgram"
    />
  </main>
</template>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table th,
.table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.table-dark {
  background-color: #343a40;
  color: white;
}

.table-striped tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

.table-striped tbody tr:nth-child(even) {
  background-color: #f1f1f1;
}

button {
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  opacity: 0.9;
}

button:active {
  transform: scale(0.95);
}

button:nth-child(1) {
  background-color: #007bff;
  color: white;
}

button:nth-child(2) {
  background-color: #dc3545;
  color: white;
}

button:nth-child(3) {
  background-color: #28a745;
  color: white;
}
</style>