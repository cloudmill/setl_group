$(document).ready(function(){
    custom();
    sliders_init();
    sliders()
})
custom = function(){
    $(document).on('click','.drop_down_lists .item .plus',function(){
        $(this).parent().toggleClass('open')
    })
    $(document).on('click','.history .years .item',function(){
      index = $(this).parent().parent().index()
      $('.history .years').slick('slickGoTo',index)
      $('.history .events').slick('slickGoTo',index)
    })
}
sliders_init = function(){
    $('.main_banner .slider').slick({
        slidesToShow: 1, 
        slidesToScroll: 1,
        speed: 1000,
        arrows: true,
        dots : false,
        fade: true,
        infinite: false,
    })
    var show_slides = 4;
    if($(window).width()>1024)
      show_slides = 4
    else if($(window).width()>768){
      show_slides = 3
    }
    else{
      show_slides = 1
    }
    $('.indicators .slider').slick({
        slidesToShow: show_slides, 
        slidesToScroll: 1,
        speed: 1000,
        arrows: true,
        dots : false,
        fade: false,
        infinite: false,
    })
    $('.history .years').slick({
        slidesToShow: 1, 
        slidesToScroll: 1,
        speed: 500,
        swipe: false,
        arrows: false,
        dots : false,
        fade: false,
        infinite: false,
    })
    $('.history .events').slick({
        slidesToShow: 1, 
        slidesToScroll: 1,
        speed: 500,
        arrows: true,
        dots : false,
        fade: false,
        infinite: true,
    })
    
}
sliders = function(){
    slider_button_text($(".history .events"),0)
    slider_progress_bar(0)
    $('.main_banner .slide-count .current').text("0"+(1))
    $('.main_banner .slide-count .count').text("0"+ $('.main_banner .slider').slick("getSlick").slideCount)
    $('.main_banner .slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        $('.main_banner .slide-count .current').text("0"+(currentSlide + 1))
        $('.main_banner .slide-count .count').text("0"+slick.slideCount)
    });

    $('.indicators .progress_slide').width($(".indicators .slider").width())
    $(".indicators .slider").on("beforeChange", function(event,slick,currentSlide,extSlide) {
        width = $(".indicators .slider").width();
        $('.indicators .progress_slide').width(width)
        if($(window).width()>1024)
          $(".indicators .progress_slide span").width(width*(nextSlide/(slick.slideCount-4)))
        else if($(window).width()>768){
          $(".indicators .progress_slide span").width(width*(nextSlide/(slick.slideCount-3)))
        }
        else{
          $(".indicators .progress_slide span").width(width*(nextSlide/(slick.slideCount-1)))
        }
      });
    $(".history .events").on("beforeChange", function(event, slick, currentSlide, nextSlide) {
      $('.history .years').slick('slickGoTo',nextSlide)
      slider_button_text($(".history .events"),nextSlide)
      slider_progress_bar(nextSlide)
    });
}
slider_button_text = function(slider,index){
  var text_prev = '',
  text_next = '';
  if(index == 0){
    text_prev = $('.history .years .item').eq(slider.slick('getSlick').slideCount-1).text()
    text_next = $('.history .years .item').eq(index+1).text()
  }else if(index == slider.slick('getSlick').slideCount-1){
    text_prev = $('.history .years .item').eq(index-1).text()
    text_next = $('.history .years .item').eq(0).text()
  }
  else{
    text_prev = $('.history .years .item').eq(index-1).text()
    text_next = $('.history .years .item').eq(index+1).text()
  }
  slider.find('.slick-prev').text(text_prev)
  slider.find('.slick-next').text(text_next)

}
slider_progress_bar = function(index){
  slider = $(".history .events")
  progress_bar = $('.history .years_progress .current')
  progress_bar.width(progress_bar.parent().width()/slider.slick('getSlick').slideCount*(index+1))
}