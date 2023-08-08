
// alert("Hello");
// $(document).click(()=>{
//     alert("hello");
// })
document.querySelectorAll("input[type='checkbox']").forEach(element => {
   element.addEventListener("click", function(){
    element.nextElementSibling.classList.add("line-through");
   }) 
});