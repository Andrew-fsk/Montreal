let elements = document.querySelectorAll(".count");

let arr1 = [].slice.call(document.querySelectorAll(".count"));

let values = arr1.map(item => +item.textContent);

let i = 0;
let n = 0;

function clearCount() {
    for (let count = 0; count < elements.length; count++) {
        elements[count].innerHTML = "0";
    }
}

function menu(x) {
    x.classList.toggle("change");
}



function timeout() {
    setTimeout(function () {
        if (n > values.lenght) {
            return 0;
        }
        if (i > values[n]) {
            i = 0;
            n++;
        }
        elements[n].innerHTML = i;
        i++;



        timeout();
    }, 1);
}

clearCount()

$('.stats').waypoint(function (dir) {
    if (dir === 'down') {
        timeout()
    }
}, {
    offset: '70%'
});





/*let p = document.getElementById("count");
let x = +p.textContent;
p.innerHTML = "0";
i = 0;

function timeout() {
    setTimeout(function () {
        if (i > x) {
            return 0;
        }
        p.innerHTML = i;
        i++;
        timeout();
    }, 50);
}


$('.content').waypoint(function (dir) {
    if (dir === 'down') {
        timeout()
    }
}, {
    offset: '70%'
});
*/
