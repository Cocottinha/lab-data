export default async function readTextFileXRF(fileUrl) {
    //console.log(fileUrl);
    const response = await fetch(fileUrl);
    //console.log("resposta", response);
    const text = await response.text();
    //console.log(text)
    
    const line = text.split('\n');
    let contaLinhas = 0;

    let arrayA = [];
    let arrayB = [];

    if(line.includes(';')){
        line.forEach(l => {

            let part = l.trim().split(';');

            if (part[1] && part[0] !== undefined) {
                const num = parseFloat(part[0])
                const num1 = parseFloat(part[1].trim())
                arrayA.push(num)
                arrayB.push(num1);
            }
            
        })
    }
    else{
        line.forEach(l => {
            contaLinhas++;
            if (contaLinhas > 21) {
                
                let part = l.trim().split(',');
    
                if (part[1] && part[0] !== undefined) {
                    const num = parseFloat(part[0])
                    const num1 = parseFloat(part[1].trim())
                    arrayA.push(num)
                    arrayB.push(num1);
                }
            }
            
        })
    }

    console.log("lista", arrayA, arrayB);
    return { arrayA, arrayB };
}
