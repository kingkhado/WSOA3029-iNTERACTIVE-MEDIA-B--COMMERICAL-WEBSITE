// Fetch and process the data, then pass it directly to the chart creation function
fetch('https://apps.itos.uga.edu/CODV2API/api/v1/themes/cod-ps/lookup/Get/1/do/ZAF')
  .then(response => response.json())
  .then(data => {
    const provinces = data.data.map(province => ({
      name: province.ADM1_NAME,
      population: province.T_TL,
      homelessPopulation: province.T_TL * 0.0033
    }));

    // Create the bubble chart with the data
    createBubbleChart(provinces);
  })
  .catch(error => console.error('Error fetching the data:', error));


function createBubbleChart(provinces) {
    const width = 800;
    const height = 600;

    const svg = d3.select('#chart')
                  .append('svg')
                  .attr('viewBox', `0 0 ${width} ${height}`)
                  .attr('preserveAspectRatio', 'xMidYMid meet')
                  .attr('width', width)
                  .attr('height', height);

    // Create a color scale with shades of blue
    const color = d3.scaleSequential(d3.interpolateBlues)
                    .domain([0, provinces.length]);

    // Radius scale based on population
    const radiusScale = d3.scaleSqrt()
                          .domain([0, d3.max(provinces, d => d.population)])
                          .range([10, 50]); // Adjust sizes as needed

    // Tooltip for interaction
    const tooltip = d3.select('body')
                      .append('div')
                      .attr('class', 'tooltip')
                      .style('opacity', 0);

    // Create a force simulation
    const simulation = d3.forceSimulation(provinces)
                         .force('x', d3.forceX(width / 2).strength(0.05))
                         .force('y', d3.forceY(height / 2).strength(0.05))
                         .force('collide', d3.forceCollide(d => radiusScale(d.population) + 2));

    // Add circles for each province
const bubbles = svg.selectAll('.bubble')
.data(provinces)
.enter()
.append('circle')
.attr('class', 'bubble')
.attr('r', d => radiusScale(d.population))
.attr('fill', (d, i) => color(i))  // Apply shades of blue
.attr('stroke', 'black')
.attr('stroke-width', 1)
.on('mouseover', function(event, d) {
  tooltip.style('opacity', 1)
         .html(`Province: ${d.name}<br>Population: ${d.population}<br>Homeless: ${Math.round(d.homelessPopulation)}`)
         .style('left', (event.pageX + 5) + 'px')
         .style('top', (event.pageY - 28) + 'px');
})
.on('mouseout', () => tooltip.style('opacity', 0));

// Trigger the force simulation to run as soon as the data is loaded
simulation.nodes(provinces).on('tick', () => {
bubbles.attr('cx', d => d.x)
       .attr('cy', d => d.y);
});

    // Update bubble positions based on force simulation
    simulation.nodes(provinces).on('tick', () => {
        bubbles.attr('cx', d => d.x)
               .attr('cy', d => d.y);
    });

    // Toggle homeless population size
    d3.select('#toggle-homeless').on('click', () => {
        bubbles.transition()
               .duration(1000)
               .attr('r', d => radiusScale(d.homelessPopulation));
    });

    // Reset to total population size
    d3.select('#reset-chart').on('click', () => {
        bubbles.transition()
               .duration(1000)
               .attr('r', d => radiusScale(d.population));
    });

    // Define threshold values for "high" populations
    const highPopulationThreshold = 5000000;
    const highHomelessThreshold = 10000;

    // Filter and Search function
    function filterAndSearch() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const filterType = document.getElementById('filter-select').value;

        bubbles.style('opacity', d => {
            const matchesSearch = d.name.toLowerCase().includes(searchTerm);
            let matchesFilter = true;

            if (filterType === 'high-population') {
                matchesFilter = d.population >= highPopulationThreshold;
            } else if (filterType === 'high-homeless') {
                matchesFilter = d.homelessPopulation >= highHomelessThreshold;
            }

            return matchesSearch && matchesFilter ? 1 : 0;
        });
    }

    // Add event listeners for search and filter
    document.getElementById('search-input').addEventListener('input', filterAndSearch);
    document.getElementById('filter-select').addEventListener('change', filterAndSearch);

    // Reset filters button functionality
    document.getElementById('reset-filters').addEventListener('click', () => {
        document.getElementById('search-input').value = '';
        document.getElementById('filter-select').value = 'all';
        filterAndSearch(); // Reapply filters with reset values
    });

    // Drill-down on bubble click
    bubbles.on('click', function(event, d) {
        const detailsDiv = document.getElementById('detailed-info');
        detailsDiv.style.display = 'block';
        document.getElementById('province-details').innerHTML = `
            <strong>Province:</strong> ${d.name}<br>
            <strong>Population:</strong> ${d.population}<br>
            <strong>Homeless Population:</strong> ${Math.round(d.homelessPopulation)}
        `;
    });
}
