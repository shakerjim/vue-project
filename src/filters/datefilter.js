import Vue from "vue"
import fecha from "fecha"
Vue.filter("dateFormat",function(value,pattern= 'YYYY-MM-DD HH:mm:ss'){
  value=value || "2017-10-01 12:00:00"
  return fecha.format(new Date(value),pattern);
})