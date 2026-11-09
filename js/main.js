$(function(){
  // Back-to-top button (jQuery fade + animate)
  $(window).on('scroll',()=>$(window).scrollTop()>300?$('#toTop').fadeIn():$('#toTop').fadeOut());
  $('#toTop').click(()=>$('html,body').animate({scrollTop:0},500));
  // Rocket launch (jQuery animate)
  let busy=false;
  $('#launch').click(function(){
    if(busy)return;busy=true;let n=3;$(this).prop('disabled',true);
    $('#rocket').stop().css({bottom:26,opacity:1});
    $('#count').text(n).fadeIn(200);
    const t=setInterval(()=>{n--;
      if(n>0)return $('#count').text(n);
      clearInterval(t);$('#count').text('Liftoff!');
      $('#rocket').animate({bottom:'520px',opacity:0},2200,'swing',()=>{
        $('#count').fadeOut(400);$('#launch').prop('disabled',false).text('Launch again');busy=false;});
    },900);
  });
  // Animated counters
  $('.stat').each(function(){const $e=$(this),to=+$e.data('to');
    $({v:0}).animate({v:to},{duration:1800,step:v=>$e.text(Math.floor(v)),complete:()=>$e.text(to)});});
  // Mission filter (jQuery fade)
  $('.flt').click(function(){
    $('.flt').removeClass('on');$(this).addClass('on');const f=$(this).data('f');
    $('.mission,.gal').each(function(){const show=f==='all'||$(this).data('type')===f;
      show?$(this).fadeIn(300):$(this).fadeOut(200);});
  });
  // Modal window
  $('.mission .btn-line').click(function(){
    const c=$(this).closest('.mission');
    $('#mTitle').text(c.find('h3').text());$('#mBody').text(c.data('info'));
    new bootstrap.Modal('#mModal').show();
  });
  // Gallery lightbox (Bootstrap modal)
  $('.gal').click(function(){
    const i=$(this).find('img');if(!i.length)return;
    $('#lbImg').attr('src',i.attr('src'));$('#lbCap').text($(this).find('.cap span:first').text());
    new bootstrap.Modal('#lb').show();
  });
  // Timeline reveal on scroll (jQuery animate)
  const tl=$('.tl-item').css('opacity',0);
  const reveal=()=>tl.each(function(){if($(this).offset().top<$(window).scrollTop()+$(window).height()-60)$(this).animate({opacity:1},600);});
  $(window).on('scroll',reveal);reveal();
  // Form validation (JavaScript)
  $('#cform').on('submit',function(e){
    e.preventDefault();let ok=true;
    const name=$('#name').val().trim(),mail=$('#mail').val().trim(),msg=$('#msg').val().trim();
    const set=(id,bad,t)=>{$(id).toggleClass('is-invalid',bad);$(id+'E').text(bad?t:'');if(bad)ok=false;};
    set('#name',name.length<2,'Enter your name (at least 2 characters).');
    set('#mail',!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail),'Enter a valid email, for example name@mail.com.');
    set('#msg',msg.length<10,'Your message must be at least 10 characters.');
    if(ok){this.reset();$('#ok').hide().slideDown(400).delay(4000).slideUp(400);}
  });
});
