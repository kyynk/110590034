//write your script here
function chgWidth1(){
    document.getElementById('myTable').style.width= "200px";
}
function chgWidth2(){
    document.getElementById('myTable').style.width= "500px";
}

function chgBorder1(){
    document.getElementById('myTable').border="1px";
    document.getElementById("myTable").style.borderSpacing = "1px";
}
function chgBorder2(){
    document.getElementById('myTable').border="10px";
    document.getElementById("myTable").style.borderSpacing = "10px";
}
function chgBorder3(){
    document.getElementById('myTable').border="20px";
    document.getElementById("myTable").style.borderSpacing = "20px";
}

function chgColor1(){
    /*document.getElementById('myTable').style.backgroundColor="green";*/
    let list = document.getElementsByTagName('td');
    for(let i=0;i<list.length;i++)
        list[i].style.background="green";
}
function chgColor2(){
    /*document.getElementById('myTable').style.backgroundColor="blue";*/
    let list = document.getElementsByTagName('td');
    for(let i=0;i<list.length;i++)
        list[i].style.background="blue";
}
function chgColor3(){
    /*document.getElementById('myTable').style.cssText="background-color: pink";*/
    let list = document.getElementsByTagName('td');
    for(let i=0;i<list.length;i++)
        list[i].style.background="pink";
}
function chgColor4(){
    /*document.getElementById('myTable').style.cssText="background-color: orange";*/
    let list = document.getElementsByTagName('td');
    for(let i=0;i<list.length;i++)
        list[i].style.background="orange";
}
