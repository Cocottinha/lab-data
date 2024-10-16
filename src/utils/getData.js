import papaparse from "papaparse"

export async function getData(fileUrl){
    console.log(fileUrl)
    const a = papaparse.parse(fileUrl)
    return a
} 