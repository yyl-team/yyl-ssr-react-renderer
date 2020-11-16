const path = require('path')
const React = require('react')
const { renderer } = require('../../')

test('usage test', () => {
  expect(
    renderer({
      title: 'title',
      props: {
        a: 1
      },
      tplPath: path.join(__dirname, '../case/index/index.html'),
      Routes() {
        return React.createElement('div')
      }
    })
  ).not.toEqual('')
})
