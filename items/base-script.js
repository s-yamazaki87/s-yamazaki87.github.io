/* Set global variables */
menuView = false;
viewPast = -1;
pageContents = '';
uPrt = location.href.split('/');
path = '';
if(uPrt[uPrt.length - 2] == 'news' || uPrt[uPrt.length - 2] == 'nct') {
    path = '../';
}
else {
    path = './';
}

const isEnglish = uPrt.includes('en');

const menuListHTML = isEnglish ? `
    <div id="menu-container">
        <a style="text-decoration: none;" href="` + path + `index.html"><div class="line-side-menu-box">Home</div></a>
        <a style="text-decoration: none;" href="` + path + `research.html"><div class="line-side-menu-box">Research</div></a>
        <a style="text-decoration: none;" href="` + path + `member.html"><div class="line-side-menu-box">Member</div></a>
        <a style="text-decoration: none;" href="` + path + `achieve.html"><div class="line-side-menu-box">Achievement</div></a>
        <a style="text-decoration: none;" href="` + path + `links-access.html"><div class="line-side-menu-box">Access / Links</div></a>
        <a style="text-decoration: none;" href="` + path + `../ja/index.html"><div class="line-side-menu-box">日本語</div></a>
    </div>` : `
    <div id="menu-container">
        <a style="text-decoration: none;" href="` + path + `index.html"><div class="line-side-menu-box">ホーム</div></a>
        <a style="text-decoration: none;" href="` + path + `research.html"><div class="line-side-menu-box">研究内容</div></a>
        <a style="text-decoration: none;" href="` + path + `member.html"><div class="line-side-menu-box">メンバー</div></a>
        <a style="text-decoration: none;" href="` + path + `achieve.html"><div class="line-side-menu-box">業績</div></a>
<!--
        <a style="text-decoration: none;" href="` + path + `../nct/local.html"><div class="line-side-menu-box">学内限定</div></a>
-->
        <a style="text-decoration: none;" href="` + path + `links-access.html"><div class="line-side-menu-box">アクセス・リンク</div></a>
        <a style="text-decoration: none;" href="` + path + `../en/index.html"><div class="line-side-menu-box">English</div></a>
    </div>`;

const logoFile = isEnglish ? "logo_en.svg" : "logo_ja.svg";
const logoHeight = isEnglish ? "100px" : "130px";
const gifHeight = isEnglish ? "80px" : "100px";
const mainTop = isEnglish ? "100px" : "130px";

/* Event - All pages common script */
window.onload = function() {
    // Footer print
    document.getElementsByTagName('footer')[0].innerHTML = `
        <p>&copy; 2019 Comm. Lab.</p>`;

    // Set up paginated visibility for achievement lists
    setupShowMore();

    // Time event make
    setInterval('viewModeRefresh()', 100);
}

/* Function - Set up Show More for achievement lists */
function setupShowMore() {
    var lists = document.querySelectorAll('.achieve-list');
    lists.forEach(function(list) {
        var items = list.querySelectorAll('li');
        if (items.length <= 10) return;

        // Fix the list numbers (value attributes) before hiding any items,
        // because browsers recalculate <ol reversed> numbers based only on visible items.
        var total = items.length;
        for (var i = 0; i < total; i++) {
            if (!items[i].hasAttribute('value')) {
                items[i].setAttribute('value', total - i);
            }
        }

        // Add class to enable bottom fade-out gradient
        list.classList.add('has-show-more');

        var visibleCount = 10;
        
        // Hide items starting from index 10 (11th item)
        for (var i = visibleCount; i < items.length; i++) {
            items[i].style.display = 'none';
        }

        // Create Show More button
        var btn = document.createElement('button');
        btn.className = 'show-more-btn';
        btn.textContent = isEnglish ? 'Show More' : 'もっと見る';
        
        btn.addEventListener('click', function() {
            var nextCount = visibleCount + 10;
            var delayIdx = 0;
            for (var i = visibleCount; i < Math.min(nextCount, items.length); i++) {
                items[i].style.display = '';
                items[i].classList.add('fade-in-item');
                // Staggered delay: 50ms interval between each item appearance
                items[i].style.animationDelay = (delayIdx * 0.05) + 's';
                delayIdx++;
            }
            visibleCount = nextCount;
            if (visibleCount >= items.length) {
                list.classList.remove('has-show-more'); // Remove gradient when all items are visible
                btn.parentNode.removeChild(btn);
            }
        });

        // Insert button right after the list
        list.parentNode.insertBefore(btn, list.nextSibling);
    });
}


/* Function - View refresh */
function viewModeRefresh() {
    /* PC view */
    if(window.innerWidth > 700) {
        // When view mode changed
        if(viewPast != 0) {
            if(menuView) {
                menuSwitch();
            }
            document.getElementsByTagName('header')[0].innerHTML = headderPrint(0);
            document.getElementById('line-side').innerHTML = menuListHTML;
            document.getElementById('main-contents').style.top = mainTop;
            viewPast = 0;
        }
    }
    /* Mobile view */
    else {
        // Delete side menu
        if(!menuView) {
            document.getElementById('line-side').innerHTML = '';
        }
        // Branch with viewing page or menu list
        if(menuView) {
            if(viewPast != 2) {
                document.getElementsByTagName('header')[0].innerHTML = headderPrint(2);
                viewPast = 2;
            }
        }
        else {
            if(viewPast != 1) {
                document.getElementsByTagName('header')[0].innerHTML = headderPrint(1);
                viewPast = 1;
            }
        }
    }
}


/* Function - Headder contents print with multi pattern */
function headderPrint(menuButton) {
    var returnHTML = '';

    switch(menuButton) {
        case 0:
            if(uPrt[uPrt.length - 1] == 'index.html' || uPrt[uPrt.length - 1] == '') {
                returnHTML = `
                    <div id="head-panel" style="padding: 5px 0px">
                        <a href="` + path + `index.html" style="display: flex; align-items: center; justify-content: space-between; text-decoration: none; width: 100%;">
                            <img src="../items/` + logoFile + `" style="height: ` + logoHeight + `; margin-left: 10px;">
                            <img id="head-gif" src="../items/comm.gif" style="height: ` + gifHeight + `; margin-right: 10px;">
                        </a>
                    </div>`;
                } else {
                returnHTML = `
                    <div id="head-panel" style="padding: 5px 0px">
                        <a href="` + path + `index.html">
                            <img src="../items/` + logoFile + `" style="height: ` + logoHeight + `; margin-left: 10px;">
                        </a>
                    </div>`;
                }
            break;

        case 1:
            returnHTML = `
                <table cellspacing="0" cellpadding="0" id="head-panel">
                    <tbody>
                        <tr>
                            <td style="height: 46px; width: auto; padding: 2px 0px;">
                                <a href="` + path + `index.html"><img style="height: 100%; margin-left: 10px;" src="../items/` + logoFile + `"></a>
                            </td>
                            <td style="height: 50px; width: 50px;">
                                <img class="head-back" style="height: 100%;" src="../items/menu-open.svg" onclick="menuSwitch()">
                            </td>
                        </tr>
                    </tbody>
                </table>`;
            break;

        case 2:
            returnHTML = `
                <table cellspacing="0" cellpadding="0" id="head-panel">
                    <tbody>
                        <tr>
                            <td style="height: 46px; width: auto; padding: 2px 0px;">
                                <a href="` + path + `index.html"><img style="height: 100%; margin-left: 10px;" src="../items/` + logoFile + `"></a>
                            </td>
                            <td style="height: 50px; width: 50px;">
                                <img class="head-back" style="height: 100%;" src="../items/menu-close.svg" onclick="menuSwitch()">
                            </td>
                        </tr>
                    </tbody>
                </table>`;
            break;
    }

    return returnHTML;
}


/* Function - Page switch page or menu list */
function menuSwitch() {
    menuView = !menuView;
    if(menuView) {
        pageContents = document.getElementById('main-contents').innerHTML;
        document.getElementById('main-contents').innerHTML = menuListHTML;
    }
    else {
        document.getElementById('main-contents').innerHTML = pageContents;
    }

    return 0;
}
