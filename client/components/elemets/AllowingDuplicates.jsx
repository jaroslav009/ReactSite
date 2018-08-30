import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FileInput, TextField, Snackbar } from 'react-md';

// Include Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import transferFile from '../../actions/transferFile.jsx';

// Cheating a bit since I just want some space between the button and the text field
// just like the icon, so only include the onChange from props and the className
// that is cloned in by the TextField for icons.
const Input = ({ onChange, className }) => (
  <FileInput
    id="duplicate-file-selection"
    label="Choose file"
    accept="image/*,video/*"
    onChange={onChange}
    className={className}
    primary
    iconBefore
    allowDuplicates
  />
);

Input.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
};

class AllowingDuplicates extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '', 
      fileName: '', 
      toasts: []
	}
	this.handleChange = this.handleChange.bind(this);
	this.dismissToast = this.dismissToast.bind(this);
	}
	handleChange({ name }, e) {
	const { value } = e.target;
	console.log('file url ' + e.target.value)
	transferFile(e.target.value);
	
    const toasts = [
      ...this.state.toasts, {
        text: `${this.state.value === value ? 'The onChange event would not have been triggered again for' : 'Selected'} ${name}`,
      },
    ];
	this.setState({ value, fileName: name, toasts });
	console.log('state redux ' + JSON.stringify(this.props.transferFileReduce)) 
  };

  dismissToast() {
    this.setState(prevState => ({
      toasts: prevState.toasts.slice(1),
    }));
  };

  render() {
    const { value, fileName, toasts } = this.state;

    return (
			<div className="center_text_field fixed_width">
				<TextField
				id="duplicate-file-selection-field"
				placeholder="No file chosen"
				value={fileName}
				readOnly
				leftIcon={<Input onChange={this.handleChange} />}
				/>
				<Snackbar id="duplicate-file-messages" toasts={toasts} onDismiss={this.dismissToast} />
			</div>
		);
  	}
}

function mapStateToProps(state) {
	return {
		transferFileReduce: state
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({transferFile: transferFile}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AllowingDuplicates);
