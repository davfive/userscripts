// ==UserScript==
// @name         Parent Portal Utils
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Hide all completed assignments on Infinity Campus assignments page
// @author       davfive
// @match        https://icampus.dublinusd.org/campus/nav-wrapper/parent/portal/parent/assignment-list*
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

/* globals $ */
const ppu = window.ParentPortalUtils = {}

ppu.hideCompleted = function() {
    // Hide the sidebar and move the main area to the left for printing
    $('.sidebar').each(function(i,e) { $(this).css('display', 'none') })
    $('.inner-workspace-wrapper').each(function(i,e) { $(this).css('padding-left', 0) })

    // The main content is enclosed in an iframe so have to grab that first
    const iframe = $($("iframe")[0]).contents()[0]
    $(iframe).find('.assignment-score__scores').each(function(i,e) {
        const gradeStr = this.innerText.trim()
        const grade = parseInt((gradeStr.match(/[0-9]+%/) || ["0%"])[0])
        console.log(`>${grade}<`)
        if (grade >= 70) {
            $(this).closest('.assignment__row').hide()
        }
    })
}


$(function() {
   const actionButton = '<div class="pl-4"><button class="no-mobile-hover k-button" kendobutton="" role="checkbox" tabindex="0" dir="ltr" onclick="window.ParentPortalUtils.hideCompleted()">Hide Completed</button></div>'
   setTimeout(function() {
       $('ic-tool-list').append(actionButton)
   }, 2000)
})
