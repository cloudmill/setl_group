$(document).ready(function(){
    custom();
    sliders_init();
    sliders()
})

 
custom = function(){
    $(document).on('click','.drop_down_lists .item .plus',function(){
        $(this).parent().toggleClass('open')
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
    
}
sliders = function(){
    $('.main_banner .slide-count .current').text("0"+(1))
    $('.main_banner .slide-count .count').text("0"+ $('.main_banner .slider').slick("getSlick").slideCount)
    $('.main_banner .slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        $('.main_banner .slide-count .current').text("0"+(currentSlide + 1))
        $('.main_banner .slide-count .count').text("0"+slick.slideCount)
    });

    $('.indicators .progress_slide').width($(".indicators .slider").width())
    $(".indicators .slider").on("beforeChange", function(
        event,
        slick,
        currentSlide,
        nextSlide
      ) {
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
}