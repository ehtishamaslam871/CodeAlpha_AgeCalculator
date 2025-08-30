document.addEventListener('DOMContentLoaded', function() {
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const ageResult = document.getElementById('age-result');
    
    const dayError = document.getElementById('day-error');
    const monthError = document.getElementById('month-error');
    const yearError = document.getElementById('year-error');
    
    // Function to validate the date inputs
    function validateInputs() {
        let isValid = true;
        
        // Reset error messages
        dayError.style.display = 'none';
        monthError.style.display = 'none';
        yearError.style.display = 'none';
        
        // Validate day
        const day = parseInt(dayInput.value);
        if (isNaN(day) || day < 1 || day > 31) {
            dayError.style.display = 'block';
            isValid = false;
        }
        
        // Validate month
        const month = parseInt(monthInput.value);
        if (isNaN(month) || month < 1 || month > 12) {
            monthError.style.display = 'block';
            isValid = false;
        }
        
        // Validate year
        const year = parseInt(yearInput.value);
        const currentYear = new Date().getFullYear();
        if (isNaN(year) || year < 1900 || year > currentYear) {
            yearError.style.display = 'block';
            isValid = false;
        }
        
        // Additional validation for valid date (e.g., not February 31)
        if (isValid) {
            const date = new Date(year, month - 1, day);
            if (date.getFullYear() !== year || 
                date.getMonth() !== month - 1 || 
                date.getDate() !== day) {
                dayError.style.display = 'block';
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Function to calculate age
    function calculateAge() {
        if (!validateInputs()) {
            resultDiv.style.display = 'none';
            return;
        }
        
        const day = parseInt(dayInput.value);
        const month = parseInt(monthInput.value);
        const year = parseInt(yearInput.value);
        
        const birthDate = new Date(year, month - 1, day);
        const currentDate = new Date();
        
        let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
        let ageMonths = currentDate.getMonth() - birthDate.getMonth();
        let ageDays = currentDate.getDate() - birthDate.getDate();
        
        // Adjust for negative months or days
        if (ageDays < 0) {
            ageMonths--;
            // Get the number of days in the previous month
            const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            ageDays += lastMonth.getDate();
        }
        
        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }
        
        // Display the result
        ageResult.innerHTML = `
            ${ageYears} years, ${ageMonths} months, and ${ageDays} days
        `;
        resultDiv.style.display = 'block';
    }
    
    // Event listener for the calculate button
    calculateBtn.addEventListener('click', calculateAge);
    
    // Allow pressing Enter to calculate
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateAge();
        }
    });
});