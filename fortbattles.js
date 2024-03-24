// ==UserScript==
// @name         Fort Battles Online - Profile
// @version      1.0
// @description  Easier management of your Fort Battles Online Profile
// @author       Criminus
// @include      http://*.the-west.*/game.php*
// @include      https://*.the-west.*/game.php*
// ==/UserScript==

(function() {
    'use strict';

    var menuBoxVisible = false;
    const domain = window.location.hostname;
    let locale;
    if (domain.includes("beta")) {
        locale = "zz";
    } else if (domain.includes("com.br")) {
        locale = "br";
    } else if (domain.includes("gr")) {
        locale = "gr";
    } else {
        locale = Game.locale.substring(0, 2);
    }
    const gameWorld = Game.worldName;
    const gameWorldRaw = window.location.hostname.split(".")[0];
    const characterID = Character.playerId;
    const charTownID = Character.homeTown.town_id;

    function sideButton() {
        var icon = $("<div></div>")
        .attr({
            class: "menulink",
            title: "Fort Battles Online",
        })
        .css({
            background: "url('https://fortbattles.online/script/button-token.png')",
            "background-position": "0px 0px",
        })
        .mouseleave(function () {
            $(this).css("background-position", "0px 0px");
        })
        .mouseenter(function (e) {
            $(this).css("background-position", "0px 25px");
        })
        .click(function () {
            console.log("button pressed.");
            if (!menuBoxVisible) {
                createMenuBox();
                menuBoxVisible = true;
            } else {
                $('#fort_battles_online').remove();
                menuBoxVisible = false;
            }
        });
        var bottom = $("<div></div>").attr({
            class: "menucontainer_bottom",
        });
        $("#ui_menubar .ui_menucontainer:last").after(
            $("<div></div>")
            .attr({
                class: "ui_menucontainer",
                id: "FBO",
            })
            .append(icon)
            .append(bottom)
        );
    }
    function createMenuBox() {
        var screenWidth = $(window).width();
        var leftPosition = screenWidth - 280;
        var menuBox = $('<div>', {
            'class': 'tw2gui_window tw2gui_win2 tw2gui_window_notabs escape escape noreload nominimize nocloseall empty_title',
            'id': 'fort_battles_online',
            'style': 'left:' + leftPosition + 'px;top: 230px;z-index: 102;width: 240px;height: 200px;'
        });
        var buttonsDict = [
            {buttonName: 'Profile', link: 'https://fortbattles.online/'+ locale +'/'+ gameWorldRaw +'/player/'+ characterID},
            {buttonName: 'Town', link: 'https://fortbattles.online/'+ locale +'/'+ gameWorldRaw +'/town/'+ charTownID},
            {buttonName: 'Battles', link: 'https://fortbattles.online/battles?locale='+ locale +'&gameworldraw='+ gameWorldRaw},
        ];
        var boxContainer = '<div class="tw2gui_window_shadow_box"><div class="tw2gui_window_shadow tw2gui_bg_br"></div><div class="tw2gui_window_shadow tw2gui_bg_tr"></div><div class="tw2gui_window_shadow tw2gui_bg_bl"></div></div><div class="tw2gui_window_inset"><div class="tw2gui_inner_window_bg"></div><div class="tw2gui_inner_window_bg2"></div></div><div class="tw2gui_window_inset_bottom"></div><div class="tw2gui_window_inset_right"></div><div class="tw2gui_inner_splitwindow_container"><div class="tw2gui_inner_splitwindow"><div class="tw2gui_inner_splitwindow_rightfade"></div></div></div><div class="tw2gui_window_border tw2gui_bg_tl"></div><div class="tw2gui_window_border tw2gui_bg_br"></div><div class="tw2gui_window_border tw2gui_bg_tr"></div><div class="tw2gui_window_border tw2gui_bg_bl"></div>';
        var boxContent = '<div class="tw2gui_window_content_pane"><div class="content" id="fbbuttons"></div></div>';
        menuBox.append(boxContainer);
        menuBox.append(boxContent);
        $('#windows').append(menuBox);
        var buttonsContainer = $('#fbbuttons');
        buttonsDict.forEach(function(button) {
            //Wow what a masterpiece I should be hired at InnoGames for this.
            //The check itself is shite but we leave it as it is because it's working.
            //A non-coder doesn't know about the science behind this crap so doesn't matter.
            //Also a nice song here: https://www.youtube.com/watch?v=d51Te8E9u4U
            let inactiveButton = false;
            let buttonLink = button.link;
            let buttonTarget = 'target="_blank"';
            if (button.link.includes('/town/') && charTownID === 0) {
                inactiveButton = true;
                buttonLink = '#';
                buttonTarget = '';
            }
            var buttonHtml = `<div class="tw2gui_button ${inactiveButton ? 'inactive' : ''}" style="min-width: 175px;"><a href="${buttonLink}" ${buttonTarget}><div class="tw2gui_button_right_cap"></div><div class="tw2gui_button_left_cap"></div><div class="tw2gui_button_middle_bg"></div><div class="textart_title">${button.buttonName}</div></a></div>`;
            buttonsContainer.append(buttonHtml);
        });
    }
    $(document).ready(function() {
        sideButton();
    });
})();
