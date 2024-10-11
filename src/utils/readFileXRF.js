export async function readTextFileXRF(fileUrl) {
    console.log(fileUrl)
    const response = await fetch(fileUrl);
    console.log(response)
    const text = await response.text();
    const lines = text.split('\n');
    const arrayA = [];
    const arrayB = [];
    let contaLinhas = 0;
    
    if (lines.some(line => line.includes(';'))) {
        lines.forEach(line => {
            const part = line.trim().split(';');
            if (part[1] && part[0] !== undefined) {
                arrayA.push(parseFloat(part[0]));
                arrayB.push(parseFloat(part[1].trim()));
            }
        });
    } else {
        lines.forEach(line => {
            contaLinhas++;
            if (contaLinhas > 21) {
                const part = line.trim().split(',');
                if (part[1] && part[0] !== undefined) {
                    arrayA.push(parseFloat(part[0]));
                    arrayB.push(parseFloat(part[1].trim()));
                }
            }
        });
    }
    console.log("lista", arrayA, arrayB)
    return { arrayA, arrayB };
}