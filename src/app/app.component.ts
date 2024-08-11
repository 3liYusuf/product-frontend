import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  baseURL = 'https://product-api-v827.onrender.com';
  loggedIn: boolean = false;
  email = '3liyusuf@ignite.com';
  password = '123456';
  products: any;
  tab = 'main';
  productMaterial: any;
  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    this.getProducts();
  }

  async openDetails(productID: any) {
    await this.getProductMaterials(productID);
    console.log('Product Material:', this.productMaterial); // Debug log
    if (this.productMaterial && this.productMaterial.length > 0) {
      this.tab = 'details';
    } else {
      alert('No data found');
    }
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedIn');
  }

  login() {
    this.http
      .post(`${this.baseURL}/login`, {
        email: this.email,
        password: this.password,
      })
      .toPromise() // Convert observable to promise
      .then((response: any) => {
        if (response.message === 'Login successful') {
          this.getProducts();
          localStorage.setItem('loggedIn', 'true');
        } else {
          // Handle case where login is not successful
          console.error('Login failed: ', response.message);
        }
      })
      .catch((error) => {
        console.error('Login failed', error);
        // Handle login failure
      });
  }

  logout() {
    localStorage.removeItem('loggedIn');
  }

  getProducts(): Promise<any> {
    return this.http
      .get(`${this.baseURL}/products`)
      .toPromise()
      .then((res: any) => {
        this.products = res;
      })
      .catch((err) => {});
  }

  // Get a specific product by ID
  getProduct(id: string): Promise<any> {
    return this.http
      .get(`${this.baseURL}/product/${id}`)
      .toPromise()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {});
  }

  // Create a new product
  addProduct(productData: any): Promise<any> {
    return this.http
      .post(`${this.baseURL}/product`, productData)
      .toPromise()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {});
  }

  // Update a product by ID
  updateProduct(id: string, productData: any): Promise<any> {
    return this.http
      .put(`${this.baseURL}/product/${id}`, productData)
      .toPromise()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {});
  }

  // Delete a product by ID
  deleteProduct(id: string): Promise<any> {
    return this.http
      .delete(`${this.baseURL}/product/${id}`)
      .toPromise()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {});
  }

  // Get all materials for a specific product
  getProductMaterials(productId: string): Promise<any> {
    return this.http
      .get(`${this.baseURL}/product-material/${productId}`)
      .toPromise()
      .then((res: any) => {
        this.productMaterial = res;
        console.log('Product Material:', this.productMaterial);
      })
      .catch((err) => {
        console.error('Error fetching product materials', err);
      });
  }

  // Add a new material to a specific product
  addProductMaterial(productId: string, materialData: any): Promise<any> {
    return this.http
      .post(`${this.baseURL}/product-material/${productId}`, materialData)
      .toPromise()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {});
  }

  // Update a specific material by ID
  updateProductMaterial(materialID: string, materialData: any): Promise<any> {
    return this.http
      .put(`${this.baseURL}/product-material/${materialID}`, materialData)
      .toPromise()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {});
  }

  // Delete a specific material by ID
  deleteProductMaterial(materialID: string): Promise<any> {
    return this.http
      .delete(`${this.baseURL}/product-material/${materialID}`)
      .toPromise()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {});
  }
}
