import $ from 'jquery'
console.log(11)
console.log(11)
console.log($)
$(function () {
     setTimeout(function () {
         $('div').html('改变了')
     },2000)
})
