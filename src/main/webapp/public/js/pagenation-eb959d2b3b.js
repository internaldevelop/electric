var pagenation=function(){var t={},r=$(".page-mask"),i=$(".loading"),u={};function o(e){!0===u.isCache&&null==t[e.pagenation.currentPage]&&(t[e.pagenation.currentPage]=function e(n){var a,t,r;if("object"===$.type(n))for(t in a={},n)a[t]=e(n[t]);else if("array"===$.type(n))for(a=[],r=0;r<n.length;r++)a[r]=e(n[r]);else a=n;return a}(e)),u.successCb(e),c()}function c(){r.hide(),i.hide()}return{init:function(e){e.url||function(e){throw new Error(e)}("请传入有效的数据请求URL"),u.url=e.url,u.perPage=e.perPage||10,u.isCache=null==e.isCache||!!e.isCache,u.successCb=e.successCb||function(){}},setOption:function(e,n){if(2!==arguments.length)return!1;u[e]=n},requestPage:function(e){var n,a="?";-1<u.url.indexOf("?")&&(a="&"),n=u.url+a+"page="+e+"&perPage="+u.perPage+"&_="+Math.random(),r.show(),i.show(),!1===u.isCache&&(t={}),null!=t[e]?(o(t[e]),c()):$.ajax({type:"GET",url:n,dataType:"JSON"}).then(function(e){o(e)},function(){c()})}}};module.exports.pagenation=pagenation;