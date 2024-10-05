// Sample API URLs for verses (shortened for focus on giving to the poor)
const verseUrls = [
    "https://bible-api.com/Deuteronomy+15:7-11",
    "https://bible-api.com/Proverbs+19:17",
    "https://bible-api.com/Isaiah+58:6-10",
    "https://bible-api.com/Matthew+25:34-40"
];

// Fetch data from the Bible API
async function fetchVerses() {
    const responses = await Promise.all(verseUrls.map(url => fetch(url).then(res => res.json())));
    return responses.map(response => ({
        id: response.reference,
        text: shortenVerse(response.text)
    }));
}

// Function to shorten verses
function shortenVerse(fullText) {
    const sentences = fullText.split('.').map(s => s.trim());
    // Return the first two sentences, or the full text if it's shorter
    return sentences.length > 2 ? sentences.slice(0, 2).join('. ') + '.' : fullText;
}

// Sample links connecting verses based on shared themes
const links = [
    { source: "Deuteronomy 15:7-11", target: "Proverbs 19:17" },
    { source: "Isaiah 58:6-10", target: "Matthew 25:34-40" },
    { source: "Proverbs 19:17", target: "Matthew 25:34-40" },
];

// Set up SVG and force simulation
const svg = d3.select("#graph");
const width = +svg.attr("width");
const height = +svg.attr("height");

const simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(d => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2));

// Create nodes and links after fetching data
fetchVerses().then(nodes => {
    const combinedLinks = links.filter(link => 
        nodes.some(node => node.id === link.source) && 
        nodes.some(node => node.id === link.target)
    );

    // Create link elements
    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(combinedLinks)
        .enter().append("line")
        .attr("class", "link");

    // Create node elements
    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 8)
        .attr("fill", "#69b3a2")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        .on("mouseover", mouseoverNode)
        .on("mouseout", mouseoutNode)
        .on("click", clickNode);

    // Add labels to nodes
    const label = svg.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodes)
    .enter().append("text")
    .attr("dy", -3)
    .attr("dx", 10)
    .attr("fill", "#ffffff") // Add this line to change the text color to white
    .text(d => d.id);

    simulation
        .nodes(nodes)
        .on("tick", ticked);

    simulation.force("link").links(combinedLinks);

    // Update positions on tick
    function ticked() {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        label
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    }

    // Mouse events
    function mouseoverNode(event, d) {
        // Highlight connected nodes and edges
        const connectedLinks = combinedLinks.filter(link => link.source === d.id || link.target === d.id);
        
        link
            .style("stroke", l => connectedLinks.includes(l) ? "orange" : "#ccc")
            .style("stroke-width", l => connectedLinks.includes(l) ? 3 : 1.5);
        
        node
            .style("fill", n => n.id === d.id || connectedLinks.some(link => link.source === n.id || link.target === n.id) ? "orange" : "#69b3a2");

        tooltip
            .style("opacity", 1)
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px")
            .text(d.text);
    }

    function mouseoutNode() {
        // Reset styles on mouse out
        link.style("stroke", "#ccc").style("stroke-width", 1.5);
        node.style("fill", "#69b3a2");
        tooltip.style("opacity", 0); // Use opacity to hide tooltip
    }

    // Click event to show more information
    function clickNode(event, d) {
        // Create a modal for displaying more information
        const modal = d3.select("body").append("div")
            .attr("class", "modal")
            .style("display", "block");

        const modalContent = modal.append("div")
            .attr("class", "modal-content")
            .html(`
                <span class="close-button">&times;</span>
                <h2>${d.id}</h2>
                <p>${d.text}</p>
            `);

        // Close modal when the user clicks on <span> (x)
        modal.select(".close-button").on("click", function() {
            modal.style("display", "none");
            modal.remove(); // Remove modal from the DOM
        });

        // Close modal when clicking outside of the modal
        d3.select(window).on("click", function(event) {
            if (event.target === modal.node()) {
                modal.style("display", "none");
                modal.remove(); // Remove modal from the DOM
            }
        });
    }

    // Drag functions
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
});
