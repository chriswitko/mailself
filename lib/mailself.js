if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
  console.debug('This lib is for browser usage only.')
} else {
  console.log('Hello MailSelf window')
  if (!window.MailSelf) {
    var MailSelf = (function () {
      'use strict'

      var production = true

      var iframeId = 'com.chriswitko.handylinks.save'
      var v = '1.0.0' // the minimum version of jQuery we want

      var URL = {
        devURL: 'http://localhost:3000',
        productionURL: 'https://projects.chriswitko.com',

        apiSaveLinkPath: '/api/link/save',
        apiUnsaveLinkPath: '/api/link/unsave',
        apiShareLinkPath: '/api/link/share',
        apiSaveTagPath: '/api/link/tag/save',
        apiRemoveTagPath: '/api/link/tag/remove',

        loginPath: '/login',
        queryPath: '/search/'
      }

      var d = document

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

      Widget.prototype.getClient = function () {
        return 'bookmarklet'
      }

      Widget.prototype.getClientVersion = function () {
        return v
      }

      Widget.prototype.getUrl = function () {
        return document.location.href
      }

      Widget.prototype.getTitle = function () {
        return document.title
      }

      Widget.prototype.getIFrame = function () {
        return document.getElementById(iframeId)
      }

      Widget.prototype.getApiURL = function () {
        if (this.isProduction()) {
          return URL.productionURL
        } else {
          return URL.devURL
        }
      }

      Widget.prototype.getAPISaveLinkURL = function () {
        return this.getApiURL() + URL.apiSaveLinkPath
      }

      Widget.prototype.isProduction = function () {
        return production
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
          url: this.getApiURL() + URL.apiSaveLinkPath,
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
          url: this.getApiURL() + URL.apiSaveLinkPath,
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
          url: this.getApiURL() + URL.apiSaveLinkPath,
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
