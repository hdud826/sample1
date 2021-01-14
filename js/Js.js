var valList =[]; // 데이터마다 High, normal, low 중 하나 값 
var numOfData=0; // 데이터 갯 수

window.addEventListener('load', function() {

    // button add event listner (click event)
    document.getElementById("btn1").addEventListener("click",function(){
        //데이터에 랜덤으로 high, normal, low 값 설정
        numOfData = document.getElementById("num").value;
        for(let i=0; i<numOfData; i++){
            valList[i] = Math.floor(Math.random()*3);
            if(valList[i]==3){
                valList[i] = 2;
            }
        }
        console.log(valList);

        reset();

        makeCircle();
        drawLine();
    },false);
});

function makeCircle(){
    var dataDiv = document.body.querySelector(".dataList");
    var br = document.createElement("br");
    
    for(i=0; i<numOfData; i++){

        var circleDiv = document.createElement("div");
        circleDiv.setAttribute("class", "circleDiv");
    
        var circleH = document.createElement("div");
        var circleN = document.createElement("div");
        var circleL = document.createElement("div");
    
        circleH.setAttribute("class", "circle high");
        circleN.setAttribute("class", "circle normal");
        circleL.setAttribute("class", "circle low");
    
        circleH.innerText = "High";
        circleN.innerText = "Norm";
        circleL.innerText = "Low";
    
        circleDiv.appendChild(circleH);
        circleDiv.appendChild(br.cloneNode());
        circleDiv.appendChild(circleN);
        circleDiv.appendChild(br.cloneNode());
        circleDiv.appendChild(circleL);
        dataDiv.appendChild(circleDiv);
        // set high/normal/low
        circleDiv.querySelectorAll(".circle")[valList[i]].classList.add("selected");
    }
}

function drawLine(){
    var dataDiv = document.body.querySelector(".dataList");
    var svgElem = document.createElementNS('http://www.w3.org/2000/svg','svg');
    var lineElem = document.createElementNS('http://www.w3.org/2000/svg','line');

          
    for(i=0; i<numOfData-1; i++){
        var val1 = valList[i];
        var val2 = valList[i+1];

        var lineDiv = document.createElement("div");
        lineDiv.setAttribute("class", "lineDiv");
        
        var svg = svgElem.cloneNode();

        var line1 = lineElem.cloneNode();
        switch(val1){
            case 0: //High
                line1.setAttribute("stroke", "blue");
                break;
            case 1: //Normal
                line1.setAttribute("stroke", "green");
                break;
            case 2: //Low
                line1.setAttribute("stroke", "red");
                break;
        }
        var line2=line1.cloneNode();
        var line3=line1.cloneNode();        
        
        line1.setAttribute("x1", 0);
        line1.setAttribute("y1", 70+160*val1);
        line1.setAttribute("x2", 50);
        line1.setAttribute("y2", 70+160*val1);

        line2.setAttribute("x1", 50);
        line2.setAttribute("y1", 70+160*val1);
        line2.setAttribute("x2", 50);
        line2.setAttribute("y2", 70+160*val2);

        line3.setAttribute("x1", 50);
        line3.setAttribute("y1", 70+160*val2);
        line3.setAttribute("x2", 100);
        line3.setAttribute("y2", 70+160*val2);
        
        svg.appendChild(line1);
        svg.appendChild(line2);
        svg.appendChild(line3);

        lineDiv.appendChild(svg);

        dataDiv.insertBefore(lineDiv, dataDiv.childNodes[i*2+1]);
    }
}
function reset(){
    var dataDiv = document.querySelector(".dataList");
    dataDiv.innerHTML = null;

}
