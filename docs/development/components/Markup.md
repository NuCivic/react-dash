# Markup
Markup component allows you to embed arbitrary html markup within your react dashboard layout.

For example - a static html list:
```javascript
{
  type: 'Markup',
  content: '<div>\
                <ul>\
                    <li>FOO</li>\
                    <li>BAR</li>\
                    <li>BAZ</li>\
                </ul>\
            </div>'
}
```

**Available settings**
* **content:** the html content to display.
