document.getElementById('analyzeColors').addEventListener('click', function () {
    let elements = document.querySelectorAll('*');  
    let resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "<h2>Detected Colors & Suggestions</h2>";

    let colorAccessibility = {
        "#FFFF00": "#FBC02D", // Yellow → Less Bright Yellow
        "#FF00FF": "#8E24AA"  // Magenta → Deeper Purple
    };

    let detectedColors = new Set();

    elements.forEach(el => {
        let bgColor = window.getComputedStyle(el).backgroundColor;
        
        if (bgColor.startsWith("rgb")) {
            let rgbValues = bgColor.match(/\d+/g).map(Number);
            if (rgbValues.length < 3) return; // Ensure valid RGB values

            let hexColor = "#" + ((1 << 24) | (rgbValues[0] << 16) | (rgbValues[1] << 8) | rgbValues[2]).toString(16).slice(1).toUpperCase();

            if (!detectedColors.has(hexColor)) {
                detectedColors.add(hexColor);

                let colorBox = document.createElement('div');
                colorBox.classList.add('color-box');
                colorBox.style.backgroundColor = hexColor;
                colorBox.innerText = hexColor;
                colorBox.style.cursor = "pointer";
                colorBox.style.padding = "10px";
                colorBox.style.borderRadius = "5px";
                colorBox.style.margin = "5px";
                colorBox.style.color = "white";
                colorBox.style.fontWeight = "bold";
                colorBox.style.textAlign = "center";

                let colorContainer = document.createElement('div');
                colorContainer.style.display = "flex";
                colorContainer.style.alignItems = "center";
                colorContainer.style.justifyContent = "center";
                colorContainer.style.flexDirection = "column";
                colorContainer.style.marginBottom = "10px";

                colorContainer.appendChild(colorBox);

                if (colorAccessibility[hexColor]) {
                    let suggestion = document.createElement('p');
                    suggestion.innerText = "Suggested Alternative: " + colorAccessibility[hexColor];
                    suggestion.style.margin = "5px 0";
                    suggestion.style.fontSize = "14px";
                    suggestion.style.color = "#333";

                    colorBox.addEventListener('click', () => {
                        navigator.clipboard.writeText(colorAccessibility[hexColor]);
                        alert("Copied Alternative: " + colorAccessibility[hexColor]);
                    });

                    colorContainer.appendChild(suggestion);
                } else {
                    colorBox.addEventListener('click', () => {
                        navigator.clipboard.writeText(hexColor);
                        alert("Copied: " + hexColor);
                    });
                }

                resultsDiv.appendChild(colorContainer);
            }
        }
    });

    if (detectedColors.size === 0) {
        resultsDiv.innerHTML += "<p>No relevant colors found on this page.</p>";
    }
});
