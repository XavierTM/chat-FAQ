
import React from 'react';
import { v4 as uuid } from 'uuid'



class LazyloadImage extends React.Component {

	_id = 'img-' + uuid()
   id = "div-img-" + uuid();
   retryLoadingDuration = 5000;

	onLoad = () => {
		this.setState({ ...this.state, loaded: true });
	}

	onError = () => {

		if (!this.props.retry)
			return

		// reload
      const retryLoadingDuration = this.retryLoadingDuration;
      this.retryLoadingDuration *= 2;

      setTimeout(() => {
		   document.getElementById(this._id).src = this.props.src;
      }, retryLoadingDuration);

	}

   state = {
      loaded: false
   }


	render() {

		const { loaded } = this.state;
		const { src, alt, objectFit='cover' } = this.props;


      let aspectRatio;

      if (this.props.aspectRatio)
         aspectRatio = parseFloat(this.props.aspectRatio);
      else if (!loaded)
         aspectRatio = 1;

		const divStyle = {
			background: loaded ? undefined : '#CCC',
         aspectRatio,
		}

		const imgStyle = {
			display: loaded ? '' : 'none',
         objectFit,
         objectPosition: '50% 50%',
         width: '100%',
			height: '100%',
			...(this.props.imgStyle || {})
		}

		return <div style={divStyle} id={this.id}>
			<img 
				style={imgStyle} 
				src={src} 
				onLoad={this.onLoad}
				onError={this.onError}
				alt={alt}
				id={this._id}
			/>
		</div>
	}
}

export default LazyloadImage;