import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { editProduct } from "../actions/productsAction";
/**
 * Form renders  the form to edit product details
 * @extends Component
 */
class Form extends Component {
  state = {
    name: "",
    pricingTier: "",
    weight: "",
    availability: "",
    isEditable: false,
    productUrl: "",
    id: "",
    priceRange: undefined,
    options: []
  };
  /**
   *  pricingRange shows tier options
   * @param {String} tier
   */
  pricingRange = tier => {
    const budgetTierOptions = [
      {
        id: 1,
        value: "4k - 6k"
      },
      {
        id: 2,
        value: "6k - 9k"
      },
      {
        id: 3,
        value: "9k - 11k"
      }
    ];
    const premierTierOptions = [
      {
        id: 1,
        value: "11k - 20k"
      },
      {
        id: 2,
        value: "20k - 30k"
      },
      {
        id: 3,
        value: "30k+"
      }
    ];
    if (tier === "premier") {
      this.setState({
        options: premierTierOptions
      });
    } else if (tier === "budget") {
      this.setState({
        options: budgetTierOptions
      });
    }
  };
  componentWillMount() {
    if (this.props.currSelectedProduct) {
      const {
        name,
        weight,
        availability,
        productUrl,
        pricingTier,
        isEditable,
        priceRange,
        id
      } = this.props.currSelectedProduct;
      this.pricingRange(pricingTier);
      this.setState({
        name,
        weight,
        availability,
        pricingTier,
        isEditable,
        productUrl,
        priceRange
      });
    }
  }
  /**
   * handleSubmit edit the product on form submit
   * @param {Object} e
   */
  handleSubmit = e => {
    e.preventDefault();
    const { history } = this.props;
    const form = {
      id: this.props.currSelectedProduct.id,
      name: this.state.name,
      pricingTier: this.state.pricingTier,
      weight: this.state.weight,
      availability: this.state.availability,
      isEditable: this.state.isEditable,
      priceRange: this.state.priceRange
    };
    this.props.editProduct(form);

    history.push("/");
  };
  /**
   * handleChange handles changes to form input
   * @param {Object} e
   */
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  /**
   * handleChangeEditable handles changes to form checkbox
   */
  handleChangeEditable = () => {
    this.setState({
      isEditable: !this.state.isEditable
    });
  };
  setPricingTier = pricingTier => {
    this.setState({
      pricingTier
    });
    this.pricingRange(pricingTier);
  };
  /**
   * setPriceRange handles changes to form select box
   * @param {Object} e
   */
  setPriceRange = e => {
    const { pricingTier } = this.state;
    this.setState({
      priceRange: e.target.value
    });
  };
  /**
   * Form renders product details in form format JSX
   * @return {JSX}
   */
  render() {
    const { currSelectedProduct } = this.props;
    const {
      name,
      weight,
      availability,
      productUrl,
      pricingTier,
      isEditable,
      priceRange,
      options
    } = this.state;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-25">
              <label>Name</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                name="name"
                onChange={this.handleChange}
                value={name || ""}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Weight</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                name="weight"
                onChange={this.handleChange}
                value={weight || ""}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Availibilty</label>
            </div>
            <div className="col-75">
              <input
                type="number"
                name="availability"
                onChange={this.handleChange}
                value={availability || ""}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Product Url</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                name="productUrl"
                onChange={this.handleChange}
                value={productUrl}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <input
                type="radio"
                name="pricingTier"
                onChange={() => this.setPricingTier("budget")}
                checked={true ? pricingTier === "budget" : false}
              />
            </div>
            <div className="col-25">
              <label htmlFor="">Budget</label>
            </div>
            <div className="col-25">
              <input
                type="radio"
                name="pricingTier"
                onChange={() => this.setPricingTier("premier")}
                checked={true ? pricingTier === "premier" : false}
              />
            </div>
            <div className="col-25">
              <label>Premier</label>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Tier</label>
            </div>
            <div className="col-75">
              <select
                value={priceRange}
                options={options}
                onChange={this.setPriceRange}
              >
                {options.map(op => {
                  return (
                    <option key={op.value} value={op.value}>
                      {op.value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Editable</label>
            </div>
            <div className="col-75">
              <input
                type="checkbox"
                name="isEditable"
                onChange={this.handleChangeEditable}
                defaultChecked={isEditable}
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  currSelectedProduct: state.products.currSelectedProduct,
  products: state.products.products
});

export default connect(mapStateToProps, { editProduct })(withRouter(Form));
