// Number helpers
var numberHelper = (function() {

  var public = {
    
    // Format number to: 10 000,00
    toCurrency : function(num) {
      var x = Math.round(num * Math.pow(10,2));
      var y = ('' + Math.abs(x)).split('');
      // console.log('y',y);

      var z = y.length - 2;
      // console.log('z',z);
      if (z<0) {
        z--;
      }
      // console.log('z--',z);
      for(var i = z; i < 0; i++){
        y.unshift('0');
      }
      if (z<0) {
        z = 1;
      }
      y.splice(z, 0, ',');
      if(y[0] === ',') {
        y.unshift('0');
      }
      while (z > 3) {
        z-=3;
        y.splice(z,0,' ');
      }
      num = y.join('');
      return num;
    },

    // makes sure the value type is number
    toNumber : function(value) {
      if (isNaN(value)) {
        value = value.replace(',','.');
        value = value.replace(/[^\d\.]/g,'');
        value = Math.round(value * 100) / 100;

        value = +value.toFixed(2);
      }
      return value;
    }
  };

  return public;
}());
