export default async function readTextFileFTIR(fileUrl){
    const response = await fetch(fileUrl);
    const text = await response.text();

    const line = text.split('\n');

    let arrayA = [];
    let arrayB = [];

    if(line.includes(';') === true){
        line.forEach(l => {
            let part = l.trim().split(';');
            part = part.map((n) => {
                let newvalue = n.replace(",", ".")
                return newvalue
            })
            
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
            let part = l.trim().split(',');

            if (part[1] && part[0] !== undefined) {
                const num = parseFloat(part[0])
                const num1 = parseFloat(part[1].trim())
                arrayA.push(num)
                arrayB.push(num1);
            }    
        })
    }
    
    return (
        {arrayA,arrayB}
    ) 
}