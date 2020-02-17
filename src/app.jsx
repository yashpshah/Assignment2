const initialProducts=[];
class ProductRow extends React.Component {  
    render() {
            const product = this.props.product;
            return (
              <tr>
              <td>{product.id}</td>
              <td>{product.product_name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td><a href={product.image} target="_blank">View</a></td>
              </tr>);  
              }
 }
              
class ProductTable extends React.Component 
{  
  render()
     {
        const productRows = this.props.products.map(product =><ProductRow key={product.id} product={product} />    );
    return (      
            <table className="bordered-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
            </tr>
            </thead>
            <tbody>
                {productRows}
            </tbody> 
             </table>);  
        }
 }

 class ProductAdd extends React.Component 
 {  constructor() 
    {    
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e)
   {
      e.preventDefault();
      const form = document.forms.productAdd;
      const product = 
      {
        product_name: form.product_name.value, 
        price: form.price.value.split('$'),
        category:form.category.value,
        image:form.imageUrl.value,
        status: 'New',
        }
        this.props.createProduct(product);
        form.product_name.value = "";
        form.price.value = "$";
        form.category.value = "None";
        form.imageUrl.value = "";
      }
  render() {
          return (
                    <form name="productAdd" onSubmit={this.handleSubmit} className="formstyle">
                    <div>
                    <p><label>Product Name<br/>
                    <input type="text" name="product_name" placeholder="Product Name" />
                    </label></p>
                    
                    <p><label>Price Per Unit<br/>
                    <input type="text" name="price" placeholder="Price" defaultValue="$" />
                    </label></p><br/>
                    <button className="categorystyle">AddProduct</button>
                    </div>
                    <br/><br/>
                    
                    <div>
                    <p><label>Category<br/>
                    <select name="category" className="categorystyle">
                    <option value="None">Select</option>  
                    <option value="Shirts">Shirts</option>  
                    <option value="Jeans">Jeans</option>  
                    <option value="Jackets">Jackets</option>  
                    <option value="Sweaters">Sweaters</option>  
                    <option value="Accessories">Accessories</option>  
                    </select>
                    </label></p>
                    
                    <p><label>Image URL<br/>
                    <input type="text" name="imageUrl" placeholder="Image URL" />
                    </label></p>
                    </div>
                    </form>
                    ); 
            }
}

class ProductList extends React.Component {
  constructor() 
  {    
      super();
      this.state = { products: []
     };

    this.createProduct = this.createProduct.bind(this);
  }
  componentDidMount() 
  {
        this.loadData();
  }
  loadData() 
  {    
      setTimeout(() => {      this.setState({ products: initialProducts });    }, 500); 
  }
  createProduct(product) 
  {    
      product.id = this.state.products.length + 1;
      const newProductList = this.state.products.slice();
      newProductList.push(product);
      this.setState({ products: newProductList }); 
  }
  render() {    return ( 
           <React.Fragment>
                    <h1>My Company Inventory</h1>
                    <h2>Showing all available products</h2>
                    <hr/>
                    <ProductTable products={this.state.products} /><br/>
                    <h2>Add a new product to inventory</h2>
                    <hr />
                    <ProductAdd createProduct={this.createProduct} />
            </React.Fragment>
            );  
        }
 }

const element = <ProductList />;
ReactDOM.render(element, document.getElementById('contents'));