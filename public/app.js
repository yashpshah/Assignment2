const initialProducts = [];

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    return React.createElement("tr", null, React.createElement("td", null, product.id), React.createElement("td", null, product.product_name), React.createElement("td", null, "$", product.price), React.createElement("td", null, product.category), React.createElement("td", null, React.createElement("a", {
      href: product.image,
      target: "_blank"
    }, "View")));
  }

}

class ProductTable extends React.Component {
  render() {
    const productRows = this.props.products.map(product => React.createElement(ProductRow, {
      key: product.id,
      product: product
    }));
    return React.createElement("table", {
      className: "bordered-table"
    }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "ID"), React.createElement("th", null, "Product Name"), React.createElement("th", null, "Price"), React.createElement("th", null, "Category"), React.createElement("th", null, "Image"))), React.createElement("tbody", null, productRows));
  }

}

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    const product = {
      product_name: form.product_name.value,
      price: form.price.value.split('$'),
      category: form.category.value,
      image: form.imageUrl.value,
      status: 'New'
    };
    this.props.createProduct(product);
    form.product_name.value = "";
    form.price.value = "$";
    form.category.value = "None";
    form.imageUrl.value = "";
  }

  render() {
    return React.createElement("form", {
      name: "productAdd",
      onSubmit: this.handleSubmit,
      className: "formstyle"
    }, React.createElement("div", null, React.createElement("p", null, React.createElement("label", null, "Product Name", React.createElement("br", null), React.createElement("input", {
      type: "text",
      name: "product_name",
      placeholder: "Product Name"
    }))), React.createElement("p", null, React.createElement("label", null, "Price Per Unit", React.createElement("br", null), React.createElement("input", {
      type: "text",
      name: "price",
      placeholder: "Price",
      defaultValue: "$"
    }))), React.createElement("br", null), React.createElement("button", {
      className: "categorystyle"
    }, "AddProduct")), React.createElement("br", null), React.createElement("br", null), React.createElement("div", null, React.createElement("p", null, React.createElement("label", null, "Category", React.createElement("br", null), React.createElement("select", {
      name: "category",
      className: "categorystyle"
    }, React.createElement("option", {
      value: "None"
    }, "Select"), React.createElement("option", {
      value: "Shirts"
    }, "Shirts"), React.createElement("option", {
      value: "Jeans"
    }, "Jeans"), React.createElement("option", {
      value: "Jackets"
    }, "Jackets"), React.createElement("option", {
      value: "Sweaters"
    }, "Sweaters"), React.createElement("option", {
      value: "Accessories"
    }, "Accessories")))), React.createElement("p", null, React.createElement("label", null, "Image URL", React.createElement("br", null), React.createElement("input", {
      type: "text",
      name: "imageUrl",
      placeholder: "Image URL"
    })))));
  }

}

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({
        products: initialProducts
      });
    }, 500);
  }

  createProduct(product) {
    product.id = this.state.products.length + 1;
    const newProductList = this.state.products.slice();
    newProductList.push(product);
    this.setState({
      products: newProductList
    });
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement("h1", null, "My Company Inventory"), React.createElement("h2", null, "Showing all available products"), React.createElement("hr", null), React.createElement(ProductTable, {
      products: this.state.products
    }), React.createElement("br", null), React.createElement("h2", null, "Add a new product to inventory"), React.createElement("hr", null), React.createElement(ProductAdd, {
      createProduct: this.createProduct
    }));
  }

}

const element = React.createElement(ProductList, null);
ReactDOM.render(element, document.getElementById('contents'));