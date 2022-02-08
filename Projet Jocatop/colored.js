var colorsExamples = anime.timeline({
    endDelay: 2000,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true
  })
  .add({ targets: '.qui',  color: '#fff' }, 0)
  .add({ targets: '.nat',  color: '#008000' }, 0);