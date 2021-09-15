import { Component, OnInit } from "@angular/core";
import { ProductService } from "./product.service";
import { IProduct } from "./products";

@Component({
    selector: 'pm-product',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
    pageTitle: string = 'Page Title';
    showImage: boolean = false;

    private _listFilter = '';
    get listFilter():string{
      return this._listFilter
    }
    set listFilter(value: string){
      this._listFilter = value
      this.filteredProducts = this.performFilter(value);
    }
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];


      constructor(private productService: ProductService){}
      toggleImage(): void{
        this.showImage = !this.showImage
      }
      ngOnInit():void{
        this.listFilter = '';
        this.products = this.productService.getProducts();
        this.filteredProducts = this.products;
      }

      performFilter(filterby: string): IProduct[]{
          filterby = filterby.toLocaleLowerCase();
           return this.products.filter((product: IProduct)=>
              product.productName.toLocaleLowerCase().includes(filterby)
           )
      }
      onRatingClicked(message: string): void{
          this.pageTitle = message 
      }
}