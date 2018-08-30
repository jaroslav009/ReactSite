import React, {Component} from 'react';
import {
    Grid, 
    Cell,
    TextField,
    Button,
    DialogContainer,
  } from 'react-md';

// Include Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import transferFile from '../actions/transferFile.jsx';

import AllowingDuplicates from './elemets/AllowingDuplicates.jsx';

class CreateNews extends Component {

    constructor(props) {
        super(props);

        // Functions for input
        this.title = this.title.bind(this);
        this.longDescription = this.longDescription.bind(this);
        this.shortDescription = this.shortDescription.bind(this);

        // Submit
        this.submitHandle = this.submitHandle.bind(this);
            // Hide submit
        this.hide = this.hide.bind(this);
        this.state = {
            title: '',
            longDescription: '',
            shortDescription: '',
            visiblePopUp: false,
        }
        
    }

    // Functions input begin
    title() {
        let value = this.titleValue.value;
        this.setState({ title: value });
    }

    longDescription() {
        let value = this.longDescriptionValue.value;
        this.setState({ longDescription: value });
    }

    shortDescription() {
        let value = this.shortDescriptionValue.value;
        this.setState({ shortDescription: value });
    }

    // Functions input end
    // Function button begin
    submitHandle() {
        console.log('1.'+this.state.title);
        console.log('2.'+this.state.longDescription);
        console.log('3.'+this.state.shortDescription);
        if(this.state.title === '' || this.state.longDescription === '' || this.state.shortDescription === '') {
            return console.log('not validation');
        }
        transferFile(this.state.title);
        console.log('transferFileReduce ' + JSON.stringify(this.props.transferFileReduce))
        this.setState({
            visiblePopUp: true
        })
    }

    // Hide Button
    hide() {
        this.setState({
            visiblePopUp: false
        })
    }

    render() {
        const actions = [{
          id: 'dialog-ok',
          primary: true,
          children: 'Ok',
          onClick: this.hide,
        }];
        return(
            <div>
                <Grid>
                    <Cell size={12}>
                        <div className="center_text_field">
                            <h1 className="titlePage">Create Your News</h1>
                        </div>
                    </Cell>
                    <Cell size={12}>
                        <div className="center_text_field">
                            <TextField
                            id="floating-center-title"
                            label="Title"
                            lineDirection="center"
                            className="md-cell md-cell--bottom"
                            required
                            ref={(titleValue) => this.titleValue = titleValue}
                            onChange={this.title}
                            maxLength={32}
                            />
                        </div>
                    </Cell>
                    <Cell size={12}>
                        <div className="center_text_field">
                            <TextField
                            id="floating-label-error-text-field"
                            label="Long Description"
                            lineDirection="right"
                            rows={2}
                            required
                            ref={(longDescriptionValue) => this.longDescriptionValue = longDescriptionValue}
                            className="md-cell md-cell--bottom"
                            onChange={this.longDescription}
                            />
                        </div>
                    </Cell>
                    <Cell size={12}>
                        <div className="center_text_field">
                            <TextField
                            id="floating-multiline"
                            label="Short Description"
                            lineDirection="right"
                            rows={2}
                            required
                            ref={(shortDescriptionValue) => this.shortDescriptionValue = shortDescriptionValue}
                            className="md-cell md-cell--bottom"
                            onChange={this.shortDescription}
                            maxLength={320}
                            />
                        </div>
                    </Cell>
                    <Cell size={12}>
                        <AllowingDuplicates/>
                    </Cell>
                    <Cell size={12}>
                        <div className="center_text_field">
                            <Button flat primary swapTheming onClick={this.submitHandle}>Publish</Button>
                        </div>
                    </Cell>
                </Grid>

                {/* PopUp Begin */}

                <DialogContainer
                id="speed-boost"
                visible={this.state.visiblePopUp}
                onHide={this.hide}
                className="successText"
                title="Successfully"
                aria-describedby="speed-boost-description"
                modal
                actions={actions}
                >
                    <span>Your news <strong>successfully</strong> published</span>
                </DialogContainer>

                {/* PopUp End */}
            </div>
            
        )
    }
}

function mapStateToProps(state) {
	return {
		transferFileReduce: state.transferFileReduce
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({transferFile: transferFile}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(CreateNews);
