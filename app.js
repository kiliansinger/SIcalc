(function() {
    let screen = document.querySelector('.screen');
    let buttons = document.querySelectorAll('.btn');
    let clear = document.querySelector('.btn-clear');
    let equal = document.querySelector('.btn-equal');

    // Log initial elements
    console.log('Screen element:', screen);
    console.log('Buttons:', buttons);
    console.log('Clear button:', clear);
    console.log('Equal button:', equal);

    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            let value = e.target.dataset.num;
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
                let answer = eval(screen.value);
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
})();
