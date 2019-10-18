/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    if (typeof readStorage() === 'undefined' || readStorage() === null) {
        saveStorage('Login');
    }

    var header = document.getElementById("navbar");
    var mn = header.getElementsByClassName(readStorage());

    $("." + readStorage()).addClass("active");
    console.log(readStorage());

    window.onscroll = function () {
        myFunction();
    };

    var navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;

    function myFunction() {
        if (window.innerWidth >= 600) {
            if (window.pageYOffset >= sticky) {
                navbar.classList.add("sticky");
            } else {
                navbar.classList.remove("sticky");
            }
        } else {
            navbar.classList.remove("sticky");
        }
    }

    var toggler = document.getElementsByClassName("caret");
    var i;

    for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function () {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
        });
    }
    
    document.title = readStorage() + " MELSA";
});

function saveStorage(value) {
    sessionStorage.storage = value;
}

function readStorage() {
    return sessionStorage.storage;
}

function clearStorage() {
    sessionStorage.clear();
}
