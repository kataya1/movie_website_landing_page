const bdy = document.querySelector('body')
let spn = document.querySelector('span')

function submitHandler(e){
    e.preventDefault()
    let usrnm = document.querySelector("#username").value
    let pw = document.querySelector("#password").value
    successfulLogin()
}

let successfulLogin = ()=>{
    bdy.style.backgroundColor = "#73C359";
    spn.innerHTML= "LOGIN SUCCESS"
    spn.style.color = "#73C359";
    setTimeout(function(){
        // console.log("does this work")
        bdy.style.backgroundColor = "lightskyblue";
    },750)

}
let falsyLogin = (msg) =>{
    bdy.style.backgroundColor = "tomato"
    spn.style.color = "tomato"
    spn.innerHTML= msg
    setTimeout(function(){
        // console.log("does this work")
        bdy.style.backgroundColor = "lightskyblue";
    },750)
}
let validateAccount = (user) =>{
    let h = 1;    
} 