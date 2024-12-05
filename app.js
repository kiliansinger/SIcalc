

(function() {
    function fac(num)
    {
        var rval=1;
        for (var i = 2; i <= num; i++)
            rval = rval * i;
        return rval;
    }
    function SIN(val){
        return Math.sin(val);
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
        for (i = 0; i < s.length; ++i) {
            
            if(s[i]=="!"){
                let bracnt=0;
                let rest="";
                for (j = i-1; j>=0; --j){
                    if(!isAlphaNumeric(s[j])){
                        if(s[j]==")") bracnt++;
                        else if(bracnt>0 && s[j]=="(") bracnt--;
                        else if(bracnt==0) break;
                    }
                    rest=s[j]+rest;
                }
                ret=ret.substring(0,j+1)+"fac("+rest+")";
                continue
            }
            ret+=s[i];
        }
        return ret;
    }
    let lastinput="";
    let screen = document.querySelector('.screen');
    let buttons = document.querySelectorAll('.btn');
    let clear = document.querySelector('.btn-clear');
    let equal = document.querySelector('.btn-equal');
    let inv= document.querySelector('.btn-2nd');
    let back = document.querySelector('.btn-back');
    let hyp = document.querySelector('.btn-hyp');
    let drg = document.querySelector('.btn-hyp');

    // Log initial elements
    console.log('Screen element:', screen);
    console.log('Buttons:', buttons);
    console.log('Clear button:', clear);
    console.log('Equal button:', equal);
    inv.className = "btn-2nd";
    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
           
            let value;
            if(inv.className == "btn-2nd") value = e.target.dataset.num;
            else value = e.target.dataset.num2;
            inv.className = "btn-2nd";
            if(value.startsWith("_")){//put here only buttons that have one of num or num2
                switch (value) {
                    case "_U":
                        screen.value=lastinput;
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
                    case "_MC":
                        alert("MC");
                        break;
                    case "_MR":
                        alert("MR");
                        break;
                }
                screen.focus();
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
                    screen.value=="") && value.startsWith(" ")) {
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
            }
        });
    });

    equal.addEventListener('click', function(e) {
        console.log('Equal button clicked'); // Debug log
        if (screen.value === '') {
            screen.value = "Please use buttons or keyboard";
            screen.focus();
            screen.select();
        } else {
            try {
                //screen.value=screen.value.replaceAll(" ","*");
                //erase beggining and trailing spaces
                screen.value=screen.value.replace(/^\s+|\s+$/g, '')
                //erase double spaces
                screen.value=screen.value.replace(/\s{2,}/g, " ");
                //erase spaces before closing brackets
                screen.value=screen.value.replace(/\s\)/g, ')')
                //erase spaces before closing brackets
                screen.value=screen.value.replace(/\(\s/g, '(')
                //erase spaces before and after trigonometric expressiones
                screen.value=screen.value.replace(/\s*\*\s*/g, '*')
                screen.value=screen.value.replace(/\s*\/\s*/g, '/')
                screen.value=screen.value.replace(/\s*\+\s*/g, '+')
                screen.value=screen.value.replace(/\s*-\s*/g, '-')
                screen.value=screen.value.replace(/\s*\!/g, '!')
                //replace spaces with *
                screen.value=screen.value.replace(/\s+/g, '*');
                screen.value=screen.value.replace(/\^/g, '**')
                lastinput=screen.value;
                screen.value=treatfac(screen.value)
                console.log("cleaned formula:"+screen.value);
                let answer = eval(`
                    s=1;
                    m=1;
                    kg=1;
                    A=1;
                    mol=1;
                    K=1;
                    cd=1;

                    N=kg*m/s**2;
                    Hz=1/s;
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
                    Gy=J/kg;
                    Sv=J/kg;
                    kat=mol/s;

                    pi=Math.PI;
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
                    Na=6.02214076e23/mol;
                    u=1.66053906892e-27*kg;
                `+screen.value);
                screen.value = answer;
                console.log('Calculation result:', answer); // Debug log
            } catch (error) {
                screen.value = "Error";
                screen.focus();
            screen.select();
                console.log('Calculation error:', error); // Debug log
            }
        }
        screen.focus();
    });

    clear.addEventListener('click', function(e) {
        console.log('Clear button clicked'); // Debug log
        screen.value = "";
        screen.focus();
    });
    inv.addEventListener('click', function(e) {
        console.log('inv button clicked'); // Debug log
        inv.className = "btn-2nd-active";
        screen.focus();
    });
    back.addEventListener('click', function(e) {
        console.log('back button clicked'); // Debug log
        const [start, end] = [screen.selectionStart, screen.selectionEnd];
        screen.setRangeText("", start-1, end);
        
        screen.focus();
    });
})();
