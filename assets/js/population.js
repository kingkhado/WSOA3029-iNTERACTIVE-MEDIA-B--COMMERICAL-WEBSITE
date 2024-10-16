// Fetch the data from the API
fetch('https://apps.itos.uga.edu/CODV2API/api/v1/themes/cod-ps/lookup/Get/1/do/ZAF')
  .then(response => response.json())
  .then(data => {
    // Process the data
    const provinces = data.data.map(province => ({
      name: province.ADM1_NAME,
      population: province.T_TL
    }));

    // Calculate the total population and homeless population
    const totalPopulation = provinces.reduce((acc, province) => acc + province.population, 0);
    const homelessPopulation = totalPopulation * 0.0033;

    // Create the chart
    createInteractiveBarChart(provinces, homelessPopulation);
  })
  .catch(error => console.error('Error fetching the data:', error));

function createInteractiveBarChart(provinces, homelessPopulation) {
    const margin = {top: 20, right: 30, bottom: 40, left: 90},
          width = 800 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#chart')
                  .append('svg')
                  .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
                  .attr('preserveAspectRatio', 'xMidYMid meet')
                  .append('g')
                  .attr('transform', `translate(${margin.left},${margin.top})`);

    // X and Y scales
    const x = d3.scaleLinear()
                .domain([0, d3.max(provinces, d => d.population)])
                .range([0, width]);

    const y = d3.scaleBand()
                .domain(provinces.map(d => d.name))
                .range([0, height])
                .padding(0.1);

    const colors = d3.scaleOrdinal(d3.schemeTableau10);

    // Add the X-axis
    svg.append('g')
       .attr('transform', `translate(0, ${height})`)
       .call(d3.axisBottom(x).ticks(6));

 // Add the Y-axis with a class
svg.append('g')
   .attr('class', 'y axis')  // Assign the class here
   .call(d3.axisLeft(y));  // Create the Y-axis


    // Tooltips
    const tooltip = d3.select('body')
                      .append('div')
                      .attr('class', 'tooltip');

    // Add bars for the total population
    svg.selectAll('.bar')
       .data(provinces)
       .enter()
       .append('rect')
       .attr('class', 'bar')
       .attr('x', 0)
       .attr('y', d => y(d.name))
       .attr('width', d => x(d.population))
       .attr('height', y.bandwidth() - 10)  // Shorter bars
       .attr('fill', d => colors(d.name))   // Unique colors for each province
       .on('mouseover', function(event, d) {
            tooltip.style('opacity', 1)
                   .html(`Province: ${d.name}<br>Population: ${d.population}`)
                   .style('left', (event.pageX + 5) + 'px')
                   .style('top', (event.pageY - 28) + 'px');
       })
       .on('mouseout', () => tooltip.style('opacity', 0));

    // Add bars for the homeless population (initially hidden)
    const homelessBars = svg.selectAll('.homeless-bar')
       .data(provinces)
       .enter()
       .append('rect')
       .attr('class', 'homeless-bar')
       .attr('x', 0)
       .attr('y', d => y(d.name) + (y.bandwidth() - 10) / 2)
       .attr('width', d => x(d.population * 0.0033))
       .attr('height', (y.bandwidth() - 10) / 2)
       .attr('fill', 'red')
       .attr('opacity', 0.6)
       .on('mouseover', function(event, d) {
            tooltip.style('opacity', 1)
                   .html(`Province: ${d.name}<br>Homeless Population: ${Math.round(d.population * 0.0033)}`)
                   .style('left', (event.pageX + 5) + 'px')
                   .style('top', (event.pageY - 28) + 'px');
       })
       .on('mouseout', () => tooltip.style('opacity', 0));

    // Toggle homeless population bars
    d3.select('#toggle-homeless').on('click', () => {
        const isHidden = homelessBars.attr('display') === 'none';
        homelessBars.attr('display', isHidden ? null : 'none');
    });

 // Sort by population (ascending)
d3.select('#sort-population-asc').on('click', () => {
    provinces.sort((a, b) => a.population - b.population);  // Sort ascending
    y.domain(provinces.map(d => d.name));
    
    svg.selectAll('.bar')
       .transition()
       .duration(1000)
       .attr('y', d => y(d.name));

    svg.selectAll('.homeless-bar')
       .transition()
       .duration(1000)
       .attr('y', d => y(d.name) + (y.bandwidth() - 10) / 2);

    // Update Y-axis
    svg.select('.y.axis')  // Update the Y-axis labels
       .transition()
       .duration(1000)
       .call(d3.axisLeft(y));
});

// Sort by population (descending)
d3.select('#sort-population-desc').on('click', () => {
    provinces.sort((a, b) => b.population - a.population);  // Sort descending
    y.domain(provinces.map(d => d.name));

    svg.selectAll('.bar')
       .transition()
       .duration(1000)
       .attr('y', d => y(d.name));

    svg.selectAll('.homeless-bar')
       .transition()
       .duration(1000)
       .attr('y', d => y(d.name) + (y.bandwidth() - 10) / 2);

    // Update Y-axis
    svg.select('.y.axis')  // Update the Y-axis labels
       .transition()
       .duration(1000)
       .call(d3.axisLeft(y));
});

// Reset chart
d3.select('#reset-chart').on('click', () => {
    provinces.sort((a, b) => a.name.localeCompare(b.name)); // Reset to original order
    y.domain(provinces.map(d => d.name));

    svg.selectAll('.bar')
       .transition()
       .duration(1000)
       .attr('y', d => y(d.name));

    svg.selectAll('.homeless-bar')
       .transition()
       .duration(1000)
       .attr('y', d => y(d.name) + (y.bandwidth() - 10) / 2);

    // Update Y-axis
    svg.select('.y.axis')  // Update the Y-axis labels
       .transition()
       .duration(1000)
       .call(d3.axisLeft(y));
});// Sort by population (ascending)
d3.select('#sort-population-asc').on('click', () => {
    provinces.sort((a, b) => a.population - b.population);  // Sort ascending
    y.domain(provinces.map(d => d.name));
    
    // Update the position of the bars
    svg.selectAll('.bar')
       .transition()
       .duration(1000)
       .attr('y', d => y(d.name));

    svg.selectAll('.homeless-bar')
       .transition()
       .duration(1000)
       .attr('y', d => y(d.name) + (y.bandwidth() - 10) / 2);

    // Update the Y-axis labels
    svg.select('.y.axis')  // Select the Y-axis element
       .transition()
       .duration(1000)
       .call(d3.axisLeft(y));  // Re-draw the Y-axis with the updated scale
});

// Sort by population (descending)
d3.select('#sort-population-desc').on('click', () => {
    provinces.sort((a, b) => b.population - a.population);  // Sort descending
    y.domain(provinces.map(d => d.name));

    // Update the position of the bars
    svg.selectAll('.bar')
       .transition()
       .duration(1000)
       .attr('y', d => y(d.name));

    svg.selectAll('.homeless-bar')
       .transition()
       .duration(1000)
       .attr('y', d => y(d.name) + (y.bandwidth() - 10) / 2);

    // Update the Y-axis labels
    svg.select('.y.axis')  // Select the Y-axis element
       .transition()
       .duration(1000)
       .call(d3.axisLeft(y));  // Re-draw the Y-axis with the updated scale
});

// Reset chart
d3.select('#reset-chart').on('click', () => {
   provinces.sort((a, b) => a.name.localeCompare(b.name)); // Reset to original order
   y.domain(provinces.map(d => d.name));

   svg.selectAll('.bar')
      .transition()
      .duration(1000)
      .attr('y', d => y(d.name));

   svg.selectAll('.homeless-bar')
      .transition()
      .duration(1000)
      .attr('y', d => y(d.name) + (y.bandwidth() - 10) / 2);

   // Update Y-axis
   svg.select('.y.axis')  // Update the Y-axis labels
      .transition()
      .duration(1000)
      .call(d3.axisLeft(y));
});

}
