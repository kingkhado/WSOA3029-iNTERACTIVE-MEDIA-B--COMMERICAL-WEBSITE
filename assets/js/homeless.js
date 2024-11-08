async function fetchAdoptionData() {
    try {
      const response = await fetch('https://api.rescuegroups.org/v5/public/animals?type=Dog');
      const data = await response.json();
      console.log('Available Dogs for Adoption:', data);
    } catch (error) {
      console.error('Error fetching adoption data:', error);
    }
  }
  
  // Call the function
  fetchAdoptionData();
  