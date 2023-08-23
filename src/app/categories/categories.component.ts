import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoryArray: Array<any>
  formCategory: string
  formStatus: string = 'Add'
  categoryId: string

  constructor( private categoryService: CategoriesService ) { }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      console.log(val)
      this.categoryArray = val;
    })
  }

  onSubmit(formData) {

    let categoryData: Category = {
      category: formData.value.category,
    }

    if (this.formStatus === 'Add') {
      this.categoryService.saveData(categoryData);
      formData.reset()
    } else if (this.formStatus === 'Edit') {
      this.categoryService.updateData(this.categoryId, categoryData)
      formData.reset();
      this.formStatus = 'Add'
    }

    // let subCategoryData = {
    //   subCategory: 'subCategory1'
    // }
    // const  collectionInstance = collection(this.afs, 'categories')

    // addDoc(collectionInstance, categoryData).then(docRef => {
    //   console.log(docRef)
      
    //   const docInstance = doc(collectionInstance, docRef.id)

    //   addDoc(collection(docInstance, 'subcategories'), subCategoryData).then(docRef1 =>{
    //     console.log(docRef1);

    //     addDoc(collection(doc(collection(docInstance, 'subcategories'), docRef1.id), 'subsubcategories'), subCategoryData).then(docRef2 => {
    //       console.log('Second level category!')
    //     })

    //   })
      
    // })
    // .catch(err => { console.log(err) })
  }

  onEdit(category, id) {
    this.formCategory = category
    this.formStatus = 'Edit'
    this.categoryId = id
  }

  onDelete(id) {
    this.categoryService.deleteData(id)
  }

}
