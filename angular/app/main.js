import angular from 'angular'

angular.module('app', [])
  .controller('MainController', function ($http) {
    var self = this;

    self.subreddits = ['angularjs', 'frontend'];

    self.state = {
      selectedSubreddit: self.subreddits[0],
      isLoading: false,
      subreddits: {}
    };

    self.selectSubreddit = subreddit => {
      loadSubreddit(subreddit);
    };

    function loadSubreddit (subreddit) {
      self.state.isLoading = true;
      $http.get(`https://www.reddit.com/r/${subreddit}.json`)
        .then(res => self.state.subreddits[subreddit] = {
          lastUpdated: new Date(),
          items: res.data.data.children.map(c => c.data)
        })
        .finally(() => self.state.isLoading = false);
    }

    loadSubreddit(self.state.selectedSubreddit);
  });