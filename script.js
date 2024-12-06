// Predefined values for calculation (adaptable by admin staff)
let averageSalary = 34963; //***
let averageAbsenceRate = 2.6 / 100; //***
let mskRate = 21 / 100; //*** 
let reductionRate = 20 / 100; 
let niMultiplier = 1.15; // Updated NI multiplier ***
let employersPensionContribution = 0.03;//***

function calculateCost() {
  const employees = parseFloat(document.getElementById('employees').value);

  // Basic validation
  if (isNaN(employees)) { //***
    alert("Please enter a valid number of employees.");
    return;
  }

  // Calculate annual MSK cost
  const annualMSKCost = employees * averageSalary * averageAbsenceRate * mskRate * niMultiplier * employersPensionContribution;
  const savings = annualMSKCost * reductionRate;

  // Update the results in the HTML
  document.getElementById('totalCost').querySelector('span').textContent = formatCurrency(annualMSKCost);
  document.getElementById('savings').querySelector('span').textContent = formatCurrency(savings);


}

// Function to format numbers as currency for calculations total
function formatCurrency(value) {
  return value.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }).replace('£', '');
}

// Get the tooltip content
function showTooltip(element, text) {
  if (element._tooltip) {
    document.body.removeChild(element._tooltip);
    element._tooltip = null;
  }
  
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  
  // Parse multiline tooltips
  const tooltipLines = text.split('\n').map(line => {
    const [description, url] = line.split('|').map(item => item.trim());
    return url
      ? `<li><a href="${url}" target="_blank">${description}</a></li>`
      : `<li>${description}</li>`;
  }).join('');
  
  tooltip.innerHTML = `
    <ul>${tooltipLines}</ul>
  `;
  
  document.body.appendChild(tooltip);
  
  const rect = element.getBoundingClientRect();
  tooltip.style.left = `${rect.left + window.scrollX}px`;
  tooltip.style.top = `${rect.bottom + window.scrollY}px`;
  
  element._tooltip = tooltip;
  
  setTimeout(() => tooltip.classList.add('show'), 10);
  
    // Keep tooltip visible on hover
  tooltip.addEventListener('mouseover', () => {
    clearTimeout(element._hideTimeout); // Cancel hiding
  });

  tooltip.addEventListener('mouseout', () => {
    hideTooltip(element); // Hide when leaving the tooltip
  });

  element.addEventListener('mouseover', () => {
    clearTimeout(element._hideTimeout); // Keep tooltip visible when hovering back over the icon
  }); 
}

function hideTooltip(element) {
  if (element._tooltip) {
    // Delay hiding for smoother user experience
    element._hideTimeout = setTimeout(() => {
      if (element._tooltip) {
        document.body.removeChild(element._tooltip);
        element._tooltip = null;
      }
    }, 200); // Adjusted delay as needed
  }
}

// Attach tooltip functionality to all icons
document.querySelectorAll('.info-icon').forEach((icon) => {
  const text = icon.getAttribute('data-tooltip');
  const link = icon.getAttribute('data-tooltip-link');


  icon.addEventListener('mouseover', () => showTooltip(icon, text, link));
  icon.addEventListener('mouseout', (event) => {
    const related = event.relatedTarget;
    if (icon._tooltip && icon._tooltip.contains(related)) {
      return; // Don't hide tooltip if moving to it
    }
    hideTooltip(icon);
  });
})


