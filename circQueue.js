    var selected = 1;
    var store = [[],[],[]];
    var front= [];
    var back = [];
    var currentSize = [3];
    var num = 1;
    var canvasOne = document.getElementById('canvasOne');
    var canvasTwo = document.getElementById('canvasTwo');
    var canvasThree = document.getElementById('canvasThree');
    var ctx1 = canvasOne.getContext('2d');
        ctx1.font = '48px serif';
    var ctx2 = canvasTwo.getContext('2d');
        ctx2.font = '48px serif';
    var ctx3 = canvasThree.getContext('2d');
        ctx3.font = '48px serif';

        function clear (){
        for(var i = 0; i<3; i++)
        {
            front[i]=0;
            back[i]=0;
            currentSize[i]=0;
            for(var k = 0; k<6; k++)
            {

                store[i][k] = 0;
            }
        }

    }

    function fill(){
        clear();
        for(var k = 0; k<3; k++)
        {

            for(var i = 0; i<6; i++)
            {
                back[k]=i;
                currentSize[k]++;
                store[k][i] = num++;

            }

        }

    }

    function dequeue(which){
        if(currentSize[which-1]!= 0)
        {
            if(front[which-1]==5)
            {
                console.log("Customer " + store[which-1][front[which-1]]+" is finished.");
                store[which-1][front[which-1]] = 0;
                currentSize[which-1]--;
                front[which-1]=0;
            }
            else
            {
                console.log("Customer " + store[which-1][front[which-1]]+" is finished.");
                store[which-1][front[which-1]] = 0;
                currentSize[which-1]--;
                front[which-1]++;
            }
        }
        else
            window.alert("Line "+ which + " is already empty, choose a different line.");

    }
    function enqueue(){

        var smallest = 0;
        for(var i = 1; i<currentSize.length;i++)
        {
            if(currentSize[smallest] > currentSize[i])
                smallest=i;

        }
        if( currentSize[smallest]==6)
            return false;
        if(back[smallest]==5)
        {
            back[smallest] = 0;
            store[smallest][back[smallest]] = num++;
            currentSize[smallest]++;

        }

        else if(currentSize[smallest] == 0)
        {
            store[smallest][front[smallest]] = num++;
            back[smallest] = front[smallest];
            currentSize[smallest]++;
        }

        else
        {
            back[smallest]++;
            store[smallest][back[smallest]] = num++;
            currentSize[smallest]++;

        }
        return true;
    }
    function draw(){
        ctx1.clearRect(0, 0, canvasOne.width, canvasOne.height);
        ctx2.clearRect(0, 0, canvasTwo.width, canvasTwo.height);
        ctx3.clearRect(0, 0, canvasThree.width, canvasThree.height);
        var xy = [[],[]];

        for (var x = 1; x<7; x++) {
            xy[0][x-1] = Math.round((306 + 250 * Math.cos(x/3 * Math.PI)));
            xy[1][x-1] = Math.round((296 + 250 * Math.sin(x/3 * Math.PI)));
        }
        var fbxy = [[],[]]

        for (var x = 1; x<7; x++) {
            fbxy[0][x-1] = Math.round((306 + 190 * Math.cos(x/3 * Math.PI)));
            fbxy[1][x-1] = Math.round((296 + 190 * Math.sin(x/3 * Math.PI)));
        }
        var arcxy = [[46/24 * Math.PI, 6/24 * Math.PI, 14/24 * Math.PI, 22/24 * Math.PI, 30/24 * Math.PI,38/24 * Math.PI ],
                    [2/24 * Math.PI, 10/24 * Math.PI, 18/24 * Math.PI, 26/24 * Math.PI, 34/24 * Math.PI,42/24 * Math.PI]];
        var arcstartxy =[[],[]];
        for (var x = 1; x<7; x++) {
            arcstartxy[0][x-1] = Math.round((296 + 250 * Math.cos(arcxy[0][x-1])));
            arcstartxy[1][x-1] = Math.round((296 + 250 * Math.sin(arcxy[0][x-1])));
        }
        for(var k = 0; k<6; k++)
        {

            for(var i = 0; i<3; i++)
            {

                if(i==0)
                {
                    if (store[i][k]/10<1)
                        ctx1.fillText(store[i][k],xy[1][k]-12,xy[0][k]);
                    else if(store[i][k]/10>=1)
                        ctx1.fillText(store[i][k],xy[1][k]-24,xy[0][k]);
                    if(front[i]== k && back[i]==k && currentSize[i]!=0)
                        ctx1.fillText("FB",fbxy[1][k]-28,fbxy[0][k])
                    else {
                        if (front[i]==k && currentSize[i]!=0)
                            ctx1.fillText("F",fbxy[1][k]-12,fbxy[0][k])
                        if(back[i] == k && currentSize[i]!=0)
                            ctx1.fillText("B",fbxy[1][k]-12,fbxy[0][k])
                    }
                        ctx1.beginPath();
                        ctx1.lineWidth = 2;
                        ctx1.arc(296, 296, 250, arcxy[0][k], arcxy[1][k]);
                        ctx1.stroke();
                        ctx1.save();
                            drawArrowhead(ctx1,arcstartxy[0][k],arcstartxy[1][k], arcxy[0][k],12,12)
                        ctx1.restore();


                }
                if(i==1)
                {
                    if (store[i][k]/10<1)
                        ctx2.fillText(store[i][k],xy[1][k]-12,xy[0][k]);
                    else if(store[i][k]/10>=1)
                        ctx2.fillText(store[i][k],xy[1][k]-24,xy[0][k]);

                    if(front[i]== k && back[i]==k && currentSize[i]!=0)
                        ctx2.fillText("FB",fbxy[1][k]-28,fbxy[0][k])
                    else {
                        if (front[i] == k && currentSize[i]!=0)
                            ctx2.fillText("F", fbxy[1][k] - 12, fbxy[0][k])
                        if (back[i] == k && currentSize[i]!=0)
                            ctx2.fillText("B", fbxy[1][k] - 12, fbxy[0][k])
                    }
                        ctx2.beginPath();
                        ctx2.lineWidth = 2;
                        ctx2.arc(296, 296, 250, arcxy[0][k], arcxy[1][k]);
                        ctx2.stroke();
                        ctx2.save();
                            drawArrowhead(ctx2,arcstartxy[0][k],arcstartxy[1][k], arcxy[0][k],12,12)
                        ctx2.restore();

                }
                if(i==2)
                {
                    if (store[i][k]/10<1)
                        ctx3.fillText(store[i][k],xy[1][k]-12,xy[0][k]);
                    else if(store[i][k]/10>=1)
                        ctx3.fillText(store[i][k],xy[1][k]-24,xy[0][k]);

                    if(front[i]== k && back[i]==k && currentSize[i]!=0)
                        ctx3.fillText("FB",fbxy[1][k]-28,fbxy[0][k])
                    else {
                        if (front[i] == k && currentSize[i]!=0)
                            ctx3.fillText("F", fbxy[1][k] - 12, fbxy[0][k])
                        if (back[i] == k && currentSize[i]!=0)
                            ctx3.fillText("B", fbxy[1][k] - 12, fbxy[0][k])
                    }
                        ctx3.beginPath();
                        ctx3.lineWidth = 2;
                        ctx3.arc(296, 296, 250, arcxy[0][k], arcxy[1][k]);
                        ctx3.stroke();
                        ctx3.save();
                        drawArrowhead(ctx3,arcstartxy[0][k],arcstartxy[1][k], arcxy[0][k],12,12)
                        ctx3.restore();

                }
            }

        }
    }
    function findAngle(sx, sy, ex, ey) {
        // make sx and sy at the zero point
        return Math.atan((ey - sy) / (ex - sx));
    }

    function drawArrowhead(ctx, locx, locy, angle, sizex, sizey) {
        var hx = sizex / 2;
        var hy = sizey / 2;
        ctx.translate((locx), (locy));
        ctx.rotate(angle-Math.PI/2);
        ctx.translate(-hx, -hy);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 1 * sizey);
        ctx.lineTo(1 * sizex, 1 * hy);
        ctx.closePath();
        ctx.fill();
    }
    window.onload = function() {
        clear();
        var oneBtn = document.getElementById("oneButton");
        var twoBtn = document.getElementById("twoButton");
        var threeBtn = document.getElementById("threeButton");



        oneBtn.addEventListener("click", function () {
            selected = 1;
            oneBtn.style.color = "#fff";
            twoBtn.style.color = "#3c5c77";
            threeBtn.style.color = "#3c5c77";
            oneBtn.style.backgroundColor = "#3c5c77";
            twoBtn.style.backgroundColor = "#fff";
            document.getElementById("threeButton").style.backgroundColor = "#fff";

        });
        twoBtn.addEventListener("click", function () {
            selected = 2;
            oneBtn.style.color = "#3c5c77";
            twoBtn.style.color = "#fff";
            threeBtn.style.color = "#3c5c77";
            oneBtn.style.backgroundColor = "#fff";
            twoBtn.style.backgroundColor = "#3c5c77";
            threeBtn.style.backgroundColor = "#fff";
        });
        threeBtn.addEventListener("click", function () {
            selected = 3;
            oneBtn.style.color = "#3c5c77";
            twoBtn.style.color = "#3c5c77";
            threeBtn.style.color = "#fff";
            oneBtn.style.backgroundColor = "#fff";
            twoBtn.style.backgroundColor = "#fff";
            threeBtn.style.backgroundColor = "#3c5c77";

        });


        document.getElementById("clear").addEventListener("click", function(){
            clear();
            draw();
        });


        document.getElementById("fill").addEventListener("click", function(){
            clear();
            fill();
            draw();
        });
        document.getElementById("dequeue").addEventListener("click", function(){
            dequeue(selected);
            draw();
        });
        document.getElementById("enqueue").addEventListener("click", function(){
            if(!enqueue())
                window.alert("Every cash register is full!");
            draw();
        });
        document.getElementById("reset").addEventListener("click", function(){
            num = 1;
            clear();
            ctx1.clearRect(0, 0, canvasOne.width, canvasOne.height);
            ctx2.clearRect(0, 0, canvasTwo.width, canvasTwo.height);
            ctx3.clearRect(0, 0, canvasThree.width, canvasThree.height);
        });


    };

