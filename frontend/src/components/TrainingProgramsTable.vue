<template>
    <div class="table-container">
      <table v-if="items && items.length">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trainingprogram in items" :key="trainingprogram.id">
            <td>{{ trainingprogram.name }}</td>
            <td>{{ trainingprogram.description }}</td>
            <td class="actions">
                <button @click="$emit('edit', trainingprogram)" class="editButton">Edit</button>
              <button @click="$emit('delete', trainingprogram.id)" class="deleteButton">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="no-data">
        No trainingprograms added yet.
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TrainingProgramsTable',
    props: {
      items: {
        type: Array,
        required: true,
        default: () => []
      }
    }
  }
  </script>
  
  <style scoped>
  .table-container {
    margin-top: 20px;
    width: 100%;
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  tr:hover {
    background-color: #f5f5f5;
  }
  
  .actions {
    display: flex;
    gap: 8px;
  }
  
  .editButton {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: white;
  }

  .deleteButton {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: white;
  }
  
  .editButton {
    background-color: #2196F3;
  }
  
  .deleteButton {
    background-color: #f44336;
  }
  
  .btn:hover {
    opacity: 0.9;
  }
  
  .no-data {
    text-align: center;
    padding: 20px;
    color: #666;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  </style>