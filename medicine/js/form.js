const ip=document.getElementById("ak");
const op=document.getElementById("op");
const btn=document.getElementById("btn");
const btn2=document.getElementById("btn2");
const x=document.getElementById("price");

btn.addEventListener("click",(e)=>
{
    if(ip.value<0)
    {
        op.value=0;
    }
    else
    {
        
        console.log(typeof x);
        op.value=Math.round(ip.value*x.value*100)/100;
    }
});