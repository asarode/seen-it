document.addEventListener('DOMContentLoaded', function() {
  var div = document.getElementById('main');
  var app = Elm.Main.embed(div);
  app.ports.setStorage.subscribe(function(state) {
    localStorage.setItem('elm-seen-it', JSON.stringify(state));
  });
  app.ports.clearStorage.subscribe(function() {
    localStorage.removeItem('elm-seen-it');
  });
});
