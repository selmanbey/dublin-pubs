import React from 'react'
import PropTypes from 'prop-types'

class InfoBox extends React.Component {
  constructor(props) {
    super(props);

    // this.renderContent = this.renderContent.bind(this)
    this.createImgSrc = this.createImgSrc.bind(this)
  }

  processFourSquareData(data) {
      let contentObject = {
        title: "",
        imgSrc: "",
        link: "",
        status: ""
      }

      if (!data) {
        console.log(data)
        contentObject.title = "Data is being fetched at the moment. Please be patient. If you have been patient enough already, there is also a chance that there is something wrong with your current internet connection."
        contentObject.status = "fetching"
      } else if (data.meta.code === 429) {
        contentObject.title = "FourSquare API quota exceeded for today, so the place info couldn't be retrieved. Please try again in 24 hours."
        contentObject.status = "quota_exceeded"
      } else if (data.response.hasOwnProperty("venue")) {
        contentObject.title = data.response.venue.name
        contentObject.imgSrc = this.createImgSrc(data)
        contentObject.link = data.response.venue.canonicalUrl
        contentObject.status = "success"
      } else {
        contentObject.title = "An unknown error occured"
        contentObject.status = "unkown_error"
      }

      return contentObject
  }

  createImgSrc(data) {
    // if photo is in the data, captures it
    // if not, returns an empty string which will result an empty photo
    // POSSIBLE OPTIMIZATION: RETURN A SOURCE FOR FAILED PICTURE FETCH
    if(data.response.hasOwnProperty("venue")) {
      let prefix = data.response.venue.bestPhoto.prefix
      let suffix = data.response.venue.bestPhoto.suffix
      let src = prefix + "300x300" + suffix

      return src
    } else {
      return ""
    }
  }

  componentDidUpdate() {
    this.refs.dialog.open = JSON.parse(this.props.isDialogOpen)
  }

  componentDidMount() {
    document.addEventListener("keydown", (e) => {
      if(e.key === "Escape") {
        this.props.closeDialog()
      }
    })
  }

  render () {

    let contentObject = this.processFourSquareData(this.props.fourSquareData)

    if ( contentObject.status === "fetching" ||
         contentObject.status === "quota_exceeded" ||
         contentObject.status === "unkown_error"
    ) {
      console.log("inside")
      return (
        <dialog className="info-box" ref="dialog">
          <button className="close-info-box" onClick={ this.props.closeDialog }>X</button>
          <br/>
          <p className="info-box-message"> { contentObject.title } </p>
        </dialog>
      )
    }

    return(
        <dialog className="info-box" ref="dialog">
            <button className="close-info-box" onClick={ this.props.closeDialog }>X</button>
            <h1>{ contentObject.title }</h1>
            <div className="img-container">
              <img className="pub-img" src={ contentObject.imgSrc} alt="Pub Photo"/>
            </div>
            <br/>
            <a href={ contentObject.link }>See Details</a>
            <br/>
            <p className="hint">Click on X or press "escape" to close this info box</p>
        </dialog>
    )
  }

}

export default InfoBox;
