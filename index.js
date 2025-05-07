  // Initialize variables
        const temperatureInput = document.getElementById('temperature');
        const toFahrenheitRadio = document.getElementById('toFahrenheit');
        const toCelsiusRadio = document.getElementById('toCelsius');
        const resultElement = document.getElementById('result');
        const formulaElement = document.getElementById('formula');
        const historyElement = document.getElementById('history');
        let history = JSON.parse(localStorage.getItem('tempHistory')) || [];
        
        // Load history on page load
        window.onload = function() {
            renderHistory();
            temperatureInput.focus();
        };
        
        // Convert temperature
        function convert() {
            const temp = parseFloat(temperatureInput.value);
            
            if (isNaN(temp)) {
                resultElement.textContent = 'Invalid input';
                formulaElement.textContent = 'Please enter a valid number';
                return;
            }
            
            let convertedTemp, fromUnit, toUnit, formula;
            
            if (toFahrenheitRadio.checked) {
                // Celsius to Fahrenheit
                convertedTemp = (temp * 9/5) + 32;
                fromUnit = '°C';
                toUnit = '°F';
                formula = `(${temp}°C × 9/5) + 32 = ${convertedTemp.toFixed(2)}°F`;
            } else {
                // Fahrenheit to Celsius
                convertedTemp = (temp - 32) * 5/9;
                fromUnit = '°F';
                toUnit = '°C';
                formula = `(${temp}°F − 32) × 5/9 = ${convertedTemp.toFixed(2)}°C`;
            }
            
            // Update result display
            resultElement.textContent = `${convertedTemp.toFixed(2)} ${toUnit}`;
            formulaElement.textContent = formula;
            
            // Add to history
            addToHistory(temp, fromUnit, convertedTemp, toUnit, formula);
        }
        
        // Switch between conversion directions
        function switchUnits() {
            if (toFahrenheitRadio.checked) {
                toCelsiusRadio.checked = true;
            } else {
                toFahrenheitRadio.checked = true;
            }
            convert();
        }
        
        // Add conversion to history
        function addToHistory(temp, fromUnit, convertedTemp, toUnit, formula) {
            const conversion = {
                id: Date.now(),
                original: `${temp.toFixed(2)} ${fromUnit}`,
                converted: `${convertedTemp.toFixed(2)} ${toUnit}`,
                formula: formula,
                time: new Date().toLocaleTimeString()
            };
            
            history.unshift(conversion);
            if (history.length > 10) history.pop();
            
            localStorage.setItem('tempHistory', JSON.stringify(history));
            renderHistory();
        }
        
        // Render history list
        function renderHistory() {
            if (history.length === 0) {
                historyElement.innerHTML = '<div class="empty-history">No conversions yet</div>';
                return;
            }
            
            historyElement.innerHTML = '';
            history.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'history-item';
                itemElement.innerHTML = `
                    <div class="conversion">
                        <div>
                            <span class="original">${item.original}</span>
                            <i class="fas fa-arrow-right arrow"></i>
                            <span class="converted">${item.converted}</span>
                        </div>
                        <span class="time">${item.time}</span>
                    </div>
                    <div class="formula">${item.formula}</div>
                `;
                
                itemElement.onclick = () => {
                    temperatureInput.value = parseFloat(item.original);
                    if (item.original.includes('°C')) {
                        toFahrenheitRadio.checked = true;
                    } else {
                        toCelsiusRadio.checked = true;
                    }
                    convert();
                };
                
                historyElement.appendChild(itemElement);
            });
        }
        
        // Clear history
        function clearHistory() {
            history = [];
            localStorage.removeItem('tempHistory');
            renderHistory();
        }
        
        // Allow Enter key to trigger conversion
        temperatureInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') convert();
        });
