if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
  console.debug('This lib is for browser usage only.')
} else {
  console.log('Hello MailSelf window')
  if (!window.MailSelf) {
    var MailSelf = (function () {
      'use strict'

      var d = document

      var apiEndpoint = 'https://api.chriswitko.com/service/mailself'

      var metaTags = [
        'description',
        'og:description',
        'twitter:description',
        'og:image:secure_url',
        'og:image:url',
        'og:image',
        'twitter:image',
        'twitter:image:src',
        'og:title',
        'twitter:title'
      ]

      var getJSON = function (options) {
        options = options || {
          method: 'get',
          url: '',
          data: {},
          callback: function () {}
        }
        var xhr = new XMLHttpRequest()
        xhr.open(options.method || 'get', options.url, true)
        xhr.responseType = 'json'
        xhr.onload = function () {
          var status = xhr.status
          if (status === 200) {
            options.callback(null, xhr.response)
          } else {
            options.callback(status)
          }
        }
        xhr.send(options.data ? JSON.stringify(options.data) : null)
      }

      function Widget (options) {
        this.options = options || {}

        this.initialize()
        this.metas()
      }

      Widget.prototype.initialize = function () {
        console.log('Hello MailSelf initialize')
      }

      Widget.prototype.metas = function () {
        this.options.metas = this.options.metas || {}
        var metas = d.getElementsByTagName('meta')

        for (var i = 0; i < metas.length; i++) {
          var n = (metas[i].getAttribute('name') || metas[i].getAttribute('property') || '').toLowerCase()
          if (~metaTags.indexOf(n)) {
            this.options.metas[n] = metas[i].getAttribute('content')
          }
        }

        if (d) {
          this.options.metas['title'] = d.title || ''
          this.options.metas['link'] = d.location.href
        }
      }

      Widget.prototype.query = function () {
        var m = this.options.metas

        return {
          title: m['title'] || m['og:title'] || m['twitter:title'],
          link: m['link'],
          image: m['og:image'] || m['og:image:url'] || m['og:image:secure_url'] || m['twitter:image'] || m['twitter:image:src'],
          token: ''
        }
      }

      Widget.prototype.activate = function () {
        getJSON({
          url: apiEndpoint + '/activate',
          data: {
            email: ''
          },
          callback: function (err, data) {
            if (err !== null) {
              console.debug('Something went wrong', err)
            } else {
              console.log('data', data)
            }
          }
        })
      }

      Widget.prototype.token = function () {
        getJSON({
          url: apiEndpoint + '/token',
          data: {
            email: '',
            pin: ''
          },
          callback: function (err, data) {
            if (err !== null) {
              console.debug('Something went wrong', err)
            } else {
              console.log('data', data)
            }
          }
        })
      }

      Widget.prototype.send = function () {
        getJSON({
          url: apiEndpoint + '/send',
          data: this.query,
          callback: function (err, data) {
            if (err !== null) {
              console.debug('Something went wrong', err)
            } else {
              console.log('data', data)
            }
          }
        })
      }

      return Widget
    }()).bind(MailSelf)
  }
}