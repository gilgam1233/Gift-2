// ds khi người chơi ấn chọn
let list = Array.from({ length: 14 }, () => new Array(4).fill(null));
// ds sau khi đã chuyển về mảng một chiều
let list1d;
// ds dùng để kiểm tra xem bài hát đó đã được phát chưa
let listBool;
// kiểm tra kết quả 
let result = 0;
// lưu lại thời gian phát nhạc
let startTimeGame;
// kiểm tra xem người chơi có ấn nút start ở main-game-container chưa
let flagChoi = false;
// kiểm tra xem đây có phải là lần đầu list1d được khởi tạo hay không
let flagList = false;
// thời gian tối đa cho hiệu ứng biến mất của thông báo
let maxTime = 5;
// dùng để đếm bài nhạc hiện tại
let trackList = 1;
// dùng để kiểm tra xem có đến thời gian tối đa đã quy định chưa
let count = 0;
// thời gian đoán của người chơi
let thoiGianDoan = 2;
// thời gian bài nhạc phát cho người chơi nghe
let thoiGianPhatNhacToiDa = 10;
// ds lưu các phím đã ấn 
const pressedKeys = new Set();
// dùng để xác định xem có phát sinh thời gian phát ngẫu nhiên hay không
let flagNgauNhien = false;
/*
    đường dẫn - đáp án 1 -  đáp án 2 -  đáp án 3 -  đáp án 4 -  đáp án đúng - thời gian bắt đầu- tên bài hát
    0(path)-1(rs 1)-2(rs 2)-3(rs 3)-4(rs 4)-5(correct rs)-6(time start) - 7(name song)
*/
let data = {
    //Girl Groups
    NMIXX: ["./AUDIO/NMIXX/LoveisLonely.mp3-NMIXX-aespa-Dreamcatcher-ITZY-0-100-NMIXX/Love Is Lonely",
        "./AUDIO/NMIXX/MyGosh.mp3-XG-aespa-Viviz-NMIXX-3-100-NMIXX/My Gosh",
        "./AUDIO/NMIXX/RollerCoaster.mp3-LE SSERAFIM-NMIXX-BABYMONSTER-aespa-1-100-NMIXX/Roller Coaster"],
    aespa: ["./AUDIO/aespa/Armageddon.mp3-Viviz-aespa-Dreamcatcher-XG-1-100-aespa/Armageddon",
        "./AUDIO/aespa/Drama.mp3-aespa-BABYMONSTER-NMIXX-LE SSERAFIM-0-100-aespa/Drama",
        "./AUDIO/aespa/NextLevel.mp3-NMIXX-XG-aespa-Viviz-2-100-aespa/Next Level"],
    Dreamcatcher: ["./AUDIO/Dreamcatcher/Airplane.mp3-Viviz-aespa-Dreamcatcher-XG-2-100-Dreamcatcher/Airplane",
        "./AUDIO/Dreamcatcher/Justice.mp3-ITZY-NMIXX-BABYMONSTER-Dreamcatcher-3-100-Dreamcatcher/Justice",
        "./AUDIO/Dreamcatcher/Piri.mp3-Dreamcatcher-aespa-LE SSERAFIM-XG-0-100-Dreamcatcher/Piri"],
    BABYMONSTER: ["./AUDIO/Babymonster/ClikClak.mp3-BABYMONSTER-aespa-LE SSERAFIM-XG-0-100-BABYMONSTER/Clik Clak",
        "./AUDIO/Babymonster/Drip.mp3-XG-NMIXX-BABYMONSTER-LE SSERAFIM-2-100-BABYMONSTER/Drip",
        "./AUDIO/Babymonster/Sheesh.mp3-ITZY-NMIXX-Dreamcatcher-BABYMONSTER-3-100-BABYMONSTER/Sheesh"],
    ITZY: ["./AUDIO/ITZY/DallaDalla.mp3-NMIXX-aespa-Dreamcatcher-ITZY-3-100-ITZY/Dalla Dalla",
        "./AUDIO/ITZY/InTheMorning.mp3-ITZY-NMIXX-XG-Viviz-0-100-ITZY/In The Morning",
        "./AUDIO/ITZY/Wannabe.mp3-Dreamcatcher-XG-ITZY-LE SSERAFIM-4-100-ITZY/Wannabe"],
    LESSERAFIM: ["./AUDIO/le sserafim/Crazy.mp3-BABYMONSTER-aespa-LE SSERAFIM-XG-2-100-LE SSERAFIM/Crazy",
        "./AUDIO/le sserafim/PerjectNight.mp3-LE SSERAFIM-Viviz-Dreamcatcher-NMIXX-0-100-LE SSERAFIM/Perfect Night",
        "./AUDIO/le sserafim/Smart.mp3-Viviz-NMIXX-XG-LE SSERAFIM-3-100-LE SSERAFIM/Smart"],
    Viviz: ["./AUDIO/Viviz/Bopbop.mp3-Viviz-NMIXX-XG-LE SSERAFIM-0-100-Viviz/Bop Bop",
        "./AUDIO/Viviz/Maniac.mp3-XG-NMIXX-aespa-Viviz-3-100-Viviz/Maniac",
        "./AUDIO/Viviz/Shhh.mp3-LE SSERAFIM-Viviz-aespa-Dreamcatcher-1-100-Viviz/Shhh"],
    XG: ["./AUDIO/XG/LEFTRIGHT.mp3-Viviz-NMIXX-XG-LE SSERAFIM-2-100-XG/Left Right",
        "./AUDIO/XG/ShootingStar.mp3-BABYMONSTER-NMIXX-aespa-XG-3-100-XG/Shooting Star",
        "./AUDIO/XG/SomethingAintRight.mp3-Viviz-XG-NMIXX-BABYMONSTER-1-100-XG/Something Ain't Right"],
    //Boy Groups
    SEVENTEEN: ["./AUDIO/Seventeen/Flower.mp3-Stray Kids-KickFlip-SEVENTEEN-TEMPEST-2-100-SEVENTEEN/Flower",
        "./AUDIO/Seventeen/Last Night.mp3-SEVENTEEN-ENHYPEN-ATEEZ-TEMPEST-0-100-SEVENTEEN/Last Night",
        "./AUDIO/Seventeen/Maestro.mp3-ENHYPEN-ATEEZ-KickFlip-SEVENTEEN-3-100-SEVENTEEN/Maestro"],
    StrayKids: ["./AUDIO/Stray Kids/GodsMenu.mp3-Stray Kids-KickFlip-SEVENTEEN-TEMPEST-0-100-Stray Kids/Gods Menu",
        "./AUDIO/Stray Kids/Venom.mp3-ATEEZ-ENHYPEN-Stray Kids-TEMPEST-2-100-Stray Kids/Venom",
        "./AUDIO/Stray Kids/Lalalala.mp3-SEVENTEEN-KickFlip-ATEEZ-Stray Kids-3-100-Stray Kids/LALALALA"],
    KickFlip: ["./AUDIO/KickFlip/Freeze.mp3-Stray Kids-KickFlip-SEVENTEEN-TEMPEST-1-100-KickFlip/Freeze",
        "./AUDIO/KickFlip/Mama Said.mp3-KickFlip-ATEEZ-ENHYPEN-Stray Kids-0-100-KickFlip/Mama Said",
        "./AUDIO/KickFlip/See You On Tomorrow.mp3-Stray Kids-ATEEZ-SEVENTEEN-KickFlip-3-100-KickFlip/See You On Tomorrow"],
    TEMPEST: ["./AUDIO/TEMPEST/Dragon.mp3-Stray Kids-KickFlip-SEVENTEEN-TEMPEST-3-100-TEMPEST/Dragon",
        "./AUDIO/TEMPEST/LIGHTHOUSE.mp3-TEMPEST-ATEEZ-SEVENTEEN-Stray Kids-0-100-TEMPEST/LIGHTHOUSE",
        "./AUDIO/TEMPEST/Vroom Vroom.mp3-KickFlip-SEVENTEEN-TEMPEST-ATEEZ-2-100-TEMPEST/Vroom Vroom"],
    ATEEZ: ["./AUDIO/ATEEZ/BOUNCY (K-HOT CHILLI PEPPERS).mp3-TEMPEST-ATEEZ-SEVENTEEN-Stray Kids-1-100-ATEEZ/BOUNCY (K-HOT CHILLI PEPPERS)",
        "./AUDIO/ATEEZ/Deja Vu.mp3-SEVENTEEN-Stray Kids-KickFlip-ATEEZ-3-100-ATEEZ/Deja Vu",
        "./AUDIO/ATEEZ/WONDERLAND.mp3-TEMPEST-KickFlip-ATEEZ-ENHYPEN-2-100-ATEEZ/WONDERLAND"],
    ENHYPEN: ["./AUDIO/ENHYPEN/No Doubt.mp3-TEMPEST-KickFlip-ATEEZ-ENHYPEN-3-100-ENHYPEN/No Doubt",
        "./AUDIO/ENHYPEN/Sweet Venom.mp3-ENHYPEN-SEVENTEEN-Stray Kids-KickFlip-0-100-ENHYPEN/Sweet Venom",
        "./AUDIO/ENHYPEN/XO (Only If You Say Yes).mp3-TEMPEST-SEVENTEEN-ENHYPEN-ATEEZ-2-100-ENHYPEN/XO (Only If You Say Yes)"],
};

function coPhatSinhNgauNhien(element) {
    flagNgauNhien = element.checked;
}

function kiemTraToHop() {
    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        pressedKeys.add(key);

        if (pressedKeys.has('v') && key === 'y') {

            pressedKeys.clear();
            window.location.href = "./HTML/main.html";

        }
    });

    document.addEventListener('keyup', (e) => {
        pressedKeys.delete(e.key.toLowerCase());
    });
}

function chinhSrcVaTen(source, name) {
    $("#audioPhatLai").attr("src", source);
    let newStr = name.replace("/", " - ");
    $(".menu-song > p").text(newStr);
}

function capNhatThoiGianNghe(element) {
    thoiGianDoan = parseInt(element.value);

}

function resetTroChoi() {
    trackList = 1;
    flagChoi = false;
    flagList = false;
    $("#setting").css("pointer-events", "all");

    $("#trackNum").text(`#${trackList}`);

    $(".main-game").addClass("bienMat").on("animationend", function () {
        $(this).removeClass("bienMat").addClass("hidden").off("animationend");
        $("#startGame").removeClass("hidden").addClass("xuatHien").on("animationend", function () {
            $(this).removeClass("xuatHien");
        });
        $("#playGame").removeClass("hidden");
    });
}

function gioiHanThoiGianNhac(element) {
    let check = parseInt(element) + parseInt(thoiGianDoan);
    let timer = setInterval(() => {
        if ($("#audioGame")[0].currentTime >= check) {
            clearInterval(timer);
            $("#audioGame")[0].pause();
            anXuatDapAn("1");

        }
    }, 100);
}

function tiepTucTroChoi() {
    if (trackList < list1d.length) {


        $("#playGame").removeClass("hidden").addClass("xuatHien").on("animationend", function () {
            $(this).removeClass("xuatHien hidden");

        });

        $("#trackNum").addClass("bienMat").on("animationend", function () {
            $("#trackNum").removeClass("bienMat").addClass("hidden").off("animationend");
            trackList += 1;
            $("#trackNum").text(`#${trackList}`);

            $("#trackNum").removeClass("hidden").addClass("xuatHien").on("animationend", function () {
                $(this).removeClass("xuatHien").off("animationend");
            });
        });
    }
    else {
        $("#resetGame").removeClass("hidden").addClass("xuatHien").on("animationend", function () {
            $(this).removeClass("xuatHien").off("animationend");
        });
    }
}

function xuLyDapAn() {
    let parent = document.getElementById("items-containter");

    parent.addEventListener("click", function (event) {

        const index = Array.from(parent.children).indexOf(event.target);

        if (flagChoi) {
            $("#checkDung").addClass("hidden");
            $("#checkSai").addClass("hidden");


            if (index == result) {
                $("#checkDung").removeClass("hidden");
                $(".thongBaoTroChoi").css("background-color", "palegreen");
                $(".thongBaoTroChoi > div").text("Bạn đã đoán đúng!!!");

            }
            else {
                $(".thongBaoTroChoi").css("background-color", "#f84545");

                $("#checkSai").removeClass("hidden");
                $(".thongBaoTroChoi > div").text("Bạn đã đoán sai!!!");
            }
            $(".thongBaoTroChoi").removeClass("hidden");
            $("#audio")[0].pause();
            anThongBao();
            flagChoi = false;
        }


    });
}

function xuLyList() {
    list1d = list.flat();
    list1d = list1d.filter(str => str !== null);
    list1d = list1d.filter(str => str.includes("/"));

    listBool = new Array(list1d.length).fill(false);

}

// code siu dài
function anXuatDapAn(element) {
    $(".items").css("pointer-events", "none");

    // xuất hiện
    if (parseInt(element) == 1) {
        $(".items").eq(0).removeClass("hidden").addClass("xuatHien").on("animationend", function () {
            $(".items").eq(0).removeClass("xuatHien").off("animationend");
            $(".items").eq(1).removeClass("hidden").addClass("xuatHien").on("animationend", function () {
                $(".items").eq(1).removeClass("xuatHien").off("animationend");
                $(".items").eq(2).removeClass("hidden").addClass("xuatHien").on("animationend", function () {
                    $(".items").eq(2).removeClass("xuatHien").off("animationend");

                    $(".items").eq(3).removeClass("hidden").addClass("xuatHien").on("animationend", function () {
                        $(".items").eq(3).removeClass("xuatHien").off("animationend");
                        $(".items").css("pointer-events", "all");

                    });

                });

            });
        });
    }
    else if (parseInt(element) == 2) {
        $("#volIcon").css("pointer-events", "none");

        $(".items").eq(0).addClass("bienMat").on("animationend", function () {

            $(".items").eq(0).removeClass("bienMat").addClass("hidden").off("animationend");
            $(".items").eq(1).addClass("bienMat").on("animationend", function () {

                $(".items").eq(1).removeClass("bienMat").addClass("hidden").off("animationend");
                $(".items").eq(2).addClass("bienMat").on("animationend", function () {

                    $(".items").eq(2).removeClass("bienMat").addClass("hidden").off("animationend");
                    $(".items").eq(3).addClass("bienMat").on("animationend", function () {

                        $(".items").eq(3).removeClass("bienMat").addClass("hidden").off("animationend");
                        if (trackList < list1d.length + 1) {
                            $(".thongBaoMusic").removeClass("hidden").addClass("xuatHien").on("animationend", function () {
                                $(".thongBaoMusic").removeClass("xuatHien").off("animationend");
                            });

                        }



                    });

                });

            });

        });


    }
}

function anThongBao() {
    let timer = setInterval(() => {
        count++;
        if (count == maxTime) {
            clearInterval(timer);
            count = 0;
            $(".thongBaoTroChoi").addClass("bienMat").on("animationend", function () {
                $(this).addClass("hidden").removeClass("bienMat").off("animationend");
                $("#startTime1").text("00:00");
                $("#duration1").text("00:00");
                $("#progressBar1").val(0);

                anXuatDapAn("2");
            });



        }
    }, 1000)
}

function hienThiSoVolume(element) {
    $('.inNum').val(element.value);
    let audio = document.getElementById("audio");
    audio.volume = element.value / 100;
}

function hienThiSoVolume2(element) {
    $('.inNum1').val(element.value);
    let audio = document.getElementById("audioPhatLai");
    audio.volume = element.value / 100;
}

function chuanHoaSo(element, maxLength) {
    if (element.value.length > maxLength) {
        element.value = element.value.slice(0, maxLength);
    }
    else if (element.value > 100) {
        element.value = 100;
    }

    $('#slider').val(element.value);
}

// Hàm định dạng giây thành mm:ss
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return (
        String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
    );
}

function tuaTocDo(element) {
    let audio = document.getElementById("audio");

    audio.currentTime = element.value;
};

function tuaTocDo2(element) {
    let audio = document.getElementById("audioPhatLai");

    audio.currentTime = element.value;
};

function xuLyGroupChoice() {
    $("#girl").on("click", function () {
        $("#boy-group").addClass("hidden");
        $("#girl-group").removeClass("hidden");
    });

    $("#boy").on("click", function () {
        $("#girl-group").addClass("hidden");
        $("#boy-group").removeClass("hidden");

    });

    $(".finish").on("click", function () {
        $("#setting").css("pointer-events", "none");
        $(".main-menu").addClass("hidden");
        $(".main-game").removeClass("hidden");
    });
}

function xuLyAnHienFinish() {
    let flagFinish = false;

    let button = document.querySelectorAll(".groupItem > input");
    $(button).on("change", function () {

        if ($(button).is(":checked")) {
            flagFinish = true;
            $(".finish").css("pointer-events", "all");
        }
    });

    if (!flagFinish) {
        $(".finish").css("pointer-events", "");

    }
}

function xuLyThemVaXoa() {

    let inputCheck = document.querySelectorAll(".groupItem > input");

    $(inputCheck).on("change", function () {
        if ($(this).prop("checked")) {

            let dem = 0;
            for (let i = 0; i < 4; i++) {
                if (i == 0) {
                    dem = 0;

                    for (dem = 0; dem < list.length; dem++) {
                        if (list[dem][0] === null) {
                            list[dem] = [];
                            //console.log(list.length);
                            break;
                        }
                    }
                    list[dem][0] = $(this).attr("name");
                }
                else {
                    let ten = $(this).attr("name");
                    list[dem][i] = data[ten][i - 1];
                }
            }

        }
        else {
            let ten = $(this).attr("name");
            for (let i = 0; i < list.length; i++) {
                if (list[i][0] == ten) {
                    list[i] = [null];
                    break;
                }
            }
        }
        for (let x in list) {
            if (list[x] != null) {
                //console.log(list[x]);
            }
        }
    });


}

function xuLyProgressBarGame(element) {
    let tmp = parseInt(element);
    $("#progressBar1").attr("max", tmp + parseInt(thoiGianDoan));
    $("#progressBar1").attr("min", tmp);
    $("#duration1").text(formatTime(thoiGianDoan));
    startTimeGame = $("#audioGame")[0].currentTime;
}

function xuLyAmThanhMainGame() {

    $("#audioGame").on("timeupdate", function () {
        $("#progressBar1").val($("#audioGame")[0].currentTime);
        $("#audioGame").prop("volume", $(".inNum").val() / 100);
        let now = $("#audioGame")[0].currentTime - startTimeGame;
        $("#startTime1").text(formatTime(now));
    });
}

function xuLyThongBaoMusic() {
    const startTime = document.getElementById("startTime2");
    const endTime = document.getElementById("duration2");
    let phatNhac = false;
    const audio = document.getElementById("audioPhatLai");

    endTime.textContent = formatTime(audio.duration);
    startTime.textContent = formatTime(audio.currentTime);

    audio.addEventListener("timeupdate", function () {
        $("#startTime2").text(formatTime(audio.currentTime));
        $("#progressBar2").val(audio.currentTime);
        if (audio.currentTime == audio.duration) {
            $("#startMusic").text("Start");
            $("#progressBar2").attr("value", 0);
        }
    });

    $("#progressBar2").attr("max", audio.duration);
    $("#progressBar2").attr("min", 0);

    $("#startMusic").on("click", function () {
        if (!phatNhac) {

            audio.play();
            let audioVol = document.getElementsByClassName("inNum1")[0];
            audio.volume = audioVol.value / 100;
            phatNhac = true;
            $("#startMusic").text("Pause");
        }
        else {
            audio.pause();
            phatNhac = false;
            $("#startMusic").text("Start");
        }
    });
}

function xuLyAmThanh() {
    const startTime = document.getElementById("startTime");
    const endTime = document.getElementById("duration");
    let phatNhac = false;
    const audio = document.getElementById("audio");

    endTime.textContent = formatTime(audio.duration);
    startTime.textContent = formatTime(audio.currentTime);

    audio.addEventListener("timeupdate", function () {
        $("#startTime").text(formatTime(audio.currentTime));
        $("#progressBar").val(audio.currentTime);
        if (audio.currentTime == audio.duration) {
            $("#test").text("Start");
            $("#progressBar").attr("value", 0);
        }
    });

    $("#progressBar").attr("max", audio.duration);
    $("#progressBar").attr("min", 0);

    $("#test").on("click", function () {
        if (!phatNhac) {

            audio.play();
            let audioVol = document.getElementsByClassName("inNum")[0];
            audio.volume = audioVol.value / 100;
            phatNhac = true;
            $("#test").text("Pause");
        }
        else {
            audio.pause();
            phatNhac = false;
            $("#test").text("Start");
        }
    });


    $("#volIcon").on("click", function () {
        $(".volume-menu").css("display", "flex");
    });

    $("#exitVol").on("click", function () {
        $(".volume-menu").css("display", "");
        $("#audio")[0].pause();
        $("#test").text("Start");

    });
}

$(window).on("load", function () {

    $("#startGame").on("click", function () {
        $(this).addClass("bienMat").on("animationend", function () {
            $(this).removeClass("bienMat").addClass("hidden").off("animationend");
            $(".main-menu").removeClass("hidden").addClass("xuatHien").on("animationend", function () {
                $(this).removeClass("xuatHien").off("animationend");
            });

        });
    });
    kiemTraToHop();
    xuLyGroupChoice();
    xuLyThemVaXoa();
    xuLyAmThanh();
    xuLyAmThanhMainGame()
    xuLyThongBaoMusic();

    $("#playGame").on("click", function () {

        thoiGianDoan = $("#thoiGianNghe").val();
        if (!flagList) {
            xuLyList();
            flagList = true;
        }


        $(this).addClass("bienMat").on("animationend", function () {
            $(this).removeClass("bienMat").addClass("hidden");
        });
        $(".items").addClass("hidden");

        flagChoi = true;

        let idx = Math.floor(Math.random() * (list1d.length));

        let cnt = 0;
        while (true) {
            if (listBool[idx] == false || cnt == 1000) {
                if (cnt == 1000) {
                    break;
                }
                listBool[idx] = true;
                break;
            }
            else {
                idx = Math.floor(Math.random() * (list1d.length));
            }
            cnt++;
        }



        let token = list1d[idx];
        let tokens = token.split("-");
        let answer = tokens[4];
        let items = document.getElementsByClassName("items");
        let dem = 1;
        for (var x in items) {
            $(items[x]).text(tokens[dem++]);
        }

        $("#audioGame").prop("volume", $("#slider").val() / 100);

        $("#audioGame").attr("src", tokens[0]);


        if (flagNgauNhien) {
            let audio2 = document.getElementById("audioGame");
            audio2.onloadedmetadata = function () {

                let timeAudio = Math.floor(Math.random() * audio2.duration);
                tokens[6] = timeAudio;

                while (true) {
                    if (timeAudio + parseInt($("#thoiGianNghe").val()) <= audio2.duration) {
                        break;
                    }
                    tokens[6] = timeAudio;
                    timeAudio = Math.floor(Math.random() * audio2.duration);
                }
                $("#audioGame")[0].currentTime = parseInt(tokens[6]);
                $("#audioGame")[0].play();
                result = tokens[5];
                gioiHanThoiGianNhac(tokens[6]);
                xuLyProgressBarGame(tokens[6]);
                chinhSrcVaTen(tokens[0], tokens[7]);

            };
        }
        else {
            $("#audioGame")[0].currentTime = parseInt(tokens[6]);

            $("#audioGame")[0].currentTime = parseInt(tokens[6]);
            $("#audioGame")[0].play();
            result = tokens[5];
            gioiHanThoiGianNhac(tokens[6]);
            xuLyProgressBarGame(tokens[6]);
            chinhSrcVaTen(tokens[0], tokens[7]);
        }

    });


    xuLyDapAn();


    $("#yesButton").on("click", function () {
        $(".thongBaoMusic").addClass("bienMat").on("animationend", function () {
            $(this).removeClass("bienMat").addClass("hidden").off("animationend");
            $(".menu-song").removeClass("hidden").addClass("xuatHien").on("animationend", function () {
                $(this).removeClass("xuatHien").off("animationend");
            });
        });

    });

    $("#noButton").on("click", function () {
        $("#volIcon").css("pointer-events", "");

        $(".thongBaoMusic").addClass("bienMat").on("animationend", function () {
            $(this).removeClass("bienMat").addClass("hidden").off("animationend");
            tiepTucTroChoi();

        });



    });

    $("#exitVol2").on("click", function () {
        $("#volIcon").css("pointer-events", "");

        $(".menu-song").addClass("bienMat").on("animationend", function () {
            $(this).removeClass("bienMat").addClass("hidden").off("animationend");
            tiepTucTroChoi();

        });
        $("#startMusic").text("Start");
        $("#audioPhatLai")[0].pause();

    });

    $("#setting").on("click", function () {
        $(".caiDat").removeClass("hidden");
    });

    $("#question").on("click", function () {
        $(".thongBaoChonNhom").removeClass("hidden");
    });

    $("#exitVol3").on("click", function () {
        $(".thongBaoChonNhom").addClass("hidden");
    });

    $("#exitVol4").on("click", function () {
        $(".caiDat").addClass("hidden");
    });

    $("#resetGame").on("click", function () {
        $(this).addClass("bienMat").on("animationend", function () {
            $(this).removeClass("bienMat").addClass("hidden").off("animationend");
            resetTroChoi();

        });
    });

});


