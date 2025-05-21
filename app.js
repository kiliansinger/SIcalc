

//(function() {
    let SI=["kg","A","m","s","mol","K","cd"];
    function setSIUnits(pos,exp){
        let s="";
        for(i in SI){
            if(i==pos) s+=SI[i]+"=Math.E**"+exp+";"
            else s+=SI[i]+"=Math.E;"
        }
        return s;
    }

    function setSIUnitsTo1(){
        let s="";
        for(i in SI){
            s+=SI[i]+"=1;"
        }
        return s;
    }
    function prefixUnits(val){
        let s="";
        if(val=="kg") {
            s+="g=1e-3*"+val+";"
            val="g";
        }
        s+="q"+val+"=1e-30*"+val+";\n";//not on keyboard
        s+="r"+val+"=1e-27*"+val+";\n";//not on keyboard
        s+="y"+val+"=1e-24*"+val+";\n";//not on keyboard
        s+="z"+val+"=1e-21*"+val+";\n";//not on keyboard
        s+="a"+val+"=1e-18*"+val+";\n";//not on keyboard
        s+="f"+val+"=1e-15*"+val+";\n";
        s+="p"+val+"=1e-12*"+val+";\n";
        s+="n"+val+"=1e-9*"+val+";\n";
        s+="u"+val+"=1e-6*"+val+";\n";
        s+="m"+val+"=1e-3*"+val+";\n";
        s+="c"+val+"=1e-2*"+val+";\n";
        s+="d"+val+"=1e-1*"+val+";\n";
        s+="da"+val+"=1e1*"+val+";\n";
        s+="h"+val+"=1e2*"+val+";\n";
        if(val!="g") s+="k"+val+"=1e3*"+val+";\n";
        s+="M"+val+"=1e6*"+val+";\n";
        s+="G"+val+"=1e9*"+val+";\n";
        s+="T"+val+"=1e12*"+val+";\n";
        s+="P"+val+"=1e15*"+val+";\n";
        s+="E"+val+"=1e18*"+val+";\n";//not on keyboard
        s+="Z"+val+"=1e21*"+val+";\n";//not on keyboard
        s+="Y"+val+"=1e24*"+val+";\n";//not on keyboard
        s+="R"+val+"=1e27*"+val+";\n";//not on keyboard
        s+="Q"+val+"=1e30*"+val+";\n";//not on keyboard
        
        return s;
    }
    let units=`
    N=kg*m/s**2;
    Pa=N/m**2;
    J=N*m;
    W=J/s;
    C=A*s;
    V=W/A;
    F=C/V;
    Ohm=V/A;
    S=A/V;
    Wb=V*s;
    T=Wb/m**2;
    H=Wb/A;
    lm=cd;
    lx=lm/m**2;
    Bq=1/s;
    Hz=1/s;
    Gy=J/kg;
    Sv=J/kg;
    kat=mol/s;
    `
    let consts=`
    pi=Math.PI;
    E=Math.E;
    c=299792458*m/s;
    h=6.62607015e-34*J*s;
    hb=h/2/pi;
    kb=1.380649e-23*J/K;
    G=6.67430e-11*m**3/kg/s**2;
    sigma=pi**2*kb**4/(60*hb**3*c**2);
    e=1.602176634e-19*C;
    alpha=0.0072973525643;
    m0=4*pi*alpha*hb/(e**2*c);
    e0=e**2/(4*pi*alpha*hb*c);
    me=9.1093837139e-31*kg;
    mp=1.67262192595e-27*kg;
    mn=1.67492750056e-27*kg;
    a0=hb/(alpha*me*c);
    Ryd=alpha**2*me*c/(2*h);
    NA=6.02214076e23/mol;
    u=1.66053906892e-27*kg;
    R=NA*kb;
    //following are unit abbreviations
    eV=e*V;//not yet in keyboard
    hr=3600*s;
    min=60*s;
    d=24*hr;
    y=365*d;
    inch=0.0254*m;
    ft=0.03048*m;
    yd=914.4*m;
    mi=1609.344*m;
    L=0.001*m**3;
    l=L;
    USgal=3.79*L;
    usgal=USgal;
    Impgal=4.55*L;
    impgal=Impgal;
    brl=159*L;
    t=1000*kg;
    shton=907.2*kg;
    Lton=1016*kg;
    lb=0.4536*kg;
    oz=0.02835*kg;
    bar=100000*Pa;
    psi=0.06895*bar;
    mHg=bar/0.7500188;
    mhg=mHg;
    atm=1.013*bar;
    kgfm=9.80665*N*m;
    ftlb=1.35582*N*m;
    inlb=0.112985*N*m;
    cal=4.187*J;
    `;
    for(i in SI){
        consts+=prefixUnits(SI[i])
    }
    consts+=prefixUnits("eV");
    consts+=prefixUnits("L");
    consts+=prefixUnits("USgal");
    consts+=prefixUnits("Impgal");
    consts+=prefixUnits("brl");
    consts+=prefixUnits("t");
    consts+=prefixUnits("shton");
    consts+=prefixUnits("Lton");
    consts+=prefixUnits("bar");
    consts+=prefixUnits("psi");
    consts+=prefixUnits("mHg");
    consts+=prefixUnits("atm");
    consts+=prefixUnits("cal");

    let unitsarr=units.match(/(.*?)=/g).
        map(v=>v.replace(/=/g, '')).
        map(v=>v.replace(/ /g, '')).
        map((v)=>{return {key:calcUnit(v)[1],value:v}});
    console.log(unitsarr)
    const unitsmap = new Map(unitsarr.map((obj) => [obj.key, obj.value]));
    for(i in unitsarr){
        consts+=prefixUnits(unitsarr[i].value);
    }
    console.log(consts);
    
    function fac(num)
    {
        var rval=1;
        for (var i = 2; i <= num; i++)
            rval = rval * i;
        return rval;
    }
    function convertDRG(val){
        switch(drg.innerHTML){
            case "RAD": return val;
            case "DEG": return val*Math.PI/180.;
            case "GRA": return val*Math.PI/200.
        }
    }
    function invConvertDRG(val){
        switch(drg.innerHTML){
            case "RAD": return val;
            case "DEG": return val*180./Math.PI;
            case "GRA": return val*200/Math.PI;
        }
    }
    function sin(val){     
        return Math.sin(convertDRG(val));
    }
    function cos(val){     
        return Math.cos(convertDRG(val));
    }
    function tan(val){     
        return Math.tan(convertDRG(val));
    }
    function asin(val){     
        return invConvertDRG(Math.asin(val));
    }
    function acos(val){     
        return invConvertDRG(Math.acos(val));
    }
    function atan(val){     
        return invConvertDRG(Math.atan(val));
    }
    function sinh(val){     
        return Math.sinh(val);
    }
    function cosh(val){     
        return Math.cosh(val);
    }
    function tanh(val){     
        return Math.tanh(val);
    }
    function asinh(val){     
        return Math.asinh(val);
    }
    function acosh(val){     
        return Math.acosh(val);
    }
    function atanh(val){     
        return Math.atanh(val);
    }
    function ln(val){
        return Math.log(val);
    }
    function log(val){
        return Math.log10(val);
    }
    function log2(val){
        return Math.log2(val);
    }
    function sqrt(val){
        return Math.sqrt(val);
    }
    function isAlphaNumeric(str) {
        var code, i, len;
      
        for (i = 0, len = str.length; i < len; i++) {
          code = str.charCodeAt(i);
          if (!(code > 47 && code < 58) && // numeric (0-9)
              !(code > 64 && code < 91) && // upper alpha (A-Z)
              !(code > 96 && code < 123)) { // lower alpha (a-z)
            return false;
          }
        }
        return true;
      };
    function treatfac(s){
        let ret=""
        let i,j;

        ret=s;
        for (i = 0; i < ret.length; ++i) {
            
            if(ret[i]=="!"){
                let bracnt=0;
                let rest="";
                for (j = i-1; j>=0; --j){
                    if(!isAlphaNumeric(ret[j])){
                        if(ret[j]==")") bracnt++;
                        else if(bracnt>0 && ret[j]=="(") bracnt--;
                        else if(bracnt==0) break;
                    }
                    rest=ret[j]+rest;
                    //console.log("rest:"+rest)
                }
                ret=ret.substring(0,j+1)+"fac("+rest+")"+ret.substring(j+2+rest.length);
                
                i+=4;
                //console.log(ret);
                continue
            }
            //ret+=s[i];
            //console.log(ret.substring(0,i));
        }
        return ret;
    }
    let mem=0;
    let lastbutton=undefined;
    let lastinput=[""];
    let historycnt=0;
    let sol="";
    let cleanedformula="";
    let screen = document.querySelector('.screen');
    let buttons = document.querySelectorAll('.btn');
    let inv= document.querySelector('.btn-2nd');
    let hyp= document.querySelector('.btn-hyp');
    let drg=document.querySelector('.DRG')
    let form=document.querySelector('[name="inputform"]');
    let convertbuttontoggle=0;
    let killleadingspace=false;
    let killnextleadingspace=false;
    let plotmode=false;
    form.addEventListener('submit',handle);
    window.addEventListener("resize", ()=>{
        plot();
    });
    function plot(){
        if(!plotmode) return;
        document.getElementById("plot").innerHTML = ""; 
        let contentsBounds = document.getElementById("plot").getBoundingClientRect();
        console.log(contentsBounds)
        let width = 800;
        let height = 500;
        let ratio = contentsBounds.width / width;
        width *= ratio;
        height *= ratio;
        let form=cleanformula();
        functionPlot({
            title: screen.value,
            target: "#plot",
            width,
            height,
            yAxis: { domain: [-5, 5] },
            grid: true,
            data: form.split(',').map((val)=>
                {  
                    return {
                        graphType: 'polyline',
                        fn: function (scope) {
                            // scope.x = Number
                            var x = scope.x;
                            return eval(val);
                        }
                    }
                })

            });
    }
    function handle(event) { 
        event.preventDefault();//prevents reloading of page
        convertbuttontoggle++;
        if(convertbuttontoggle==4) convertbuttontoggle=0;
        equalButton();
         if(! lastinput[lastinput.length-1].endsWith("?")) [error,res]=calcUnit(cleanedformula);     
        else error=true
        if(res=="" && !error) {
            convertbuttontoggle++;
            if(convertbuttontoggle==4) convertbuttontoggle=0;
            screen.value=sol;
        }
        else if(!error){
            if((convertbuttontoggle&1)==1 && unitsmap.has(res)) screen.value = sol+" "+unitsmap.get(res)+" ";
            else screen.value = sol+" "+res;
            screen.focus();
        }else{
            screen.value = sol+" "+"?"
            screen.focus();
            screen.select();
        }
    } 
    function unitPow(val,i){
        if(val<0) return "";
        return ((Math.round(val)>1)?(SI[i]+"^"+Math.round(val)):SI[i])+" "
    }
    function calcUnit(cleanedformula){
        try{
            let ans= eval(
                setSIUnits(1,1)+
                units+consts+
                cleanedformula);
        
            let ans2=SI.map((val,i)=>{
                return eval(
                    setSIUnits(i,2)+
                    units+consts+
                    cleanedformula);
            } );
            let ans10=SI.map((val,i)=>{
                return eval(
                    setSIUnits(i,11)+
                    units+consts+
                    cleanedformula);
            } );

            console.log(ans2)
            
            let exp=ans10.map((val,i)=>{
                return Math.log(val/ans)/10;
            })
            console.log(exp)
        

            let error=false;
        
            for(i in exp){
                if(isNaN(exp[i])){
                    error=true;
                    break;
                }
                if(Math.abs(exp[i]-Math.round(exp[i]))>1e-15){
                    error=true;
                    break;
                }
            }
            
            if(!error){
                let res=exp.reduce((accu, val, i)=>{
                    console.log(i+":"+val)
                    if(Math.abs(val)<=1e-15) return accu;
                    let up=unitPow(-val,i);
                    if(up!="") accu[2]++;
                    return [accu[0]+unitPow(val,i),accu[1]+up,accu[2]]
                },["","",0])
                if(res[1]=="") return [false,res[0]];
                else if(res[2]>1) return [false,res[0]+"/ ( "+res[1]+") "];
                else return [false,res[0]+"/ "+res[1]]; 
            }else return [true,0];
        }catch(error){
            eval(
                setSIUnitsTo1()+
                units+consts
            );
            console.log(setSIUnitsTo1()+
                units+consts)
            return [false,0];
        }
      
    }

    // Log initial elements
    console.log('Screen element:', screen);
    console.log('Buttons:', buttons);
    inv.className = "btn-2nd";
    hyp.className = "btn-hyp";
    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            let value=undefined;
            let thistime=true;
            if(hyp.className == "btn-hyp-active"){
                if(inv.className == "btn-2nd") {//2nd not pressed while hyp is active
                    value = e.target.dataset.numh;
                    if(value!=',' && value!=" x " && value!="sinh" && value !="cosh" && value!="tanh" && value !="asinh" && value != "acosh" && value != "atanh"){
                        killnextleadingspace=true;
                        thistime=false;
                    }
                }
                else value = e.target.dataset.numh2;
            }
            if(value==undefined){
                if(inv.className == "btn-2nd") value = e.target.dataset.num;
                else value = e.target.dataset.num2;
            }

            if(value!="_HYP" && value!="_2nd") {
                inv.className = "btn-2nd";
                hyp.className = "btn-hyp";
            }
            if(!value)return;
            if(value!="_2nd" && thistime){
                killleadingspace=killnextleadingspace;
                killnextleadingspace=false;
            }
            if(value.startsWith("_")){//put here only buttons that have one of num or num2
                switch (value) {
                    case "_DRG2":
                        
                        equalButton(); 
                        let value2=""   
                        const [start2, end2] = [screen.selectionStart, screen.selectionEnd];
                        
                    
                        switch(drg.innerHTML){
                            case "RAD"://RAD to GRA
                                value2="*200/pi";
                                break;
                            case "DEG"://DEG to RAD
                                value2="*pi/180";
                                break;
                            case "GRA"://GRA TO DEG
                                value2="*180/200"
                                break;    
                        }
                        screen.setRangeText(value2, start2, end2);
                        screen.selectionEnd+=value2.length;
                        screen.selectionStart=screen.selectionEnd
                        equalButton();
                        //missing break fallthrough on purpose
                    case "_DRG":
                        switch(drg.innerHTML){
                            case "RAD":
                                drg.innerHTML="GRA";
                                break;
                            case "DEG":
                                drg.innerHTML="RAD";
                                break;
                            case "GRA":
                                drg.innerHTML="DEG";
                                break;    
                        }
                        break;
                    case "_2nd":
                        break;
                    case "_HYP":
                        break;
                    case "_CLR":
                        clearButton();
                        break;
                    case "_BACK":
                        backButton();
                        break;
                    //case "_EQ":
                    //    equalButton();
                    //    break;
                    case "_SOL":
                        const [start, end] = [screen.selectionStart, screen.selectionEnd];
                        screen.setRangeText(sol, start, end);
                        screen.selectionEnd+=sol.length;
                        screen.selectionStart=screen.selectionEnd
                        screen.focus();
                        break;
                    case "_U":
                        if(lastbutton!="_U" && lastbutton!="_D") historycnt=lastinput.length;
                        --historycnt;
                        if(historycnt<0)historycnt=0;
                        screen.value=lastinput[historycnt];
                        screen.focus();
                        break;
                    case "_D":
                        if(lastbutton!="_U" && lastbutton!="_D") historycnt=lastinput.length;
                        ++historycnt;
                        if(historycnt>=lastinput.length) historycnt=lastinput.length-1;
                        screen.value=lastinput[historycnt];
                        screen.focus();
                        break;
                    case "_L":
                        if(screen.selectionEnd>0){
                            screen.selectionEnd--;
                            screen.selectionStart=screen.selectionEnd;
                        }
                        break;
                    case "_R":
                        if(screen.selectionEnd<screen.value.length){
                            screen.selectionEnd++;
                            screen.selectionStart=screen.selectionEnd;
                            
                        }
                        break;
                    case "_M+":
                        equalButton();
                        mem+=parseFloat(sol);;
                        break
                    case "_M-":
                        equalButton();
                        mem-=parseFloat(sol);
                        break
                    case "_MC":
                        mem=0;
                        break;
                    case "_MR":{
                            const [start, end] = [screen.selectionStart, screen.selectionEnd];
                            screen.setRangeText(mem.toString(), start, end);
                            screen.selectionEnd+=mem.toString().length;
                            screen.selectionStart=screen.selectionEnd
                            screen.focus();
                        }
                        break;
                    case "_plot":{
                            plotmode=true;
                            plot();
                        }
                        break;
                    case "_EQ":
                        document.getElementById("plot").innerHTML = ""; 
                        plotmode=false;
                        if(lastbutton!="_EQ") convertbuttontoggle=1;
                        else {
                            convertbuttontoggle++;
                            if(convertbuttontoggle==4) convertbuttontoggle=0;
                        }
                       // if(lastbutton!="_EQ") 
                        equalButton();
                        if(! lastinput[lastinput.length-1].endsWith("?")) [error,res]=calcUnit(cleanedformula);     
                        else error=true
                        if(res=="" && !error) {
                            screen.value=sol;
                            convertbuttontoggle++;
                            if(convertbuttontoggle==4) convertbuttontoggle=0;
                        }
                        else if(!error){
                            if((convertbuttontoggle&1)==1 && unitsmap.has(res)) screen.value = sol+" "+unitsmap.get(res)+" ";
                            else screen.value = sol+" "+res;
                            screen.focus();
                        }else{
                            screen.value = sol+" "+"?"
                            screen.focus();
                            screen.select();
                        }
                        break;
                    default:
                        alert("unimplemented "+value)
                }
                screen.focus();
                lastbutton=value;
                return;
            }
            console.log('Button clicked:', value); // Debug log
            if (value !== undefined) { // Ensure value is not undefined
                if((screen.value.endsWith(" ")||
                    screen.value.endsWith("(")||
                    screen.value.endsWith("*")||
                    screen.value.endsWith("/")||
                    screen.value.endsWith("+")||
                    screen.value.endsWith("-")||
                    killleadingspace ||
                    screen.value=="") && value.startsWith(" ")) {
                        console.log("kill")
                        if(killleadingspace) killleadingspace=false;
                        const [start, end] = [screen.selectionStart, screen.selectionEnd];
                        screen.setRangeText(value.substring(1), start, end);
                        screen.selectionEnd+=value.substring(1).length;
                        screen.selectionStart=screen.selectionEnd
                        
                        screen.focus();
                    }
                else {
                    const [start, end] = [screen.selectionStart, screen.selectionEnd];
                    screen.setRangeText(value, start, end);
                    screen.selectionEnd+=value.length;
                    screen.selectionStart=screen.selectionEnd
                    screen.focus();
                }
                console.log('Screen value:', screen.value); // Debug log
                lastbutton=value;
            }
        });
    });//end of buttons.forEach(function(button)
    //needs to come after the above buttons.forEach(function(button)...
    screen.addEventListener('click', function(e){
        screen.attributes["inputmode"].value="search";
        screen.focus();
    })
    screen.addEventListener("focusout", (e) => { 
        screen.attributes["inputmode"].value="none";
    })
    inv.addEventListener('click', function(e) {
        console.log('inv button clicked'+inv.className); // Debug log
        if(inv.className == "btn-2nd")  inv.className="btn-2nd-active";
        else inv.className="btn-2nd";
        screen.focus();
        console.log('inv button clicked'+inv.className); // Debug log
    });
    hyp.addEventListener('click', function(e) {
        console.log('hyp button clicked'+hyp.className); // Debug log
        if(hyp.className == "btn-hyp")  hyp.className="btn-hyp-active";
        else hyp.className="btn-hyp";
        screen.focus();
    });
    function cleanformula(){
         //screen.value=screen.value.replaceAll(" ","*");
                //replace all functions by lowercase;
                let inp=screen.value;
                screen.value=screen.value.replace(/sin/ig, 'sin')
                screen.value=screen.value.replace(/cos/ig, 'cos')
                screen.value=screen.value.replace(/tan/ig, 'tan')
                screen.value=screen.value.replace(/asin/ig, 'asin')
                screen.value=screen.value.replace(/acos/ig, 'acos')
                screen.value=screen.value.replace(/atan/ig, 'atan')
                screen.value=screen.value.replace(/sinh/ig, 'sinh')
                screen.value=screen.value.replace(/cosh/ig, 'cosh')
                screen.value=screen.value.replace(/tanh/ig, 'tanh')
                screen.value=screen.value.replace(/asinh/ig, 'asinh')
                screen.value=screen.value.replace(/acosh/ig, 'acosh')
                screen.value=screen.value.replace(/atanh/ig, 'atanh')
                screen.value=screen.value.replace(/ln/ig, 'ln')
                screen.value=screen.value.replace(/log/ig, 'log')
                screen.value=screen.value.replace(/sqrt/ig, 'sqrt')
                

                //erase beggining and trailing spaces
                screen.value=screen.value.replace(/^\s+|\s+$/g, '')
                //erase double spaces
                screen.value=screen.value.replace(/\s{2,}/g, " ");
                //erase spaces before closing brackets
                screen.value=screen.value.replace(/\s\)/g, ')')
                //erase spaces before opening brackets
                screen.value=screen.value.replace(/\(\s/g, '(')
                //erase spaces before and after trigonometric expressiones
                screen.value=screen.value.replace(/\s*\*\s*/g, '*')
                screen.value=screen.value.replace(/\s*\/\s*/g, '/')
                screen.value=screen.value.replace(/\s*\+\s*/g, '+')
                screen.value=screen.value.replace(/\s*-\s*/g, '-')
                screen.value=screen.value.replace(/\s*\!/g, '!')
                screen.value=screen.value.replace(/\s*\^\s*/g, '^')
                screen.value=screen.value.replace(/\s*,\s*/g, ',')
                //replace spaces with *
                screen.value=screen.value.replace(/\s+/g, '*');
                lastinput.push(screen.value);

                //replace % by e-2
                screen.value=screen.value.replace(/\%/g, 'e-2')
                screen.value=screen.value.replace(/\^/g, '**')
                screen.value=treatfac(screen.value)
                let cleanedformula=screen.value;
                cleanedformula=cleanedformula.replace(/\**\?/g, '');//erase *?
                screen.value=inp;
                return cleanedformula;
    }
    function equalButton(iter) {
        sol=screen.value;//we need this in case we press eq and x is entered such that input stays active

        if(iter===undefined) iter=0;
       
        console.log('Equal button clicked'); // Debug log
        if (screen.value === '') {
            screen.value = "Please use buttons or keyboard";
            screen.focus();
            screen.select();
        } else {
            try {
                cleanedformula=cleanformula();
                console.log("cleaned formula:"+cleanedformula);
                let answer = eval(
                    setSIUnitsTo1()
                    +units+consts
                    +cleanedformula)
                ;
                if(Math.abs(answer)<1e-3 && convertbuttontoggle<2) answer=answer.toExponential();
                else if(Math.abs(answer)>1e3 && convertbuttontoggle<2) answer=answer.toExponential()
                screen.value = answer;
                sol=screen.value;
                console.log('Calculation result:', answer); // Debug log
                return true;
            } catch (error) {
                eval(
                    setSIUnitsTo1()+
                    units+consts
                );
                console.log(setSIUnitsTo1()+
                    units+consts)
                if(error=="ReferenceError: x is not defined"){
                    plotmode=true;
                    plot();
                }else{
                    screen.value+=")";
                    if (iter <10) {
                        let thisinput=lastinput.pop();
                        if(equalButton(iter+1)) return true;
                        lastinput.push(thisinput);
                    }
                    screen.value = "Error: "+error;
                    screen.focus();
                    screen.select();
                    console.log('Calculation error:', error); // Debug log
                }
            }
        }
        screen.focus();
    };

  
    function clearButton() {
        console.log('Clear button clicked'); // Debug log
        screen.value = "";
        screen.focus();
        plotmode=false;
        document.getElementById("plot").innerHTML = ""; 
    }
  
   function backButton()  {
        console.log('back button clicked'); // Debug log
        const [start, end] = [screen.selectionStart, screen.selectionEnd];
        screen.setRangeText("", start-1, end);
        screen.focus();
    }
//})();