// callback hell concepts ...


function walkDog(callback){

    setTimeout(() => {
        console.log(" you run the dog !")
        callback();
        
    }, 2000);
}

function cleanKithcen( callback){
    setTimeout(() => {
         
        console.log(" you clean the kitchen !")
        callback();
    }, 3000);

}

function putTrash( callback){
     setTimeout(()=>{
         
        console.log(" you put the trash ");
        callback();
     })
}

walkDog(()=>{
    cleanKithcen(()=>{
        putTrash(()=>{
            console.log(" you have finished all works !");
        })
    })
});




// method chaining approaches..

function walkDog(){

   

    return new Promise(( resolve, reject)=>{

        setTimeout(() => {
             const walkedDog = true;
     
             if( walkDog){
                 resolve(" you run the dog");
                 
             } else{
                reject(" you failed")
             }

    }, 2000);
    })
}

function cleanKithcen( ){

    return new Promise(( resolve, reject)=>{
         setTimeout(() => {

            const cleanedKithcen = true;
            if( cleanKithcen){

                resolve(" you cleaned the kithcen!");
            } else{
                reject(" you failed");
            }
         }, 3000);
    })
  

}

function putTrash( ){
    return new Promise(( resolve, reject)=>{
        setTimeout(() => {

            const puttrashout = true;
            if( puttrashout){

                resolve(" you put the trash!");
            } else{
                reject(" you failed");
            }

        }, 2000);
    })
     
}

walkDog().then(val=>{ console.log(" you ran the dog"); return cleanKithcen();})
         .then(val => { console.log(" you cleaned the kitchen"); return putTrash();})
         .then(val =>{ console.log(" you put the trash"); 
             console.log(" you finished all works;")
         })
         .catch( error => console.error(error));

        

