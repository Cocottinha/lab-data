/**
 * Calcula os coeficientes da reta (y = ax + b) e converte os canais para Energia (keV)
 * * @param {Array} arrayCanais - Eixo X original (Canais)
 * @param {Object} ponto1 - Primeiro ponto de calibração {x: canal, y: kev}
 * @param {Object} ponto2 - Segundo ponto de calibração {x: canal, y: kev}
 * @returns {Array} Novo array contendo os valores convertidos em keV
 */
export function calibrateChannelsToKeV(arrayCanais, ponto1, ponto2) {
    const x1 = ponto1.x;
    const y1 = ponto1.y;
    const x2 = ponto2.x;
    const y2 = ponto2.y;

    // Proteção contra divisão por zero se os canais forem idênticos
    if (x2 - x1 === 0) {
        console.warn("Canais de calibração idênticos. Retornando canais originais.");
        return arrayCanais;
    }

    // Coeficiente Angular: a = Δy / Δx (Ganho)
    const a = (y2 - y1) / (x2 - x1);

    // Coeficiente Linear: b = y - ax (Offset / Zero)
    const b = y1 - (a * x1);

    // Aplica a função de primeiro grau para cada canal do arrayA
    return arrayCanais.map(canal => {
        const energiaKeV = (a * canal) + b;
        return Number(energiaKeV.toFixed(2)); // Retorna com precisão de 3 casas decimais
    });
}