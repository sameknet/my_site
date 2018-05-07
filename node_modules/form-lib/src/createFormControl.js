import React from 'react';
import PropTypes from 'prop-types';

function createFormControl(Component) {
  const propTypes = {
    /* eslint-disable react/forbid-prop-types */
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func
  };

  class FormControl extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
      const { onChange } = this.props;
      const value = e.target.value;
      onChange && onChange(value);
    }

    render() {
      const { className, ...props } = this.props;

      return (
        <Component
          {...props}
          className={`form-control ${className || ''}`}
          onChange={this.handleChange}
        />
      );
    }
  }

  FormControl.propTypes = propTypes;
  FormControl.displayName = 'FormControlField';

  return FormControl;
}

export default createFormControl;
