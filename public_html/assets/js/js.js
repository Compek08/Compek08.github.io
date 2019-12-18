/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if (page == "Login.html" || page == "Register.html") {
    if (!$.isEmptyObject(session.user())) {
        saveStorage("Home");
        location.replace("Home.html");
    }
} else {
    if ($.isEmptyObject(session.user())) {
        saveStorage("Login");
        location.replace("Login.html");
    } else
        user();
}

$(document).ready(function () {
    if (session.user()) {
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
                                $("#pertemuan").append("<a><h2>" + val.pert + "</h2></a>");
                            });
                            changeData();
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

    $.fn.validate = function () {
        $("#password, #vpassword").focus(function () {
            $(this).val("");
        });
        this.submit(function (ev) {
            ev.stopPropagation();
            retun = true;
            $("form#form :input").each(function () {
                name = $(this).attr('name');
                value = $(this).val();
                console.log(name, value);
                kosong = $.isEmptyObject(value) && name !== 'profilePic';
                if (!name.match(/^(answer|question|text)(\[(\d)*\]){1,2}$/)) {
                    regex = '';

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
                    } else

                    if (name === 'startT' || name === 'endT') {
                        pesan = 'Value Tidak Valid!';
                        if (name !== 'startT') {
                            if (+start > +value) {
                                pesan = 'Start Harus Kurang Dari End!';
                                kosong = true;
                            }
                        } else
                            start = value;
                        regex = /[0-1][0-9]|20$/;
                    } else

                    if (name === 'start' || name === 'end') {
                        if (name !== 'start') {
                            tglJam = new Date(start);
                            psn = 'Start';
                        } else {
                            tglJam = new Date();
                            psn = 'Sekarang';
                        }
                        regex = /^.*$/;
                        console.log(value);
                        value = new Date(value);
                        console.log(value);
                        console.log(tglJam);
                        console.log(value < tglJam);
                        if (value < tglJam) {
                            pesan = "Tanggal Melewati Batas " + psn + "!";
                            kosong = true;
                        } else
                            value = "" + value;
                        start = value;
                    }

                    if ((kosong || !value.match(regex)) && !(name === 'profilePic' && !value)) {
                        alert(pesan);
                        if (name === 'start' || name === 'end') {
                            $(this).parent().addClass('error');
                        } else
                            $(this).addClass('error');
                        $(this).focus();
                        retun = false;
                        return false;
                    } else {
                        if (name === 'start' || name === 'end') {
                            $(this).parent().removeClass('error');
                        } else
                            $(this).removeClass('error');
                    }
                } else {
                    retun = extValidation(this);
                    return retun;
                }
            });

            console.log("Retun Awal " + retun);
            if (retun) {
                if (page == "Login.html") {
                    login();
                    return false;
                } else {
                    if (page == 'Upload.html') {
                        location.replace('Course.html');
                    }
                    if (page == "Profile.html") {
                        btnEdit(true);
                    }
                    return true;
                }
            } else {
                return false;
            }
        });
    };

    if (page == "Upload.html") {
        var isAdvancedUpload = function () {
            var div = document.createElement('div');
            return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
        }();

        form = $('.box');
        var input = $(form).find('input[type="file"]'),
                label = $(form).find('label'),
                droppedFiles = false,
                showFiles = function (files) {
                    $(label).text(files.length > 1 ? ($(input).attr('data-multiple-caption') || '').replace('{count}', files.length) : files[ 0 ].name);
                };

        $(input).change(function (e) {
            showFiles(e.target.files);
            $(form).trigger('submit');
//                triggerFormSubmit();
            console.log("Uploading Manual!!");
//            $(".box__button").addClass("block");
        });

        contain = function (target, pattern) {
            var value = 0;
            pattern.forEach(function (word) {
                value = value + target.includes(word);
            });
            console.log(target);
            console.log(value === 1);
            return (value === 1);
        };

        if (isAdvancedUpload) {
            console.log("Advanced Upload");
            $(form).addClass('has-advanced-upload');

            var droppedFiles = false;

            $(form).on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
                e.preventDefault();
                e.stopPropagation();
            })
                    .on('dragover dragenter', function () {
                        $(form).addClass('is-dragover');
                    })
                    .on('dragleave dragend drop', function () {
                        $(form).removeClass('is-dragover');
                    })
                    .on('drop', function (e) {
                        droppedFiles = e.originalEvent.dataTransfer.files;
                        showFiles(droppedFiles);
                        $(form).trigger('submit');
//                            triggerFormSubmit();
                        console.log("Uploading Auto!!");
//                        $(".box__button").addClass("block");
                    });
        }

        $(form).submit(function (e) {
            if ($(form).hasClass('.is-uploading')) {
                console.log("In Progress!");
                return false;
            }
            $(form).addClass('is-uploading').removeClass('is-error').removeClass('is-success');

            if (isAdvancedUpload) {
                e.preventDefault();

                if (droppedFiles) {
                    stat = true;
                    $.each(droppedFiles, function (i, file) {
                        ext = $(file).attr('name') + "";
                        ext = ext.split(".").pop();
                        if (cat == "Quiz") {
                            type = ['html'];
                        } else
                            type = ['doc', 'xls', 'ppt', 'txt', 'pdf', 'jpg', 'jpeg', 'tiff', 'gif', 'png', 'bmp', 'zip', 'rar'];
                        console.log(ext);
                        if (!contain(ext, type)) {
                            stat = false;
                        }
                    });
                }

                console.log("Sek Aplot");
                statUpload(stat, droppedFiles.length);
            }
        });

        function statUpload(stat, kali = 1) {
            console.log("Mari Aplot");
            ngenteni = function () {
                if (stat) {
                    $(form).removeClass('is-uploading');
                    $(form).addClass('is-success');
                } else {
                    $(form).removeClass('is-uploading');
                    $(form).addClass('is-error');
                }
            };
            setTimeout(ngenteni, (kali * 300));
        }

        $('.box a').on('click', function () {
            console.log("Restart");
            $(form).removeClass('is-success');
            $(form).removeClass('is-error');
            $(label).html('<strong>Choose a file</strong><span class="box__dragndrop"> or drag it here</span>.');
        });
    }

    var toggler = document.getElementsByClassName("caret");
    var i;

    for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function () {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
        });
    }

    $('.image').compekFile();

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
    session.delete('user');
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
//        nis = "16161010";
        nis = $("#NIS").val();
//        console.log(nis);
//        pass = "12341234";
        pass = $("#Password").val();
//        console.log(pass);
        user = data[0].users[nis];
        if (user) {
            if (pass === user.Password) {
                session.create('user', JSON.stringify(user), 1);
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
    User = JSON.parse(session.user());
//    console.log(User);
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

    function getGrade() {
        return User.Grade;
    }

    function updateUser() {
        User.Name = $("#nama").val();
        User.Address = $("#alamat").val();
        User.Email = $("#email").val();
        User.Password = $("#password").val();
        User.Picture = $("#profilePic").val().split("\\").pop();
        session.create('user', JSON.stringify(User), 1);
        console.log(session.user());
    }

    user.getRole = getRole;
    user.getName = getName;
    user.getNis = getNis;
    user.getAddress = getAddress;
    user.getEmail = getEmail;
    user.getSex = getSex;
    user.getPicture = getPicture;
    user.getPassword = getPassword;
    user.getGrade = getGrade;
    user.updateUser = updateUser;
}

function changeData() {
    $("#user").html(user.getName().split(" ")[0]);

    if (page == "Calendar.html") {
        delete(d);
        d = undefined;
        d = new Date();
        now = d.getDate();

        setDate = function (target) {
            target.each(function () {
                if ($(this).html() == now && !$(this).attr('class')) {
                    console.log(this);
                    $(this).html("<span class='active'>" + now + "</span>");
                }
            });
        };

        setDate($("ul.days li"));
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

    if (page === "Upload.html") {
        if (user.getRole() !== "Teacher") {
            saveStorage('Home');
            location.replace('Home.html');
        }

        $('input[name=category]').change(function () {
            cat = $(this).val();
            $.get('teacher/' + cat + '.html', function (isiCat) {
                $('#isiCat').html(isiCat);
            });
            if (cat === 'Assignment' || cat === 'Subject') {
                $('#dnd').removeClass('hidden');
            } else {
                $('#dnd').addClass('hidden');
            }
        });
    }

    if (page === "Rank.html") {
        users = null;
        mean = null;
        rank = [];
        $('#grade').click(function () {
            $('#grades').html('');
            $.getJSON("../assets/json/json.json", function (data) {
                users = data[0].users;
                mean = data[0].users;

                console.log(users);
                $.each(users, function (key, data) {
//                    console.log(key, data);
                    if (data.Role === user.getRole()) {
                        rank.push({v: (data.Grade.Sum), m: (data.Grade.Mean), k: key});
                    }
                    rank.sort(function (a, b) {
                        if (a.v < b.v) {
                            return 1
                        }
                        if (a.v > b.v) {
                            return -1
                        }
                        return 0;
                    });
                });
                console.log(rank);
                $.each(rank, function (key, obj) {
                    $('#grades').append(`
                            <a><h3>` + (key + 1) + `. ` + obj.k + `</h3>
                                    <h4 class="mg-l-30 mg-t--10">` + obj.v + ` ( ` + obj.m + ` ) </h4></a>`);
                });
            })
                    .fail(function () {
                        alert("File Json not Found!");
                    });
        });
    }

    if (page === "Grades.html") {
        $('#grade').click(function () {
            $('#grades').html('');
//            console.log(user.getGrade());
            $.each(user.getGrade(), function (key, val) {
                console.log(user.getGrade().Mean);
                console.log(key);
                console.log(val);
                $('#grades').append(`
                            <a><h3>` + key + ` ( ` + val + ` )</h3></a>`);
            });
        });
    }

    if (page === "Home.html") {
        if (user.getRole() === "Teacher") {
            $('div.course.col-5.col-s-6').attr('class', 'course col-6 col-s-6');
            $('div.course.col-4.col-s-6').attr('class', 'hidden');
            $('div.course.col-3').attr('class', 'course col-6 col-s-6');
        }

        $('#grades').html('');
        console.log(user.getGrade());
        $.each(user.getGrade(), function (key, val) {
            console.log(user.getGrade().Mean);
            console.log(key);
            console.log(val);
            $('#grades').append(`
                            <a onclick="saveStorage('Course')" href="Grades.html"><h3>` + key + ` ( ` + val + ` )</h3></a>`);
        });
    }

    if (page === "Course.html") {
        user.getRole() === 'Teacher' ? $('#pertemuan a').prop('href', 'Upload.html') : $('#pertemuan a').prop('href', 'javascript:void(0)');
//        if (user.getRole() === 'Teacher')
//            $('#pertemuan a').prop('href', 'Upload.html');
//        else
//            $('#pertemuan a').prop('href', 'javascript:void(0)');
    }
}