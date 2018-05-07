import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'rsuite-utils/lib/propTypes/elementType';
import createFormControl from './createFormControl';

const propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  checkTrigger: PropTypes.oneOf(['change', 'blur', null]),
  accepter: elementType
};

const defaultProps = {
  accepter: createFormControl('input')
};

class Field extends React.Component {

  constructor(props, context) {
    super(props, context);
    if (!context.form) {
      throw new Error('Field must be inside a component decorated with <Form>');
    }


    const { values = {}, defaultValues = {} } = context.form;
    const name = props.name;

    this.state = {
      checkResult: {},
      value: values[name] || defaultValues[name]
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleFieldBlur = this.handleFieldBlur.bind(this);
    this.handleFieldCheck = this.handleFieldCheck.bind(this);
  }

  getCheckTrigger() {
    const { checkTrigger } = this.context.form;
    return this.props.checkTrigger || checkTrigger;
  }

  handleFieldChange(value, event) {

    const { name, onChange } = this.props;
    const { onFieldChange } = this.context.form;
    const checkTrigger = this.getCheckTrigger();
    const checkResult = this.handleFieldCheck(value, checkTrigger === 'change');
    this.setState({ checkResult, value });
    onFieldChange(name, value, event);
    onChange && onChange(value, event);
  }

  handleFieldBlur(event) {
    const { onBlur } = this.props;
    const checkTrigger = this.getCheckTrigger();
    this.handleFieldCheck(this.state.value, checkTrigger === 'blur');
    onBlur && onBlur(event);
  }

  handleFieldCheck(value, isCheckTrigger, callback) {
    const { name } = this.props;
    const {
      onFieldError,
      onFieldSuccess,
      model
    } = this.context.form;


    const checkResult = model.checkForField(name, value);

    if (isCheckTrigger) {
      if (checkResult.hasError) {
        onFieldError(name, checkResult.errorMessage, callback);
      } else {
        onFieldSuccess(name, callback);
      }
    }

    return checkResult;
  }

  render() {
    let { name, accepter: Component, ...props } = this.props;
    const { values = {}, defaultValues = {} } = this.context.form;

    return (
      <Component
        {...props}
        name={name}
        onChange={this.handleFieldChange}
        onBlur={this.handleFieldBlur}
        defaultValue={defaultValues[name]}
        value={values[name]}
      />
    );
  }
}

Field.defaultProps = defaultProps;
Field.propTypes = propTypes;
Field.contextTypes = {
  form: PropTypes.object
};

export default Field;
