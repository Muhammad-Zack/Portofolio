const data = {
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    datasets: {
        2022: [4017, 6135, 7091, 5841, 5036, 4547, 3467, 3970, 6313, 3595, 9207, 5945],
        2023: [2416, 4136, 7935, 8004, 9505, 5026, 6108, 6343, 9404, 9280, 9287, 8689]
    }
};

function createChart() {
    const chartContainer = document.getElementById('salesChart');
    const maxValue = Math.max(
        ...Object.values(data.datasets).flatMap(values => values)
    );
    const chartHeight = 350;
    const barWidth = 30;
    const spacing = 10;
    const groupWidth = (barWidth * 2) + spacing;
    
    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', chartHeight + 50);
    svg.style.overflow = 'visible';
    
    // Create Y-axis scale and gridlines
    const yScale = chartHeight / maxValue;
    for (let i = 0; i <= 5; i++) {
        const y = chartHeight - (chartHeight * (i / 5));
        const value = Math.round(maxValue * (i / 5));
        
        // Gridline
        const gridline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        gridline.setAttribute('x1', '0');
        gridline.setAttribute('y1', y);
        gridline.setAttribute('x2', '100%');
        gridline.setAttribute('y2', y);
        gridline.setAttribute('stroke', '#e0e0e0');
        gridline.setAttribute('stroke-width', '1');
        svg.appendChild(gridline);
        
        // Y-axis label
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '-10');
        text.setAttribute('y', y);
        text.setAttribute('text-anchor', 'end');
        text.setAttribute('alignment-baseline', 'middle');
        text.setAttribute('font-size', '12');
        text.textContent = value.toLocaleString();
        svg.appendChild(text);
    }
    
    // Create bars
    const years = Object.keys(data.datasets);
    data.labels.forEach((month, i) => {
        const groupX = (i * groupWidth) + 40;
        
        years.forEach((year, j) => {
            const value = data.datasets[year][i];
            const height = value * yScale;
            const x = groupX + (j * (barWidth + spacing));
            const y = chartHeight - height;
            
            const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bar.setAttribute('x', x);
            bar.setAttribute('y', y);
            bar.setAttribute('width', barWidth);
            bar.setAttribute('height', height);
            bar.setAttribute('fill', j === 0 ? '#4e79a7' : '#e15759');
            bar.classList.add('bar');
            
            // Tooltip on hover
            bar.addEventListener('mouseover', (e) => {
                const tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                tooltip.setAttribute('x', x + (barWidth / 2));
                tooltip.setAttribute('y', y - 5);
                tooltip.setAttribute('text-anchor', 'middle');
                tooltip.setAttribute('font-size', '12');
                tooltip.setAttribute('class', 'tooltip');
                tooltip.textContent = value.toLocaleString();
                svg.appendChild(tooltip);
            });
            
            bar.addEventListener('mouseout', () => {
                const tooltip = svg.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });
            
            svg.appendChild(bar);
        });
        
        // X-axis label
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', groupX + barWidth + spacing);
        text.setAttribute('y', chartHeight + 20);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', '12');
        text.textContent = month;
        svg.appendChild(text);
    });
    
    chartContainer.appendChild(svg);
}

document.addEventListener('DOMContentLoaded', createChart);

// Handle window resize
window.addEventListener('resize', () => {
    const chartContainer = document.getElementById('salesChart');
    chartContainer.innerHTML = '';
    createChart();
});