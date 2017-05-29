import React from 'react';

class ReferenceDataText extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    const { type, value } = this.props;

    if(value){
      this.getRefDataText(type, value).then(
        result => {
          this.setState({
            text: result
          })
        }
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    const { type, value } = nextProps;

    if(value){
      this.getRefDataText(type, value).then(
        result => {
          this.setState({
            text: result
          })
        }
      )
    }
  }

  getRefDataText = (type, value) => {
    let urlPrefix = '/clientportal/rs/resources/ref/'
    return new Promise(
      (resolve, reject) => {
        fetch(urlPrefix + type + '/' + value, { credentials: 'same-origin' }).then(
          response => {
            if (response.status === 200) {
              response.text().then(data => {
                resolve(JSON.parse(data))
              });
            }
          }
        )
      }
    )
  }

  render() {
    return (
      <span>{this.state.text}</span>
    )
  }
}

export default ReferenceDataText
