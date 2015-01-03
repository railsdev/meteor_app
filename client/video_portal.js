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


  Template.header.helpers({  
    videos: function() {
      return Videos.find();
    }
  });
}

