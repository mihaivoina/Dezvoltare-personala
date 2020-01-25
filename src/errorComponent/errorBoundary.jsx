import React from 'react';
import './errorDisplay.css';

class ErrorBoundary extends React.Component {
    state = {
        error: null,
        errorInfo: null
    }

    componentDidCatch(error, errorInfo) {
        console.log('error:', error);
        
        this.setState ({
            error,
            errorInfo
        })
    }

    render () {
        if (this.state.errorInfo) {
            return(
                <>
                    <div>
                        Error
                        {this.state.error}
                        {this.state.errorInfo}
                    </div>
                </>
            );
        }
        return this.props.children
    }
}

export default ErrorBoundary;