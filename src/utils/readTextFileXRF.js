export default async function readTextFileXRF(fileUrl, applyLog = false) {
    const response = await fetch(fileUrl);
    const text = await response.text();
    const extensao = fileUrl.substring(fileUrl.lastIndexOf('.') + 1) || fileUrl;

    let arrayA = [];
    let arrayB = [];
    let coeficienteA = null;
    let coeficienteB = null;

    function generateRange(n) {
        let range = [];
        for (let i = 0; i < n; i++) {
            range[i] = i;
        }
        return range;
    }

    // Normaliza as quebras de linha para garantir compatibilidade entre \r\n e \n
    const lines = text.split(/\r?\n/);

    let startDataLine = 0;
    let hasDataTag = false;

    // Varre as linhas para extrair os coeficientes e encontrar onde os dados numéricos começam
    lines.forEach((line, index) => {
        const trimmed = line.trim();

        if (trimmed.startsWith('CoeficienteA=')) {
            coeficienteA = parseFloat(trimmed.split('=')[1]);
        } else if (trimmed.startsWith('CoeficienteB=')) {
            coeficienteB = parseFloat(trimmed.split('=')[1]);
        } else if (trimmed === '[DATA]') {
            startDataLine = index;
            hasDataTag = true;
        }
    });

    if (hasDataTag || extensao === "spt" || extensao === "txt" || (extensao === "csv" && !lines.some(l => l.includes(';') || (l.includes(',') && l.split(',').length === 2)))) {
        // Formato de coluna única (.spt, .txt, .csv estruturados com [DATA])
        const startIndex = hasDataTag ? startDataLine : 17;

        lines.forEach((line, index) => {
            if (index > startIndex) {
                const trimmedLine = line.trim();
                if (!trimmedLine || isNaN(trimmedLine)) return;
                const value = parseFloat(trimmedLine);
                arrayB.push(value);
            }
        });
        arrayA = generateRange(arrayB.length);
    } else {
        // Formato tradicional de duas colunas separado por vírgula ou ponto e vírgula
        let contLinha = 0;
        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return;

            contLinha++;
            if (contLinha > 21) {
                const delimiter = trimmedLine.includes(';') ? ';' : ',';
                const parts = trimmedLine.split(delimiter);
                if (parts.length === 2) {
                    const num = parseFloat(parts[0]);
                    const num1 = parseFloat(parts[1].replace(/[\\"]/g, ''));
                    if (!isNaN(num) && !isNaN(num1)) {
                        arrayA.push(num);
                        arrayB.push(num1);
                    }
                }
            }
        });
    }

    if (applyLog) {
        arrayB = arrayB.map(value => {
            const valorSeguro = value > 0 ? value : 1;
            return Math.log10(valorSeguro);
        });
    }

    return { arrayA, arrayB, coeficienteA, coeficienteB };
}

/**
 * Converte o array de canais (eixo X) para Energia (keV) usando
 * CoeficienteA e CoeficienteB já calculados/lidos do arquivo.
 */
export function applyCalibrationCoefficients(arrayCanais, coeficienteA, coeficienteB, decimals = 3) {
    if (
        !Array.isArray(arrayCanais) ||
        typeof coeficienteA !== 'number' || Number.isNaN(coeficienteA) ||
        typeof coeficienteB !== 'number' || Number.isNaN(coeficienteB)
    ) {
        return arrayCanais;
    }

    return arrayCanais.map(canal => {
        const energiaKeV = (coeficienteA * canal) + coeficienteB;
        return Number(energiaKeV.toFixed(decimals));
    });
}

/**
 * Calcula os coeficientes da reta (y = ax + b) a partir de dois pontos e converte canais para keV.
 */
export function calibrateChannelsToKeV(arrayCanais, ponto1, ponto2, decimals = 3) {
    const x1 = ponto1.x;
    const y1 = ponto1.y;
    const x2 = ponto2.x;
    const y2 = ponto2.y;

    if (x2 - x1 === 0) {
        console.warn("Canais de calibração idênticos. Retornando canais originais.");
        return arrayCanais;
    }

    const a = (y2 - y1) / (x2 - x1);
    const b = y1 - (a * x1);

    return arrayCanais.map(canal => {
        const energiaKeV = (a * canal) + b;
        return Number(energiaKeV.toFixed(decimals));
    });
}