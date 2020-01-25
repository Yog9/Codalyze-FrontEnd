import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setSelectedProduct } from "../actions/productsAction";
/**
 * Products renders  the table showing products
 * @extends Component
 */
class Products extends Component {
  /**
   * showTableData shows products name,weight,availability and if its editable
   */
  showTableData = () => {
    return this.props.products.map(product => {
      return (
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>{product.weight}</td>
          <td>{product.availability}</td>
          {product.isEditable ? (
            <td>
              <Link to="/edit-product">
                <button
                  id={product.id}
                  onClick={() => this.props.setSelectedProduct(product)}
                >
                  Editable
                </button>
              </Link>
            </td>
          ) : (
            ""
          )}
        </tr>
      );
    });
  };
  /**
   * Products renders product details in table format JSX
   * @return {JSX}
   */
  render() {
    return (
      <React.Fragment>
        <table id="products">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Weight</th>
              <th>Availability</th>
              <th>isEditable</th>
            </tr>
            {this.showTableData()}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products
});
export default connect(mapStateToProps, { setSelectedProduct })(Products);
