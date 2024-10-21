<template>
    <div class="profile-dropdown" @click="toggleDropdown">
        {{ username }}
      <div v-if="isDropdownOpen" class="dropdown-menu">
        <button @click="handleLogout" class="dropdown-item">Logout</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'ProfileDropdown',
    setup() {
      const router = useRouter();
      const isDropdownOpen = ref(false);
      const username = ref(localStorage.getItem("user-name") || 'User'); // Replace with actual user data
  
      const toggleDropdown = () => {
        isDropdownOpen.value = !isDropdownOpen.value;
      };
  
      const handleLogout = () => {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("user-name");
        // Optionally redirect to login page
        router.push('/login');
      };
  
      return {
        isDropdownOpen,
        username,
        toggleDropdown,
        handleLogout,
      };
    },
  };
  </script>
  
  <style scoped>
  .profile-dropdown {
    position: relative;
    cursor: pointer;
  }
  
  .profile-header {
    display: flex;
    align-items: center;
  }
  
  .profile-pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .dropdown-menu {
    position: absolute;
    right: 0;
    top: 50px; /* Adjust based on your layout */
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  .dropdown-item {
    display: block;
    padding: 10px 20px;
    text-decoration: none;
    color: #333;
  }
  
  .dropdown-item:hover {
    background-color: #f0f0f0;
  }
  </style>
  