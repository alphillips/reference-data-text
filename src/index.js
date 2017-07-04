import React from 'react';

class ReferenceDataText extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    this.host = process.env.API_HOST || ''
  }

  componentDidMount() {
    const { type, value } = this.props;

    if(!this.props.noCache){
      if(window.referenceDataTextCache){
        if(window.referenceDataTextCache[type + '-' + value]){
          this.setState({
            text: window.referenceDataTextCache[type + '-' + value]
          })
          return
        }
      }
    }

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

    if(!this.props.noCache){
      if(window.referenceDataTextCache){
        if(window.referenceDataTextCache[type + '-' + value]){
          this.setState({
            text: window.referenceDataTextCache[type + '-' + value]
          })
          return
        }
      }
    }

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
    let urlPrefix = this.host + '/api/refdata/'
    return new Promise(
      (resolve, reject) => {
        fetch(urlPrefix + type + '/' + value, { credentials: 'same-origin' }).then(
          response => {
            if (response.status === 200) {
              response.text().then(data => {
                resolve(data)

                if(!this.props.noCache){
                  if(!window.referenceDataTextCache){
                    window.referenceDataTextCache = []
                  }
                  window.referenceDataTextCache[type + '-' + value] = data
                }

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
