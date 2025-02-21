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
const menuListHTML = `
    <div id="menu-container">
        <a style="text-decoration: none;" href="` + path + `index.html"><div class="line-side-menu-box">Home</div></a>
        <a style="text-decoration: none;" href="` + path + `research.html"><div class="line-side-menu-box">Research</div></a>
        <a style="text-decoration: none;" href="` + path + `member.html"><div class="line-side-menu-box">Member</div></a>
        <a style="text-decoration: none;" href="` + path + `links-access.html"><div class="line-side-menu-box">Access / Links</div></a>
        <a style="text-decoration: none;" href="` + path + `../ja/index.html"><div class="line-side-menu-box">日本語</div><a>
    </div>`;

/* Event - All pages common script */
window.onload = function() {
    // Footer print
    document.getElementsByTagName('footer')[0].innerHTML = `
        <p>&copy; 2019 Comm. Lab.</p>`;

    // Time event make
    setInterval('viewModeRefresh()', 100);
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
            if(uPrt[uPrt.length - 1] == 'index.html') {
                returnHTML = `
                    <div id="head-panel">
                        <a href="` + path + `index.html">
                            <img src="` + path + `items/logo.png" style="height: 100px; margin-left: 10px;"><img id="head-gif" src="` + path + `items/comm.gif" style="height: 80px; margin-left: 20px;">
                        </a>
                    </div>`;
                } else {
                returnHTML = `
                    <div id="head-panel">
                        <a href="` + path + `index.html">
                            <img src="` + path + `items/logo.png" style="height: 100px; margin-left: 10px;">
                        </a>
                    </div>`;
                }
            break;

        case 1:
            returnHTML = `
                <table cellspacing="0" cellpadding="0" id="head-panel">
                    <tbody>
                        <tr>
                            <td style="height: 50px; width: auto;">
                                <a href="` + path + `index.html"><img style="height: 100%; margin-left: 10px;" src="` + path + `items/logo.png"></a>
                            </td>
                            <td style="height: 50px; width: 50px;">
                                <img class="head-back" style="height: 100%;" src="` + path + `items/menu-open.svg" onclick="menuSwitch()">
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
                            <td style="height: 50px; width: auto;">
                                <a href="` + path + `index.html"><img style="height: 100%; margin-left: 10px;" src="` + path + `items/logo.png"></a>
                            </td>
                            <td style="height: 50px; width: 50px;">
                                <img class="head-back" style="height: 100%;" src="` + path + `items/menu-close.svg" onclick="menuSwitch()">
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
