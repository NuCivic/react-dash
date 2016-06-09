import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {Registry} from '../src/ReactDashboard';
import Text from '../src/components/Text';
 
let settings = {
								header: 'This is an awesome text',
								type: 'Text',
								content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut erat dui, sodales eleifend placerat a, dictum sed tortor.</p><p> Quisque porttitor urna in est vehicula, a molestie nunc pharetra. Cras vehicula nisi dui, ut aliquam nunc vulputate lacinia. Curabitur vitae interdum dolor, sed venenatis tellus. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam volutpat metus et ipsum lobortis, at porttitor nunc laoreet.</p><p>Nullam et ligula at enim pretium accumsan. In et facilisis enim, vel consectetur justo. Duis eleifend sit amet neque eu interdum. Sed ornare orci diam, ac finibus ipsum posuere vel. Duis maximus velit ipsum, et mattis massa tempus sit amet. Suspendisse potenti.</p>',
								cardStyle: 'card',							
              };

describe('Instantiate Text component', () => {
  it('Component should render as React DOM node', () => {
    let node = TestUtils.renderIntoDocument(React.createElement(Registry.get('Text'), settings));
    expect(node.props.type).toBe('Text');
  });
});

// @@TODO
// * check for text in DOM
