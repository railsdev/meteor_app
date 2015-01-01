if (Meteor.isServer) {   

  Meteor.startup(function () {
    Meteor.publish('video_search', function(){
      var self = this
      var response = HTTP.get("https://www.googleapis.com/youtube/v3/channels", {
        params: {
          part : 'contentDetails', 
          forUsername : 'MeteorVideos',
          key: 'AIzaSyDy_Hslfblc3MEnwHZgfOEnCkh9MpCK7Ug'
        }
      });

      _.each(response.data.items, function(item) {
        pid = item.contentDetails.relatedPlaylists.uploads;
        var _response = HTTP.get("https://www.googleapis.com/youtube/v3/playlistItems",{
          params: {
            part : 'snippet', 
            maxResults : 20,
            playlistId : pid,
            key: 'AIzaSyDy_Hslfblc3MEnwHZgfOEnCkh9MpCK7Ug'
          }
        });

        _.each(_response.data.items, function(item) {
          var doc = {
            title: item.snippet.title
          };
          self.added('videos', Random.id(), doc);

        })
      })
      self.ready();
    })
  })
}


