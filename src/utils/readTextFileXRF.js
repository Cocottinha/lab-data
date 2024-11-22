export default async function readTextFileXRF(fileUrl, applyLog = false) {
    const response = await fetch(fileUrl);
    const text = await response.text();
    const extensao = fileUrl.substring(fileUrl.lastIndexOf('.') + 1) || fileUrl;

    const lines = text.split('\n');
    let arrayA = [];
    let arrayB = [];

    const startDataLine = 17;

    function generateRange(n) {
        let range = [];
        for (let i = 0; i <= n; i++) {
            range[i] = i;
        }
        return range;
    }

    if (extensao === "spt") {
        lines.forEach((line, index) => {
            if (index > startDataLine) {
                const trimmedLine = line.trim();
                if (!trimmedLine || isNaN(trimmedLine)) return;
                const value = parseFloat(trimmedLine);
                arrayB.push(value);
                arrayA = generateRange(arrayB.length);
            }
        });
    } else {
        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return;

            const delimiter = trimmedLine.includes(';') ? ';' : ',';
            const parts = trimmedLine.split(delimiter);

            if (parts.length === 2) {
                const num = parseFloat(parts[0]);
                const num1 = parseFloat(parts[1]);

                if (!isNaN(num) && !isNaN(num1)) {
                    arrayA.push(num);
                    arrayB.push(num1);
                }
            }
        });
    }

    // Apply Logarithmic Transformation if flag is true
    if (applyLog) {
        arrayB = arrayB.map(value => Math.log10(value));
    }

    return { arrayA, arrayB };
}
