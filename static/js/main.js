<!-- Chart Script -->
<script>
document.addEventListener("DOMContentLoaded", function() {
    // Declare variables first
    let orbitalPeriod = [];
    let temperature = [];
    let planetMass = [];
    let planetRadius = [];
    let habitableData = [];
    
    // Then try to parse the data
    try {
        orbitalPeriod = {{ orbital_period | safe }} || [];
        temperature = {{ temperature | safe }} || [];
        planetMass = {{ planet_mass | safe }} || [];
        planetRadius = {{ planet_radius | safe }} || [];
        habitableData = {{ habitable | safe }} || [];
        
        console.log('Data loaded:', {
            orbitalPeriod: orbitalPeriod.length,
            temperature: temperature.length,
            planetMass: planetMass.length,
            planetRadius: planetRadius.length,
            habitableData: habitableData.length
        });
    } catch (e) {
        console.error('Error parsing chart data:', e);
        // Set empty arrays as fallback
        orbitalPeriod = [];
        temperature = [];
        planetMass = [];
        planetRadius = [];
        habitableData = [];
    }

    function createScatter(id, dataPoints, label, color) {
        const canvas = document.getElementById(id);
        if (!canvas) {
            console.warn(`Canvas with id ${id} not found`);
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // Check if we have data
        if (!dataPoints || dataPoints.length === 0) {
            console.warn(`No data points for ${label}`);
            // Display a message on canvas
            ctx.font = '14px Arial';
            ctx.fillStyle = '#999';
            ctx.textAlign = 'center';
            ctx.fillText('No data available', canvas.width/2, canvas.height/2);
            return;
        }
        
        new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: label,
                    data: dataPoints,
                    backgroundColor: color || 'rgba(11, 94, 158, 0.6)',
                    borderColor: '#0b5e9e',
                    borderWidth: 1,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Habitability: ${context.raw.y}%`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        title: { display: true, text: label }
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        title: { display: true, text: 'Habitability %' }
                    }
                }
            }
        });
    }

    // Create charts only if we have data
    if (orbitalPeriod.length > 0 && habitableData.length > 0) {
        const periodData = orbitalPeriod.map((x, i) => ({
            x: x, 
            y: habitableData[i] || 0
        })).filter(point => point.x !== null && point.y !== null);
        
        const tempData = temperature.map((x, i) => ({
            x: x, 
            y: habitableData[i] || 0
        })).filter(point => point.x !== null && point.y !== null);
        
        const massData = planetMass.map((x, i) => ({
            x: x, 
            y: habitableData[i] || 0
        })).filter(point => point.x !== null && point.y !== null);
        
        const radiusData = planetRadius.map((x, i) => ({
            x: x, 
            y: habitableData[i] || 0
        })).filter(point => point.x !== null && point.y !== null);
        
        createScatter("chartPeriod", periodData, "Orbital Period (days)");
        createScatter("chartTemp", tempData, "Temperature (K)", 'rgba(245, 158, 11, 0.6)');
        createScatter("chartMass", massData, "Planet Mass (Earth)", 'rgba(16, 185, 129, 0.6)');
        createScatter("chartRadius", radiusData, "Planet Radius (Earth)", 'rgba(239, 68, 68, 0.6)');
    } else {
        // Show empty state for charts
        console.log('No chart data available');
        const chartContainers = document.querySelectorAll('.chart-container');
        chartContainers.forEach(container => {
            if (container) {
                container.innerHTML = '<div class="text-center py-5"><i class="fas fa-chart-line fa-3x text-muted mb-3"></i><p class="text-muted">No data available for visualization. Make some predictions first!</p></div>';
            }
        });
    }
});
</script>