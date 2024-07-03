document.addEventListener("DOMContentLoaded", function () {
    const unitType = document.getElementById("unitType");
    const inputUnit = document.getElementById("inputUnit");
    const outputUnit = document.getElementById("outputUnit");
    const convertBtn = document.getElementById("convertBtn");
    const result = document.getElementById("result");

    const units = {
        length: ["meter", "kilometer", "centimeter", "millimeter", "mile", "yard", "foot", "inch"],
        area: ["square meter", "square kilometer", "square centimeter", "square millimeter", "hectare", "acre"],
        volume: ["cubic meter", "liter", "milliliter", "cubic centimeter", "cubic inch", "cubic foot", "gallon"],
        weight: ["kilogram", "gram", "milligram", "ton", "pound", "ounce"],
        temperature: ["Celsius", "Fahrenheit", "Kelvin"],
        speed: ["meter/second", "kilometer/hour", "mile/hour", "knot"],
        time: ["second", "minute", "hour", "day", "week", "month", "year"],
        pressure: ["Pascal", "bar", "psi", "atm"],
        energy: ["Joule", "kilojoule", "calorie", "kilocalorie"],
        data: ["bit", "byte", "kilobyte", "megabyte", "gigabyte", "terabyte"],
        surfaceArea: ["square meter", "square kilometer", "square centimeter", "square millimeter", "hectare", "acre"],
        density: ["kilogram/cubic meter", "gram/cubic centimeter", "pound/cubic foot"],
        torque: ["Newton-meter", "foot-pound", "inch-pound"],
        power: ["Watt", "kilowatt", "horsepower"]
    };

    const conversionFactors = {
        length: {
            meter: 1,
            kilometer: 1000,
            centimeter: 0.01,
            millimeter: 0.001,
            mile: 1609.34,
            yard: 0.9144,
            foot: 0.3048,
            inch: 0.0254
        },
        area: {
            "square meter": 1,
            "square kilometer": 1e6,
            "square centimeter": 1e-4,
            "square millimeter": 1e-6,
            hectare: 1e4,
            acre: 4046.86
        },
        volume: {
            "cubic meter": 1,
            liter: 0.001,
            milliliter: 1e-6,
            "cubic centimeter": 1e-6,
            "cubic inch": 1.6387e-5,
            "cubic foot": 0.0283168,
            gallon: 0.00378541
        },
        weight: {
            kilogram: 1,
            gram: 0.001,
            milligram: 1e-6,
            ton: 1000,
            pound: 0.453592,
            ounce: 0.0283495
        },
        temperature: {
            Celsius: 1,
            Fahrenheit: 1,
            Kelvin: 1
        },
        speed: {
            "meter/second": 1,
            "kilometer/hour": 0.277778,
            "mile/hour": 0.44704,
            knot: 0.514444
        },
        time: {
            second: 1,
            minute: 60,
            hour: 3600,
            day: 86400,
            week: 604800,
            month: 2.628e6,
            year: 3.154e7
        },
        pressure: {
            Pascal: 1,
            bar: 1e5,
            psi: 6894.76,
            atm: 101325
        },
        energy: {
            Joule: 1,
            kilojoule: 1000,
            calorie: 4.184,
            kilocalorie: 4184
        },
        data: {
            bit: 1,
            byte: 8,
            kilobyte: 8192,
            megabyte: 8.388e6,
            gigabyte: 8.59e9,
            terabyte: 8.796e12
        },
        density: {
            "kilogram/cubic meter": 1,
            "gram/cubic centimeter": 1000,
            "pound/cubic foot": 16.0185
        },
        torque: {
            "Newton-meter": 1,
            "foot-pound": 1.35582,
            "inch-pound": 0.112985
        },
        power: {
            Watt: 1,
            kilowatt: 1000,
            horsepower: 745.7
        }
    };

    function populateUnits() {
        const selectedUnitType = unitType.value;
        inputUnit.innerHTML = "";
        outputUnit.innerHTML = "";

        units[selectedUnitType].forEach(unit => {
            const option1 = document.createElement("option");
            const option2 = document.createElement("option");
            option1.value = option2.value = unit;
            option1.textContent = option2.textContent = unit;
            inputUnit.appendChild(option1);
            outputUnit.appendChild(option2);
        });
    }

    function convert() {
        const inputValue = parseFloat(document.getElementById("inputValue").value);
        const fromUnit = inputUnit.value;
        const toUnit = outputUnit.value;
        const selectedUnitType = unitType.value;

        if (isNaN(inputValue)) {
            result.textContent = "Please enter a valid number.";
            return;
        }

        if (selectedUnitType === "temperature") {
            convertTemperature(inputValue, fromUnit, toUnit);
        } else {
            const fromFactor = conversionFactors[selectedUnitType][fromUnit];
            const toFactor = conversionFactors[selectedUnitType][toUnit];
            const outputValue = inputValue * fromFactor / toFactor;

            result.textContent = `${inputValue} ${fromUnit} = ${outputValue.toFixed(2)} ${toUnit}`;
        }
    }

    function convertTemperature(value, fromUnit, toUnit) {
        let convertedValue;

        if (fromUnit === "Celsius") {
            if (toUnit === "Fahrenheit") {
                convertedValue = (value * 9/5) + 32;
            } else if (toUnit === "Kelvin") {
                convertedValue = value + 273.15;
            } else {
                convertedValue = value;
            }
        } else if (fromUnit === "Fahrenheit") {
            if (toUnit === "Celsius") {
                convertedValue = (value - 32) * 5/9;
            } else if (toUnit === "Kelvin") {
                convertedValue = (value - 32) * 5/9 + 273.15;
            } else {
                convertedValue = value;
            }
        } else if (fromUnit === "Kelvin") {
            if (toUnit === "Celsius") {
                convertedValue = value - 273.15;
            } else if (toUnit === "Fahrenheit") {
                convertedValue = (value - 273.15) * 9/5 + 32;
            } else {
                convertedValue = value;
            }
        }

        result.textContent = `${value} ${fromUnit} = ${convertedValue.toFixed(2)} ${toUnit}`;
    }

    unitType.addEventListener("change", populateUnits);
    convertBtn.addEventListener("click", convert);

    populateUnits();
});
