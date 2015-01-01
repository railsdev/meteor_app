if (Meteor.isClient) {

  Videos= new Mongo.Collection('videos');
  Tracker.autorun(function(){
    Meteor.subscribe("video_search");
  })

  Meteor.startup(function () {
    window.addEventListener('polymer-ready', function(e) {
      $('body').css('visibility','visible');
    });
  });


  Template.body.helpers({  
    videos: function() {
      Meteor.log.debug("ts",Videos.find())
      return Videos.find();
    }
  });
}

