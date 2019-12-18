/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if (user.getRole() !== "Teacher") {
    console.log(user.getRole());
    saveStorage('Home');
    location.replace('Home.html');
}

$(document).ready(function () {
//    if (page === "Upload.html") {
////        cat = undefined;
//        $('input[name=category]').change(function () {
//            cat = $(this).val();
//            $.get('teacher/' + cat + '.html', function (isiCat) {
//                $('#isiCat').html(isiCat);
//            });
//            if (cat === 'Assignment' || cat === 'Subject') {
//                $('#dnd').removeClass('hidden');
//            } else {
//                $('#dnd').addClass('hidden');
//
//                if (cat === 'Quiz') {
//                    date = new Date();
//                    tgl = date.getFullYear() + '-' + ('0' + date.getMonth() + 2).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
//                    console.log(tgl);
//                    jam = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
//                    console.log(jam);
//                    wait($('.dp').html());
//                    console.log($('.dp').html());
//                    console.log($('.tp').html());
//                    $('.dp').val(tgl);
//                    $('.tp').val(jam);
//                    $('.datetimepicker').each(function (n, dt) {
//                        console.log($(dt).html());
//                        $(this).find('.tp').change(function () {
//                            val = $(dt).find('.dp').val();
//                            console.log(val);
//                            if (val < tgl) {
//                                $(dt).addClass('error');
//                            }
//                        });
//                    });
//
//                    $('input[name=question]').change(function () {
//                        val = $(this).val();
//                        console.log(val);
//                        if (val === "Upload") {
//                            $('#dnd').removeClass('hidden');
//                        } else {
//                            $('#dnd').addClass('hidden');
//                        }
//                    });
//                }
//            }
//        });
//    }

//        $('input[type=date]').each(function (n) {
//            console.log(n);
//            $(this).val(now);
//            console.log($(this).val());
//            $(this).change(function () {
//                var pilih = $(this).val();
//                console.log(pilih);
//                var pilih = pilih.split("-");
//                console.log(pilih);
//                var pilih = new Date(pilih[0], pilih[1] - 1, pilih[2]);
//                console.log(pilih);
//                console.log(date > pilih);
//                if (date > pilih) {
//                    $("<div class=\"message-warning\">This subscription is expired</div>")
//                            .insertAfter(this);
//                }
//            });
//        });
//    }
});

//function refresh(value) {
//    $('.dp').val(tgl);
//    $('.tp').val(jam);
//}