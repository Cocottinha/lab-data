export default async function readTextFileXRF(fileUrl) {
    const response = await fetch(fileUrl);
    const text = await response.text();
    
    const lines = text.split('\n'); // Split text into individual lines
    let arrayA = [];
    let arrayB = [];

    lines.forEach(line => {
        const trimmedLine = line.trim();

        // Skip empty lines
        if (!trimmedLine) return;

        // Determine delimiter based on line content
        const delimiter = trimmedLine.includes(';') ? ';' : ',';
        const parts = trimmedLine.split(delimiter);

        if (parts.length === 2) { // Ensure the line contains two parts
            const num = parseFloat(parts[0]);
            const num1 = parseFloat(parts[1]);

            // Check if both parts are valid numbers before pushing
            if (!isNaN(num) && !isNaN(num1)) {
                arrayA.push(num);
                arrayB.push(num1);
            }
        }
    });

    return { arrayA, arrayB };
}
