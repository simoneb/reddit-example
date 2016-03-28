reddit example with redux and angularjs
=====

This is a simple comparison of the same simple application
from [redux docs](http://redux.js.org/docs/advanced/ExampleRedditAPI.html)
build with both redux and angular.

It's an attempt at measuring the difference in amount of code needed
to write this specific app with both tools.

## Results

The amount of code written is measured with [cloc](https://github.com/AlDanial/cloc)
and here are the results.

### redux

Language|files|blank|comment|code
:-------|-------:|-------:|-------:|-------:
JavaScript|9|35|0|238
HTML|1|0|0|11
--------|--------|--------|--------|--------
SUM:|10|35|0|249

### angular

Language|files|blank|comment|code
:-------|-------:|-------:|-------:|-------:
JavaScript|2|7|0|43
HTML|1|1|0|28
--------|--------|--------|--------|--------
SUM:|3|8|0|71