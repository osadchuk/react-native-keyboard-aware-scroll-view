/* @flow */

import React, { PropTypes } from 'react'
import { ScrollView } from 'react-native'
import KeyboardAwareMixin from './KeyboardAwareMixin'

const KeyboardAwareScrollView = React.createClass({
  propTypes: {
    ...ScrollView.propTypes,
    viewIsInsideTabBar: PropTypes.bool,
    resetScrollToCoords: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  },
  mixins: [KeyboardAwareMixin],

  componentWillMount: function () {
    this.setViewIsInsideTabBar(this.props.viewIsInsideTabBar)
    this.setResetScrollToCoords(this.props.resetScrollToCoords)
  },

  render: function () {
    return (
      <ScrollView
        ref='_rnkasv_keyboardView'
        keyboardDismissMode='interactive'
        contentInset={{bottom: this.state.keyboardSpace}}
        showsVerticalScrollIndicator={true}
        scrollEventThrottle={0}
        {...this.props}
        onContentSizeChange={(width, height) => {
          this.handleOnContentSizeChange(width, height);
          this.props.onContentSizeChange && this.props.onContentSizeChange(width, height);
        }}
        onScroll={e => {
          this.handleOnScroll(e)
          this.props.onScroll && this.props.onScroll(e)
        }}
        onLayout={e => {
          this.handleOnLayout(e);
          this.props.onLayout && this.props.onLayout(e);
        }}
        >
        {this.props.children}
      </ScrollView>
    )
  },
})

export default KeyboardAwareScrollView
