// Взято с https://habr.com/ru/post/156185/

const Share = {
  vkontakte: function (purl, ptitle, pimg, text) {
    let url = 'http://vk.com/share.php?';
    url += 'url=' + encodeURIComponent(purl);
    url += '&title=' + encodeURIComponent(ptitle);
    url += '&image=' + encodeURIComponent(pimg);
    url += '&noparse=falsew';
    Share.popup(url);
  },

  popup: function (url) {
    window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
  }
};
export default Share