/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if (page == "Login.html" || page == "Register.html") {
    if (!$.isEmptyObject(sessionStorage.user)) {
        saveStorage("Home");
        location.href = "Home.html";
    }
} else {
    if ($.isEmptyObject(sessionStorage.user)) {
        saveStorage("Login");
        location.href = "Login.html";
    } else
        user();
}

$(document).ready(function () {
    if (sessionStorage.user) {
        changeData();
    }

    if (typeof readStorage() === 'undefined' || readStorage() === null) {
        saveStorage('Login');
    }

    var header = document.getElementById("navbar");
    var mn = header.getElementsByClassName(readStorage());

    $("." + readStorage()).addClass("active");
    console.log(readStorage());

    window.onscroll = function () {
        secrol();
    };

    var navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;

    iterasi = 0;
    last = false;
    skip = false;
    function secrol() {
        if (window.innerWidth >= 600) {
            if (window.pageYOffset >= sticky) {
                navbar.classList.add("sticky");
            } else {
                navbar.classList.remove("sticky");
            }
        } else {
            navbar.classList.remove("sticky");
        }

        if (page == "Course.html" && !skip) {
            processing = false;
            if (!last) {
                console.log("Last If");
                hal = "page";
//                iterasi = 1;
                if (processing)
                    return false;

                if ($(window).scrollTop() >= $(document).height() - $(window).height() - 1) {
                    delete(pageData);
                    processing = true;
                    iterasi++;
                    $.getJSON("../assets/json/json.json", function (data) {
                        pageData = data[1].Pages[hal + iterasi];
                        if (pageData) {
                            $(pageData).each(function (n, val) {
                                $("#pertemuan").append("<h2>" + val.pert + "</h2>");
                            });
                        } else {
                            last = true;
                        }
                        processing = false;
                    });
                }
            } else {
                console.log("Last Page Reached");
                skip = true;
            }
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
        if (readStorage() !== "Compek") {
            this.html(`<img src="../assets/img/Profile.png" alt="Profile" id="prev" class="pointer" title="Ubah Foto Profil"/><input type="file" id="profilePic" name="profilePic" class="hidden" accept="image/*">`);
        } else {
            this.html(`<img src="../assets/img/` + user.getPicture() + `" alt="Profile" id="prev" class="pointer" title="Ubah Foto Profil"/><input type="file" id="profilePic" name="profilePic" class="hidden" disabled accept="image/*">`);
        }

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
        $("#password, #vpassword").focus(function () {
            $(this).val("");
        });
        this.submit(function (ev) {
            ev.stopPropagation();
            retun = true;
            $("form#form :input").each(function () {
                name = $(this).attr('name');
//                if (name === 'alamat') {
//                    value = $(this).val();
//                } else {
//                    value = $(this).val();
//                }
                value = $(this).val();
                console.log(name, value);
                regex = '';
                kosong = $.isEmptyObject(value) && name !== 'profilePic';

                if (kosong) {
                    console.log("KOSONGG!!!");
                    pesan = formatting(name) + " Tidak Boleh Kosong";
                } else

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

                if (name === 'vpassword') {
                    if ($("#password").val() == $("#vpassword").val()) {
                        regex = /([\s\S]{8,})$/;
                        pesan = "Password Minimal 8 Digit";
                    } else {
                        regex = /{}$/;
                        pesan = "Password not Match"
                    }
                } else

                if (name === 'profilePic') {
                    regex = /([\s\S])+((.jpg)|(.jpeg)|(.tiff)|(.gif)|(.png)|(.bmp))$/i;
                    pesan = "Format File Harus Gambar";
                }

                if ((kosong || !value.match(regex)) && !(name === 'profilePic' && !value)) {
                    alert(pesan);
                    $(this).addClass('error');
                    $(this).focus();
                    retun = false;
                    return false;
                } else {
                    $(this).removeClass('error');
                }
            });
            console.log("Retun Awal " + retun);
            if (retun) {
                if (page == "Login.html") {
                    login();
                    return false;
                } else {
                    btnEdit(true);
                    return true;
                }
            } else {
                return false;
            }
        });
    };

    $('#form').validate();

    document.title = readStorage() + " MELSA";
});

function formatting(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function saveStorage(value) {
    sessionStorage.storage = value;
}

function readStorage() {
    return sessionStorage.storage;
}

function logOut() {
    sessionStorage.clear();
}

function btnEdit(bool = false) {
    if (bool) {
        var pass = $('#password').val();
        var vpass = $('#vpassword').val();
        if (pass === vpass) {
            user.updateUser();
            $("#form :input").prop("disabled", true);
            $('#hide').addClass("hidden");
            $('#sbm').prop("value", "Edit");
        } else {
            alert("Wrong Password");
        }
    } else {
        if ($('#nama').is(':disabled')) {
//            var pass = $('#password').val();
//            sessionStorage.pass = pass;
            openPass();
        }
    }
    $("#form :submit").prop("disabled", false);
}

function openPass() {
    $('#Pass').removeClass("hidden");
    $('#Pass').addClass('showModal');
    $('#Pass').removeClass('hideModal');
    $('#passw').focus();
}

function closePass() {
//    $('#Pass').addClass("hidden");
    $('#Pass').removeClass('showModal');
    $('#Pass').addClass('hideModal');
}

$(document).keyup(function (e) {
    if (e.key === "Escape") {
        closePass();
    }
});

function submitPass() {
    var pass = $('#passw').val();
    if (user.getPassword() === pass) {
        closePass();
        $("#password").val(user.getPassword());
        $("#form :input").prop("disabled", false);
        $('#hide').removeClass("hidden");
        $('#sbm').prop("value", "Save");
    } else {
        alert("Wrong Password");
        closePass();
    }
}

function login() {
    $.getJSON("../assets/json/json.json", function (data) {
        nis = "16161010";
        nis = $("#NIS").val();
//        console.log(nis);
        pass = "12341234";
        pass = $("#Password").val();
//        console.log(pass);
        user = data[0].users[nis];
        if (user) {
            if (pass === user.Password) {
                sessionStorage.user = JSON.stringify(user);
                location.replace("Home.html");
            } else {
                alert("Wrong Password!");
            }
        } else {
            alert("NIS Not Found!");
        }
    })
            .fail(function () {
                alert("File Json not Found!");
            });
}

function user(User) {
    User = JSON.parse(sessionStorage.user);

//    this.compek = function(){console.log("Compek");};

    function getRole() {
        return User.Role;
    }

    function getName() {
        return User.Name;
    }

    function getNis() {
        return User.NIS;
    }

    function getAddress() {
        return User.Address;
    }

    function getEmail() {
        return User.Email;
    }

    function getSex() {
        return User.Sex;
    }

    function getPicture() {
        return User.Picture;
    }

    function getPassword() {
        return User.Password;
    }

    function updateUser() {
        User.Name = $("#nama").val();
        User.Address = $("#alamat").val();
        User.Email = $("#email").val();
        User.Password = $("#password").val();
        User.Picture = $("#profilePic").val().split("\\").pop();
        sessionStorage.user = JSON.stringify(User);
        console.log(sessionStorage.user);
    }

    user.getRole = getRole;
    user.getName = getName;
    user.getNis = getNis;
    user.getAddress = getAddress;
    user.getEmail = getEmail;
    user.getSex = getSex;
    user.getPicture = getPicture;
    user.getPassword = getPassword;
    user.updateUser = updateUser;
}

function changeData() {
    $("#user").html(user.getName().split(" ")[0]);

    if (page == "Calendar.html") {
        delete(d);
        d = undefined;
        d = new Date();
        now = d.getDate();

        $.fn.setDate = function () {
            this.each(function () {
                if ($(this).html() == now && !$(this).attr('class')) {
                    console.log(this);
                    $(this).html("<span class='active'>" + now + "</span>");
                }
            });
        };

        $("ul.days li").setDate();
    }

    if (page == "Profile.html") {
        $("#nis").html(user.getNis());
        $("#nama").val(user.getName());
        $("#alamat").val(user.getAddress());
        $("#email").val(user.getEmail());
        $("#jk").html(user.getSex());
        $("#password").val("********");
        $("#profilePic").val(user.getPicture());
    }
}