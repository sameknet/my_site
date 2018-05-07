import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { SchemaModel, Schema } from 'rsuite-schema';
import classNames from 'classnames';

const propTypes = {
  horizontal: PropTypes.bool,
  inline: PropTypes.bool,
   /*eslint-disable */
  values: PropTypes.object,
  defaultValues: PropTypes.object,
  model: PropTypes.instanceOf(Schema),

  /**
   * 数据校验的时候，延迟处理，默认为 500 毫秒
   */
  checkDelay: PropTypes.number,

  /**
   * 数据校验的触发类型, 默认 change
   * change: 数据改变的时候触发
   * blur: 控件失去焦点时候触发
   * null: 不触发校验，但是在 调用 Form 的 check 方法的时候还是会触发
   */
  checkTrigger: PropTypes.oneOf(['change', 'blur', null]),
  onChange: PropTypes.func,
  onError: PropTypes.func,
  onCheck: PropTypes.func,
  errors: PropTypes.object
};

const defaultProps = {
  model: SchemaModel({}),
  horizontal: false,
  inline: false,
  defaultValues: {},
  checkDelay: 500,
  checkTrigger: 'change'
};


class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: props.errors || {},
      /**
       * 把当前 values 维护到 state 中，主要为 Form 中的 check 方法
       * 默认会设置 props.values ，
       * 如果还是没有的话就默认为 {}
       */
      values: props.defaultValues || {}
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleFieldError = _.debounce(this.handleFieldError.bind(this), props.checkDelay);
    this.handleFieldSuccess = _.debounce(this.handleFieldSuccess.bind(this), props.checkDelay);
    this.check = this.check.bind(this);
  }
  getChildContext() {
    const { defaultValues, model, checkTrigger } = this.props;
    const values = this.getValues();
    const errors = this.getErrors();

    return {
      form: {
        onFieldChange: this.handleFieldChange,
        onFieldError: this.handleFieldError,
        onFieldSuccess: this.handleFieldSuccess,
        checkTrigger,
        values,
        defaultValues,
        errors,
        model
      }
    };
  }

  getErrors(){
    const { errors } = this.props;
    return typeof errors === 'undefined' ? this.state.errors : errors;
  }

  getValues(){
    const { values } = this.props;
    return typeof values === 'undefined' ? this.state.values : values;
  }

  /**
   * 校验表单数据是否合法
   * 该方法主要提供给 Form ref 时候调用
   * return  true/false
   */
  check(callback) {
    const values = this.getValues();
    const { defaultValues, model, onCheck, onError } = this.props;
    const errors = {};
    let errorCount = 0;

    const nextValues = Object.assign({}, defaultValues, values);


    Object.keys(model.schema).forEach((key) => {
      const checkResult = model.checkForField(key, nextValues[key]);

      if (checkResult.hasError === true) {
        errorCount += 1;
        errors[key] = checkResult.errorMessage;
      }
    });

    this.setState({ errors });
    onCheck && onCheck(errors);
    callback && callback(errors);
    if (errorCount > 0) {
      onError && onError(errors);
      return false;
    }

    return true;
  }

  cleanErrors(callback) {
    this.setState({ errors: {} }, callback);
  }

  resetErrors(errors = {}, callback) {
    this.setState({ errors }, callback);
  }

  /**
   * 验证，出现错误的回调函数
   */
  handleFieldError(name, error) {


    const { onError, onCheck } = this.props;
    const errors = Object.assign({}, this.state.errors, {
      [name]: error
    });

    this.setState({ errors }, () => {
      onError && onError(errors);
      onCheck && onCheck(errors);
    });
  }

  /**
   * 验证通过的回调函数
   */
  handleFieldSuccess(name) {
    const { onCheck } = this.props;
    const errors = Object.assign({}, this.state.errors, {
      [name]: null
    });
    this.setState({ errors }, () => {
      onCheck && onCheck(errors);
    });
  }

  /**
   * 每一次 字段数据更新回调函数
   */
  handleFieldChange(name, value, event) {
    const { onChange } = this.props;
    const values = this.getValues();
    const nextValues = Object.assign({}, values, {
      [name]: value
    });

    this.setState({
      values: nextValues
    });

    onChange && onChange(nextValues, event);
  }

  render() {

    const {
      horizontal,
      inline,
      className,
      ...props
    } = this.props;

    const clesses = classNames('form', {
      'form-horizontal': horizontal,
      'form-inline': inline
    }, className);

    const elementProps = _.omit(props, Object.keys(propTypes));

    return (
      <form
        {...elementProps}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className={clesses}
      />
    );
  }
}

Form.defaultProps = defaultProps;
Form.propTypes = propTypes;
Form.childContextTypes = {
  form: PropTypes.object.isRequired
};

export default Form;
