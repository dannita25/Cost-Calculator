// ===========================
//    Predefined Constants
// ===========================
// These values are adjustable by admin staff
let averageSalary = 34963; // Average annual salary in GBP
let averageAbsenceRate = 2.6 / 100; // Percentage of absence rate
let mskRate = 21 / 100; // Percentage of working days lost due to MSK 
let reductionRate = 20 / 100; // Percentage of reduction in MSK cost
let niMultiplier = 1.15; // National Insurance multiplier
let employersPensionContribution = 0.03;// Employer pension contribution rate

// Main Function: Calculate MSK Cost
function calculateCost() {
  const employees = parseFloat(document.getElementById('employees').value);

  // Basic validation
  if (isNaN(employees)) {
    // Get number of employees from input
    alert("Please enter a valid number of employees.");
    return;
  }

  // Calculate annual MSK cost and potential savings
  const annualMSKCost = 
  employees *
    averageSalary *
    averageAbsenceRate *
    mskRate *
    (niMultiplier + employersPensionContribution);
  const savings = annualMSKCost * reductionRate;

  // Update the results in the HTML
  document.getElementById('totalCost-value').textContent = formatCurrency(annualMSKCost);
  document.getElementById('savings-value').textContent = formatCurrency(savings);
}

// Utility Function: Format Currency, convert number to currency format (GBP)
function formatCurrency(value) {
  return value.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }).replace('£', '');
}

// Show Tooltip
function showTooltip(element, text) {
  // Remove any existing tooltip
  if (element._tooltip) {
    document.body.removeChild(element._tooltip);
    element._tooltip = null;
  }
  
  // Create tooltip container
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  
  // Parse multiline tooltips
  const tooltipLines = text.split('\n').map(line => {
    const [description, url] = line.split('|').map(item => item.trim());
    return url
      ? `<li><a href="${url}" target="_blank">${description}</a></li>`
      : `<li>${description}</li>`;
  }).join('');
  
  // Add content to tooltip
  tooltip.innerHTML = `<ul>${tooltipLines}</ul>`;
  
  // Append tooltip to the body
  document.body.appendChild(tooltip);
  
  // Position tooltip below the icon
  const rect = element.getBoundingClientRect();
  tooltip.style.left = `${rect.left + window.scrollX}px`;
  tooltip.style.top = `${rect.bottom + window.scrollY}px`;
  
  // Store reference for tooltip
  element._tooltip = tooltip;
  
  // Add fade-in effect
  setTimeout(() => tooltip.classList.add('show'), 10);
  
  // Tooltip hover functionality
  tooltip.addEventListener('mouseover', () => {clearTimeout(element._hideTimeout);});
  tooltip.addEventListener('mouseout', () => {hideTooltip(element);});
  element.addEventListener('mouseover', () => {clearTimeout(element._hideTimeout);}); 
}

// Hide Tooltip
function hideTooltip(element) {
  if (element._tooltip) {
    // Delay hiding for smoother user experience
    element._hideTimeout = setTimeout(() => {
      if (element._tooltip) {
        document.body.removeChild(element._tooltip);
        element._tooltip = null;
      }
    }, 200); // Adjust delay as needed
  }
}

// Attach tooltip functionality to all icons
document.querySelectorAll('.info-icon').forEach((icon) => {
  // Extract tooltip content from attributes
  const text = icon.getAttribute('data-tooltip');
  const link = icon.getAttribute('data-tooltip-link');

  // Add hover events
  icon.addEventListener('mouseover', () => showTooltip(icon, text, link));
  icon.addEventListener('mouseout', (event) => {
    const related = event.relatedTarget;
    if (icon._tooltip && icon._tooltip.contains(related)) {
      return; // Prevent hiding if moving to tooltip
    }
    hideTooltip(icon);
  });
})



