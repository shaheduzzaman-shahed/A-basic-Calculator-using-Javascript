function getHistory(){
    return document.getElementById("history-value").innerText;
}
function printHistory(num){
    var size= document.getElementById("history");
    if(num.length<20){
         size.setAttribute("style","font-size: 20px;");
    }else{
        size.setAttribute("style","font-size: 17px;");
    }
    return document.getElementById("history-value").innerText=num;
}
function getOutput(){
    return document.getElementById("output-value").innerText;
}



function printOutput(num){
    var size= document.getElementById("output");
    if(num.length<16){
         size.setAttribute("style","font-size: 30px;");
    }else{
        num=num.substr(0,num.length-1);
    }
    if(num==""){
        return document.getElementById("output-value").innerText=num;
    }
    else if(num.includes(".")){
        var val = num.substr(0,num.length-1);
        if(num=="."){
            return document.getElementById("output-value").innerText="0"+num;
        }else if(num[num.length-1]=="." && val.includes(".") ){
            return document.getElementById("output-value").innerText=val;
        }else{
            return document.getElementById("output-value").innerText=num;
        }
    }
    else{
        return document.getElementById("output-value").innerText=getFormatedNumber(num);
    }
    
}



var clearOutput=false;
function printResult(num){
    clearOutput=true;
    var res = num.toString();
    if(res.length>16 && !res.includes(".")){
        num=parseFloat(num).toExponential(6);
        return document.getElementById("output-value").innerText=(num);
    }else{
        return document.getElementById("output-value").innerText=getFormatedNumber(num);
    }   
}



function getFormatedNumber(num){
    if(num=="-"){
        return "";
    }
    if(num.toString().length<16){
        var n = parseFloat(num);
        var value = n.toLocaleString('en');
        return value; 
    }else{
        return num;
    }
}
    



function reverseFormatedNumber(num){
    return num.replace(/,/g,'');
}





var number = document.getElementsByClassName("number");
for(i=0;i<number.length;i++){
    number[i].addEventListener('click', function(){
        if(clearOutput==true){
            printOutput("");
            printHistory("");
        }
       var output = reverseFormatedNumber(getOutput());
        
        printOutput(output+this.id);
        clearOutput=false;
    });
}




var operator = document.getElementsByClassName("operator");
for(i=0;i<operator.length;i++){
    operator[i].addEventListener('click', function(){
        var output= getOutput();
        var history = getHistory();
        if(this.id=="clear"){
            printHistory("");
            printOutput("");
//            printHistory(eval("(3-1)*2-9"));
//            var x= document.getElementById("output-value");
//            alert(x.offsetWidth);
        }
        else if(this.id=="√"){
            if(output!=""){
                output=reverseFormatedNumber(output);
                var root=Math.sqrt(output);
                printResult(root);
                printHistory("√"+output);
            }else{
                printOutput("0");
                printHistory("√(0)");
            }
        }
        else if(this.id=="backspace"){
            var output = reverseFormatedNumber(getOutput()).toString();
            if(output){
                output=output.substr(0,output.length-1);
                printOutput(output);
                clearOutput=false;
            }
        }
        else{
            
            if(history!="" && clearOutput==true){
                history="";
                clearOutput=false;
            }
            if(history==""){
                if(this.id=="-"){
                    printHistory("0-");
                }
            }else if(output=="" && history!=""){
                if(isNaN(history[history.length-1])){
                    history=history.substr(0,history.length-1);
                }
            }
            if(output!="" || history!=""){
                output= output==""?
                output:reverseFormatedNumber(output);
                history=history+output;
                if(this.id=="="){
                    var res= eval(history);
                    printResult(res);      
                    printHistory(history);
                }else{
                    history=history+this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}