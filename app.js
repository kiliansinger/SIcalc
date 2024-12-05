

(function() {
    function SIN(val){
        return Math.sin(val);
    }
    let screen = document.querySelector('.screen');
    let buttons = document.querySelectorAll('.btn');
    let clear = document.querySelector('.btn-clear');
    let equal = document.querySelector('.btn-equal');
    let inv= document.querySelector('.btn-2nd');
    let sol = document.querySelector('.btn-sol');
    let del = document.querySelector('.btn-del');
    let hyp = document.querySelector('.btn-hyp');
    let drg = document.querySelector('.btn-hyp');

    // Log initial elements
    console.log('Screen element:', screen);
    console.log('Buttons:', buttons);
    console.log('Clear button:', clear);
    console.log('Equal button:', equal);

    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
           
            let value;
            if(inv.className == "btn-2nd") value = e.target.dataset.num;
            else value = e.target.dataset.num2;
            inv.className = "btn-2nd";
            console.log('Button clicked:', value); // Debug log
            if (value !== undefined) { // Ensure value is not undefined
                screen.value += value;
                console.log('Screen value:', screen.value); // Debug log
            }
        });
    });

    equal.addEventListener('click', function(e) {
        console.log('Equal button clicked'); // Debug log
        if (screen.value === '') {
            screen.value = "Please enter";
        } else {
            try {
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
                    hbar=h/2/pi;
                    kb=1.380649e-23*J/K;
                    G=6.67430e-11*m**3/kg/s**2;
                    sigma=pi**2*kb**4/(60*hbar**3*c**2);
                    e=1.602176634e-19*C;
                    alpha=0.0072973525643;
                    m0=4*pi*alpha*hbar/(e**2*c);
                    e0=e**2/(4*pi*alpha*hbar*c);
                    me=9.1093837139e-31*kg;
                    mp=1.67262192595e-27*kg;
                    mn=1.67492750056e-27*kg;
                    a0=hbar/(alpha*me*c);
                    Ryd=alpha**2*me*c/(2*h);
                    Na=6.02214076e23/mol;
                    u=1.66053906892e-27*kg;
                `+screen.value);
                screen.value = answer;
                console.log('Calculation result:', answer); // Debug log
            } catch (error) {
                screen.value = "Error";
                console.log('Calculation error:', error); // Debug log
            }
        }
    });

    clear.addEventListener('click', function(e) {
        console.log('Clear button clicked'); // Debug log
        screen.value = "";
    });
    inv.addEventListener('click', function(e) {
        console.log('inv button clicked'); // Debug log
        inv.className = "btn-2nd-active";
    });
})();
