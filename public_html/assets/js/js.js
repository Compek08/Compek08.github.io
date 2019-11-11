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

    $.fn.compekFile = function () {
        this.html(`<img src="../assets/img/Profile.png" alt="Profile" id="prev" class="pointer" title="Ubah Foto Profil"/><input type="file" id="profilePic" name="profilePic" class="hidden" accept="image/*">`);

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#prev').attr('src', e.target.result);
                    console.log(e.target.result);
                };

                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#profilePic").change(function () {
            readURL(this);
        });
    };

    $('.image').compekFile();

    $.fn.validate = function () {
        this.submit(function (ev) {
            ev.stopPropagation();
            retun = true;
            $("form#form :input").each(function () {
                name = $(this).attr('name');
                if (name === 'alamat') {
                    value = $(this).html();
                } else {
                    value = $(this).val();
                }
                console.log(name, value);
                regex = '';
                kosong = $.isEmptyObject(value) && name !== 'profilePic';
                if (name === 'nama') {
                    regex = /^[a-zA-Z]+( *[a-zA-Z']+)*$/;
                    pesan = "Hanya Boleh Memasukkan Format Nama";
                } else

                if (name === 'nis') {
                    regex = /^[0-9]{8}$/;
                    pesan = "Hanya Boleh Memasukkan Format Angka 8 Digit";
                } else

                if (name === 'alamat') {
                    regex = /^([j][l][.][ ])([a-z0-9 .])+((([ ][n][o][.][ ])|([\/]))[0-9]+[a-z]*)$/i;
                    pesan = "Masukan Alamat yang Benar";
                } else

                if (name === 'email') {
                    regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
                    pesan = "Masukan Format Alamat E-mail yang Benar";
                } else

                if (name === 'gender') {
                    regex = /((Laki-laki)|(Perempuan))$/;
                    pesan = "Masukan Jenis Kelamin";
                } else

                if (name === 'password') {
                    regex = /([\s\S]{8,})$/;
                    pesan = "Password Minimal 8 Digit";
                } else

                if (name === 'profilePic') {
                    regex = /([\s\S])+((.jpg)|(.jpeg)|(.tiff)|(.gif)|(.png)|(.bmp))$/i;
                    pesan = "File Harus Gambar";
                } else

                if (kosong) {
                    pesan = "Tidak Boleh Kosong";
                }

                if (!value.match(regex) || kosong) {
                    console.log(pesan);
                    $(this).addClass('error');
                    retun = false;
                    return false;
                } else {
                    $(this).removeClass('error');
                }
            });
            console.log(retun);
            if (retun) {
                return true;
            } else {
            return false;
            }
        });
    };

    $('#form').validate();

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

function btnEdit() {
    if ($('#cek').is(':disabled')) {
        var pass = $('#password').val();
        sessionStorage.pass = pass;
        openPass();
    } else {
        var pass = $('#password').val();
        var vpass = $('#vpassword').val();
        if (pass === vpass) {
            $("#form :input").prop("disabled", true);
            $('#hide').addClass("hidden");
            $('#sbm').prop("value", "Edit");
        } else {
            alert("Wrong Password");
        }
    }
    $("#form :submit").prop("disabled", false);
}

function openPass() {
    $('#Pass').removeClass("hidden");
}

function closePass() {
    $('#Pass').addClass("hidden");
}

function submitPass() {
    var pass = $('#passw').val();
    if (sessionStorage.pass === pass) {
        closePass();
        $("#form :input").prop("disabled", false);
        $('#hide').removeClass("hidden");
        $('#sbm').prop("value", "Save");
    } else {
        alert("Wrong Password");
        closePass();
    }
}
