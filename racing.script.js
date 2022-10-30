var rot = 0,
    rot_speed = 3,
    laps = 0,
    car_count = 0,
    en_cars = document.querySelectorAll('.en_car'),
    playa = document.querySelector('#car'),
    pumpkin = document.querySelector('#pumpkin'),
    num_of_trees = 10
// runGame = setInterval(driveCar,1000/60)

function driveCar() {
  rot = rot + rot_speed
  if(rot >= 360) {
    rot = 0
    laps++
    laps_count.innerHTML = laps
  }
  document.documentElement.style.setProperty('--car-rot', 'rotate('+rot+'deg)')

  if(laps == 1 && car_count == 0) {    
    en_cars[car_count].style.display = 'block'
    car_count++
  }
  if(laps == 4 && car_count == 1) {    
    en_cars[car_count].style.display = 'block'
    car_count++
  }
  if(laps == 7 && car_count == 2) {    
    en_cars[car_count].style.display = 'block'
    car_count++
  }
  if(laps == 10 && car_count == 3) {    
    en_cars[car_count].style.display = 'block'
    car_count++
  } 

  checkWreck()
}

function checkWreck() {  
  en_cars.forEach(function(e){
    var playa_loc = playa.getBoundingClientRect(),
        half = playa_loc.width*.5
    tl = document.elementFromPoint(playa_loc.x + half,playa_loc.y + half),
      tr = document.elementFromPoint(playa_loc.x + playa_loc.width - half,playa_loc.y + half),
      bl = document.elementFromPoint(playa_loc.x + half,playa_loc.y + playa_loc.height - half),
      br = document.elementFromPoint(playa_loc.x + playa_loc.width - half,playa_loc.y + playa_loc.height - half)

    if(tl.classList.contains('en_car') || tr.classList.contains('en_car') || bl.classList.contains('en_car') || br.classList.contains('en_car')) {
      clearInterval(runGame)
      not_playa.style.animationPlayState = 'paused'
      pumpkin.style.animationPlayState = 'paused'
      spider.style.animationPlayState = 'paused'
      instructions.style.display = 'block'
      window.addEventListener('click', startGame)
    }
  })
}

function addCar() {
  var c = document.createElement('div')
  c.className = 'en_car'
  not_playa.appendChild(c)
}

// add trees for fun
for(var i=0;i<num_of_trees;i++){
  var t = document.createElement('div')
  t.className = 'tree'
  t.style.left = i % 2 === 0 ? Math.random()*10 + (i*10) + '%' : Math.random()*10 + (i*10) + '%'
  t.style.top = i % 2 === 0 ? Math.round(Math.random()*12) + '%' : Math.round(Math.random()*15) + 76 +'%'
  game_box.appendChild(t)
}

window.addEventListener('mousedown', function(){
  rot_speed = 1
})

window.addEventListener('mouseup', function(){
  rot_speed = 3
})

function startGame(e) {
  if(e.target.id == 'instructions') {
    instructions.style.display = 'none'
    runGame = setInterval(driveCar,1000/60)
    for(var i=0;i<en_cars.length;i++) {
      en_cars[i].style.display = ''
    } 
    not_playa.style.animationPlayState = ''
    pumpkin.style.animationPlayState = ''
    spider.style.animationPlayState = ''
    rot = 0,
      rot_speed = 3,
      laps = 0,
      car_count = 0
    laps_count.innerHTML = laps
    window.removeEventListener('click', startGame)
  }
}
window.addEventListener('click', startGame)