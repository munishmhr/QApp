/*
  This is backbone route whenever e.g index (right) is asked in addess index (left)
  will be invoked. e.g in index method new Index view is invoked with passing a collection
  to constructor of view.
*/
define(['views/index','models/techCollection'],
  function(Index,TechCollection) {
      var QAppRouter = Backbone.Router.extend({
        currentView: null,
        
        routes: {
          "index": "index",
        },

        changeView: function(view) {
          if ( null != this.currentView ) {
            this.currentView.undelegateEvents();
          }

          this.currentView = view;
          this.currentView.render();
        },

        index : function() {
          var techCollection = new TechCollection();
          //console.log('inside index router.js');
          var that = this;
          techCollection.fetch({
              success : function(){
                //console.log(techCollection);
                that.changeView(new Index({
                    collection : techCollection
                }));
              },
              error : function(){
                console.log("error");
              }
          });
        },

      });

  return new QAppRouter();
});
