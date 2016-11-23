MailSelf.js is a minimalistic lib for sending links to your personal email address from the browser.

## How to use

Install it:

```
javascript:(function(){document.body.appendChild(document.createElement('script')).src='file:///Users/chris/projects/stuff/jshome/mailself/lib/mailself.js?'%20+%20Date.now();})();
```

## TODO

The following features are the list:

- Getting token to send link
- User enter email and receive email confirmation with activation PIN Code (pin is valid for 15 min)
- If user enter valid PIN we save token locally and use it to send email
- If no token, redirect user to chriswitko.com/mailself
- Token should be saved in cookie or inject the bookmarklet script

## Author

- Chris Witko ([@chris_witko](https://twitter.com/chriswitko))