import React from 'react'


class Notification extends React.Component {


    getStyle() {
        return { display: (this.props.message ? '' : 'none'), position: 'absolute', width: '100%', height: '50px', fontSize: '40px', zIndex: '999', backgroundColor: 'red' };
    }


    render() {
        return <div style={this.getStyle()}>
            {this.props.message}
        </div>
    }
}

export default Notification;