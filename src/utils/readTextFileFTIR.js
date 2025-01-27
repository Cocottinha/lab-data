export default async function readTextFileFTIR(fileUrl){
    const response = await fetch(fileUrl);
    const text = await response.text();

    const line = text.split('\n');

    console.log(line)
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
            let trimmedLine = l.trim();
            if(!trimmedLine) return;

            // console.log(trimmedLine);
            const delimiter = trimmedLine.includes('\t') ? '\t' : trimmedLine.includes(',') ? ',' : ';';

            const parts = trimmedLine.split(delimiter).map(part => part.replace(",", "."));

            if (parts.length === 2) {
                const num = parseFloat(parts[0])
                const num1 = parseFloat(parts[1])
                
                arrayA.push(num)
                arrayB.push(num1);
            }    
        })
    }
    
    return (
        {arrayA,arrayB}
    ) 
}