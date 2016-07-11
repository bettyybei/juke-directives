'use strict'

juke.directive('sidebar', function() {
  return {
    restrict: 'E',
    templateUrl: '/js/sidebar/templates/sidebar.html'
  }
})

juke.directive('player', function(PlayerFactory) {
  return {
    restrict: 'E',
    templateUrl: '/js/player/templates/player.html',
    link: function(scope) {
      angular.extend(scope, PlayerFactory); // copy props from param2 to param1

      scope.toggle = function() {
        if (PlayerFactory.isPlaying()) PlayerFactory.pause();
        else PlayerFactory.resume();
      };

      scope.getPercent = function() {
        return PlayerFactory.getProgress() * 100;
      };

      scope.handleProgressClick = function(evt) {
        PlayerFactory.seek(evt.offsetX / evt.currentTarget.scrollWidth);
      };
    }
  }
})

juke.directive('albumList', function() {
  return {
    restrict: 'E',
    templateUrl: '/js/album/templates/albums.html',
    scope: {
      albums: '='
    }
  }
})


juke.directive('songList', function(PlayerFactory) {
  return {
    restrict: 'E',
    templateUrl: '/js/song/templates/song-panel.html',
    scope: {
      songs: '='
    },
    link: function(scope) {

      scope.toggle = function(song) {
        if (song !== PlayerFactory.getCurrentSong()) {
          PlayerFactory.start(song, scope.songs);
        } else if (PlayerFactory.isPlaying()) {
          PlayerFactory.pause();
        } else {
          PlayerFactory.resume();
        }
      };

      scope.getCurrentSong = function() {
        return PlayerFactory.getCurrentSong();
      };

      scope.isPlaying = function(song) {
        return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
      };


    }
  }
})
