import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Multi from '../src/ReactDashboard';

const settings = {
      elements:{
						 a: [
              {
                type:'GAMetric',
                cardStyle: 'metric',
                background: '#9F3E69',
                metric: 'getRandomMetric',
                caption: 'A Jawn',
                iconClass: 'glyphicon glyphicon-user'
              }

						 ],
             b: [
              {
                type:'GAMetric',
                cardStyle: 'metric',
                background: '#9F3E69',
                metric: 'getRandomMetric',
                caption: 'B Jawn 1',
                iconClass: 'glyphicon glyphicon-user'
              },
              {
                type:'GAMetric',
                cardStyle: 'metric',
                background: 'cyan',
                metric: 'getRandomMetric',
                caption: 'B Jawn 2',
                iconClass: 'glyphicon glyphicon-tint'
              }
            ]
           }
          } 

console.log(settings);

describe('3+1', () => {
  let sum = 3+1;

  it('should be 4', () => {
    expect(sum).toBe(4);
  });
});

describe('Multi component renders', () => {
    const multi = TestUtils.renderIntoDocument(
      <Multi {...settings} />
    );

    const node = ReactDOM.findDOMNode(multi);
    
});
