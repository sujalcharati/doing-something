
const findSingleSourceOfTruth =(url)=>{

    const link = new URL(url);
    const data = link.searchParams.get("utm_source");
    console.log(data);

}


const url = "https://github.com/OpenSpace/OpenSpace?utm_source=claude.com";
findSingleSourceOfTruth( url);