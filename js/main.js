$(document).ready(function(){
    custom();
    sliders_init();
    sliders();
    drag_add_drop_init();
    word_animate_init();
    
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
    $(document).on('click','.menu_open',function (e){
      e.preventDefault();
      menu = function (){
        $('header').toggleClass('opened_menu')
        $('body').toggleClass('noscroll')
      }
      objects = [
        $('.popup_menu .menu .row ul li a'),
        $('.popup_menu .menu .row .right span'),
        $('.popup_menu .menu .row .right p'),
        $('.popup_menu .menu .row .right a'),
      ]
      if($('header').hasClass('opened_menu')){
        objects.forEach(function (item,i){
          word_animate.hide(item,300)
        })
        setTimeout( function (){
          menu()
        },300)  
      }else{
        menu()
        objects.forEach(function (item,i){
          word_animate.show(item,300)
        })
      }
      
    })
    $(document).on('click','.up',function (e){
      e.preventDefault();
      $('html,body').animate({scrollTop:0}, 500);
    })
    $(document).on('click','.str_down',function (e){
      e.preventDefault();
      $('html,body').animate({scrollTop:$('#news_main').offset().top}, 500);
    })
    $(document).on('click','.search',function (e){
      if($('.search').hasClass('active')){
        if($('.search .search_area input').val()=="" && !$('.search .search_area input').is(e.target)){
          e.preventDefault();
          setTimeout(function(){
            $('.search').removeClass('active');
          },300)
        }
      }else{
        $('.search').addClass('active');
      }
    })
}
sliders_init = function (){
    $('.main_banner .slider').slick({
        slidesToShow: 1, 
        slidesToScroll: 1,
        speed: 1500,
        arrows: true,
        dots : false,
        cssEase: 'cubic-bezier(0.770, 0.005, 0.240, 1.000)',
        infinite: false,
    })
    /* var show_slides = 4;
    if($(window).width()>1024)
      show_slides = 4
    else if($(window).width()>768){
      show_slides = 3
    }
    else if($(window).width()>768){
      show_slides = 3
    }
    else{
      show_slides = 1
    } */
    $('.indicators .slider').slick({
        slidesToShow: 4, 
        slidesToScroll: 1,
        speed: 1000,
        arrows: true,
        dots : false,
        fade: false,
        infinite: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 650,
            settings: {
              slidesToShow: 1
            }
          }
        ]
    })
    $('.history .years').slick({
        slidesToShow: 1, 
        slidesToScroll: 1,
        speed: 500,
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
        $('.main_banner .slider .item').eq(currentSlide).addClass('current')
    });
    $('.main_banner .slider .item').eq(0).addClass('current')
    $('.main_banner .slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      $('.main_banner .slider .item').removeClass('current')
      $('.main_banner .slide-count .current').text("0"+(nextSlide + 1))
      setTimeout(function () {
        word_animate.show($('.main_banner .slider .item').eq(nextSlide).find('h1'),1000)
        word_animate.show($('.main_banner .slider .item').eq(nextSlide).find('h4'),1000)
      }, 1000);
      word_animate.hide($('.main_banner .slider .item').eq(currentSlide).find('h1'),1000)
      word_animate.hide($('.main_banner .slider .item').eq(currentSlide).find('h4'),1000)
    });

    $('.indicators .progress_slide').width($(".indicators .slider").width())
    $(".indicators .slider").on("beforeChange", function(event,slick,currentSlide,nextSlide) {
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
slider_button_text = function (slider,index){
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
slider_progress_bar = function (index){
  slider = $(".history .events")
  progress_bar = $('.history .years_progress .current')
  progress_bar.width(progress_bar.parent().width()/slider.slick('getSlick').slideCount*(index+1))
}
drag_add_drop_init = function () {
  if($(window).width()<=768){
    setTimeout(function () {
      drag_add_drop_vertical($('.scroll_box .sub_menu'))
    }, 10);
  }
  /* $(document).on('load','.scroll_box .sub_menu',function(){
    drag_add_drop_vertical($('.scroll_box .sub_menu'))
  }) */
}
drag_add_drop_vertical = function (el) {
  var press = false,
  move = false,
  begin_pos_x = 0,
  cur_pos_x = 0,
  lenght_stop = 10,
  width = 0,
  right = false,
  temp_d = 0,
  d_move = 5,
  items = el.find('li a'),
  old_pos_x = 0;

  for(i=0;i<items.length;i++){
    if(items.eq(i).width() > el.parent().width()){
      new_width = el.parent().width()-(parseInt(el.parent().css('padding-right'))*2 )- parseInt(items.eq(i).css('margin-right'))
      items.eq(i).css('white-space','normal')
      items.eq(i).width(new_width)
    }
    new_width = parseInt(items.eq(i).css('width'))+parseInt(items.eq(i).css('margin-right'))
    width += parseFloat(items.eq(i).width()) + parseFloat(items.eq(i).css('margin-right'))
    items.eq(i).parent().width(new_width)
  }
  el.width(width)
  if(el.find('li.active').length)
    begin_pos_x = el.find('li.active').eq(0).offset().left - el.offset().left

  el.parent().scrollLeft(begin_pos_x)
  begin_pos_x = el.parent().scrollLeft()
  
  el.parent().on('mousemove',function(e){
    Math.abs(old_pos_x - event.x) > 0 ? right = old_pos_x < event.x : 1;
    x = event.x;
    old_pos_x =  x;
    
    if(Math.abs(cur_pos_x - x)  > d_move && press && !move){
      move = true;
      temp_d = d_move;
    }
    if(press && move){
      temp_d = temp_d > 0 ? temp_d-1 : 0;
      begin_pos_x += (cur_pos_x - x)
      cur_pos_x = x
      el.parent().scrollLeft(begin_pos_x - (right ? -temp_d : temp_d))
    }
  })
  el.parent().on('mousedown',function(e){
    press = true
    cur_pos_x = event.x
  })
  $(document).on('mouseup',function(e){
    if(move){
      x = event.x;
      d = right ? -lenght_stop : lenght_stop
      begin_pos_x += d 
    }
    el.parent().animate({
      scrollLeft: begin_pos_x
    },100,'linear',function(){
      begin_pos_x = el.parent().scrollLeft()
      press = false;
      move = false;
    })
  })
  $(document).on('dragstart','.scroll_box a',function(e){
    e.preventDefault();
  })
  $(document).on('click','.scroll_box a',function(e){
    if(move){
      e.preventDefault();
    }
  })
}
word_animate_do = function(item,show,time){
  if(show){
    setTimeout(function () {
      item.addClass('fadeInDown')
    }, parseFloat(item.data('pause')*time));
  }else{
    setTimeout(function () {
      item.removeClass('fadeInDown')
    }, (parseFloat(item.data('pause')))*time);
  }
}
word_animate = {
  start : function (item) {
    for(var n=0;n<item.length;n++){
      var 
        it = item.eq(n).addClass('word_animate'),
        new_html = '',
        text = it.text().split(''),
        mem = NaN;
      text.forEach(function (it2,i){
        if(mem != ' ' || it2 != ' ')
          new_html+='<span class="" data-index="'+i+'"data-pause="'+(i/(text.length-1))+'">'+it2+'</span>';
        mem = it2
      })
      item.eq(n).html(new_html)
      item.eq(n).attr('data-index',n)
    }
  },
  show : function (item,time){
    for(j=0;j<item.find('span').length;j++){
      word_animate_do(item.find('span').eq(j),true,time)
    }
  },
  hide : function (item,time){
    for(var k=0;k<item.find('span').length;k++){
      word_animate_do(item.find('span').eq(k),false,time)
    }
  }
}
word_animate_init = function (){
  objects = [
    $('.main_banner .slider h1'),
    $('.main_banner .slider h4'),
    $('.popup_menu .menu .row ul li a'),
    $('.popup_menu .menu .row .right span'),
    $('.popup_menu .menu .row .right p'),
  ]
  objects.forEach(function (item,i){
    word_animate.start(item)
    word_animate.show(item.parent().eq(0).find('h1,h2,h3,h4,h5,h6,p,a,span'),1000)
  })
}
