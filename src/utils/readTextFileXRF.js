import Papa from "papaparse";

export default async function readTextFileXRF(fileUrl) {
    console.log(fileUrl);
    const response = await fetch(fileUrl);
    console.log("resposta", response);
    const text = await response.text();
    console.log(text)
    
    let arrayA = [];
    let arrayB = [];

    const parsedData = Papa.parse(text, {
        header: false,
        skipEmptyLines: true,
        delimiter: text.includes(';') ? ';' : ','
    });

    parsedData.data.forEach((row, index) => {
        if (row[0] !== undefined && (index > 21 || !text.includes(','))) {
            const valueA = parseFloat(row[0]);
            const valueB = parseFloat(row[1]?.trim());

            if (!isNaN(valueA) && !isNaN(valueB)) {
                arrayA.push(valueA);
                arrayB.push(valueB);
            }
        }
    });

    console.log("lista", arrayA, arrayB);
    return { arrayA, arrayB };
}
