const cl = console.log;
const cardContainer = document.getElementById("cardContainer");
const postforms = document.getElementById("postform");
const titleControl = document.getElementById("title");
const contentControl = document.getElementById("content");
const submitBn = document.getElementById("submitBn");


const sweetAlert = (msg, iconStr)=>{
    Swal.fire({
        title:msg,
        timer:2500,
        icon:iconStr
    })
}

let postArr = [];
    // {
    //     title:"HTML",
    //     content:"HTML stnd for hypertextMarkup Language",
    //     postId:"1"
    // },
    // {
    //     title:"CSS",
    //     content:"CSS is  used to style html element",
    //     postId:"2"
    // }

    
const createCardContainer =(arr)=>{

    if(arr.length == 0){
        alert(`plz provide valid DATA`)
    }

    let result =``;
    arr.forEach(ele=>{
        result+=`
            <div class ="col-md-4 mb-4">
                <div class ="card">
                    <div class ="card-header">
                        <h2 class ="m-0">${ele.title}</h2>
                    </div>
                    <div class ="card-body">
                        <p class ="m-0">
                            ${ele.content}
                        </p>
                    </div>
                    <div class ="card-footer">
                        <button class="btn btn-sm btn-outline-info">Edit</button>
                        <button class="btn btn-sm btn-outline-danger">Remove</button>
                    </div>
                </div>
            </div>         
        `
    });
    cardContainer.innerHTML = result;
}


let createpost =(newPost)=>{

    return new Promise ((resolve, reject)=>{
        setTimeout(()=>{
           let error = Math.random() >= .5?false:true;
           if(!error){
                postArr.push(newPost);
                resolve(`New blog is created successfully`)
           }else{
                reject(`Something went wrong while creating new blog!!!!`)
           }
        }, 2500);
    })
    
}


const fetchpost =()=>{
    
    return new Promise ((resolve, reject)=>{
        
        setTimeout(()=>{
            let error = Math.random() >= .5 ? false:true;
            if(!error){
                    resolve(postArr)
               }else{
                    reject(`Something went wrong while fetching new blog!!!!`)
               }
        }, 1500);
    })
}


const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};

const onPostAdd = async(eve)=>{
    eve.preventDefault();
    let newpost ={
        title:titleControl.value,
        content:contentControl.value,
        postId : generateUuid()
    }
    cl(newpost)
    postforms.reset();
    
        try{
            await createpost(newpost);
            let data =await fetchpost();
            createCardContainer(data)
        }catch(err){
            sweetAlert(err, "error")
        }
        
   
}




postforms.addEventListener("submit", onPostAdd)

