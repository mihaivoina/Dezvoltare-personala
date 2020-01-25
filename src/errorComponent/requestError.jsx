import React from 'react';
import './errorDisplay.css';

class RequestError extends React.Component {
    render () {
            return(
                <>
                    <div>
                        {this.props.error[0].response.status}
                        {this.props.error[0].response.statusText}
                        {/* {console.log(this.props.error)} */}
                    </div>
                </>
            );
        }
}

export default RequestError;