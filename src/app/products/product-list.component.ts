import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductService } from "./product.service";
import { IProduct } from "./products";

@Component({
    selector: 'pm-product',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{
    pageTitle: string = 'Page Title';
    showImage: boolean = false;
    errorMessage: string = '';
    sub!: Subscription;

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
        this.sub = this.productService.getProducts().subscribe({
          next: products => {
            this.products = products;
            this.filteredProducts = this.products;
          }, 
          error: err => this.errorMessage = err
        });
      }
      ngOnDestroy(): void{
        this.sub.unsubscribe();
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