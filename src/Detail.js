import { Component } from "react";
import { withRouter } from "./withRouter";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Detail extends Component {
    state = {loading:true, showModal: false}


  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  toggleModal = () => this.setState({showModal: !this.state.showModal})
  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  render() {
    // throw new Error();

    console.log(this.props);
    if (this.state.loading) {
      return <h2>loading....</h2>;
    }
    const { animal, breed, name, city, state, description, images, showModal } =
      this.state;
    console.log(images);
    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${city} - ${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button onClick={this.toggleModal} style={{ backgroundColor: theme }}>Adopt {name}</button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {
            showModal?(
                <Modal>
                    <div>
                        <h1>Would you like to adopt {name}</h1>
                        <div className="buttons">
                            <button onClick={this.adopt}>Yes</button>
                            <button onClick={this.toggleModal}>No</button>
                        </div>
                    </div>
                </Modal>
            ): null
          }
        </div>
      </div>
    );
  }
}

const DetailWithRouter = withRouter(Detail);

export default function DetailErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <DetailWithRouter {...props} />
    </ErrorBoundary>
  );
}
