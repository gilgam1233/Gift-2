let maMau = ["rgb(255, 0, 0)", "rgb(255, 142, 0)", "rgb(255, 255, 0)", "rgb(0, 142, 0)"
    , "rgb(0, 192, 192)", "rgb(64, 0, 152)", "rgb(142, 0, 142)"];

function khoiTaoMau() {
    let words = document.getElementsByClassName("words");

    for (let x in words) {
        if (x < 7) {
            $(words[x]).css("color", `${maMau[x]}`);
        }
        else {
            $(words[x]).css("color", `${maMau[x - 7]}`);

        }
    }
}

function hamKiemTraMau(element) {
    for (let i in maMau) {
        if (maMau[i] == element)
            return i;
    }
    return -1;

}

function chuyenDoiMau() {
    let words = document.getElementsByClassName("words");
    let loop = setInterval(() => {

        for (let i = 0; i < words.length; i++) {
            let color = getComputedStyle(words[i]).color;
            let index = hamKiemTraMau(color);

            if (index != -1) {
                if (index == 6) {
                    $(words[i]).attr("style", `color: ${maMau[0]};`);

                } else {
                    $(words[i]).attr("style", `color: ${maMau[parseInt(index) + 1]};`);


                }

            }
        }

    }, 5000);
}

$(window).on("load", function () {
    khoiTaoMau();
    chuyenDoiMau();

    const b1 = document.getElementById('meoMC');
    const b2 = document.getElementById('boxChat');
    
    const rect = b1.getBoundingClientRect();

    // Gán vị trí cho block2 theo block1
b2.style.top = rect.width -100 + 'px';
b2.style.left = rect.left + rect.width -100 + 'px'; // dịch sang phải đúng bằng chiều rộng của b1

    $(".meoMC").on("mouseenter",function(){
        $(".boxChat").removeClass("hidden");
    })

    $(".meoMC").on("mouseleave",function(){
        $(".boxChat").addClass("hidden");
    });
});