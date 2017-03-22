function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatSeconds(value) { 
  var theTime = parseInt(value);
  var theTime1 = 0;
  var theTime2 = 0; 

  if(theTime > 60) { 
  theTime1 = parseInt(theTime/60); 
  theTime = parseInt(theTime%60); 

  if(theTime1 > 60) { 
  theTime2 = parseInt(theTime1/60); 
  theTime1 = parseInt(theTime1%60); 
  } 
  } 
     var result="" ;
  if (theTime>0) {
  result = ""+parseInt(theTime)+"秒"; 
  }

  if(theTime1 > 0) { 
  result = ""+parseInt(theTime1)+"分钟"+result; 
  } 
  if(theTime2 > 0) { 
  result = ""+parseInt(theTime2)+"小时"+result; 
  } 
  return result; 
} 




function getDateDiff(dateTimeStamp){
   var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
      var now = new Date().getTime();
      var diffValue = now - getDateTimeStamp(dateTimeStamp);
      if(diffValue < 0){
       //若日期不符则弹出窗口告之
       //alert("结束日期不能小于开始日期！");
       }
      var monthC =diffValue/month;
      var weekC =diffValue/(7*day);
      var dayC =diffValue/day;
      var hourC =diffValue/hour;
      var minC =diffValue/minute;
      if(monthC>=1){
       result= parseInt(monthC) + "个月前";
       }
       else if(weekC>=1){
       result= parseInt(weekC) + "周前";
       }
       else if(dayC>=1){
       result= parseInt(dayC) +"天前";
       }
       else if(hourC>=1){
       result= parseInt(hourC) +"个小时前";
       }
       else if(minC>=1){
       result= parseInt(minC) +"分钟前";
       }else{
           result="刚刚";
       }
    
      return result;
  }


  function getDateTimeStamp(dateStr){
     return Date.parse(dateStr.replace(/-/gi,"/"));
}


function formatduration(duration) {
  var duration = new Date(duration);
  var mint = duration.getMinutes();
  var sec = duration.getSeconds();
  return formatNumber(mint) + ":" + formatNumber(sec);
}



module.exports = {
  formatTime: formatTime,
  formatSeconds:formatSeconds,
  getDateDiff:getDateDiff,
  formatduration:formatduration
}
