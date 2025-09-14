const parent = new Date();//working
const days = parent.getDay();//working
const months = parent.getMonth();

const date = parent.getDate();//working
const day = oFDay();//working
const year = parent.getFullYear();//working
const up = sup();//working
const month = ofMonth();//working

function sup(){//working
  if (date == 1 || date == 21 || date == 31){
    return "st"
  } else if (date == 2 || date == 22){
    return "nd"
  } else if (date == 3 || date == 23){
    return "rd"
  }else{
    return "th"
  }
}

function oFDay(){//working
 if(days === 0){
  return 'Sun'
  }
  else if (days === 1) {
    return 'Mon'
  }
  else if (days === 2) {
    return 'Tues'
  }
  else if (days === 3) {
    return 'Wed'
  }
  else if (days === 4) {
    return 'Thur'
  }
  else if (days === 5) {
    return 'Fri'
  }
  else if (days === 6) {
    return 'Sat'
  }
}
function ofMonth(){//working
  if(months === 0){
  return 'Jan'
  } else if (months === 1) {
    return 'Feb'
  }
  else if (months === 2) {
    return 'March'
  }
  else if (months === 3) {
    return 'April'
  }
  else if (months === 4) {
    return 'May'
  }
  else if (months === 5) {
    return 'Jun'
  }
  else if (months === 6) {
    return 'Jul'
  }
  else if (months === 7) {
    return 'Aug'
  }
  else if (months === 8) {
    return 'Sep'
  }
  else if (months === 9) {
    return 'Oct'
  }
  else if (months === 10) {
    return 'Nov'
  }
  else if (months === 11){
    return 'Dec'
  }
}