import React from 'react';
import './errorDisplay.css';

class RequestError extends React.Component {
    render () {
        if (typeof this.props.error === 'string'){
            return <div>{this.props.error}</div>
        }
            return(
                <>
                    <div>
                        {this.props.error[0].response.status}
                        {this.props.error[0].response.statusText}
                    </div>
                </>
            );
        }
}

export default RequestError;