import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  constructor( private afs: Firestore, private toastr: ToastrService ) { }
  
  saveData(data) {
    const collectionInstance = collection(this.afs, 'categories')
    
    addDoc(collectionInstance, data).then(docRef => {
      console.log(docRef)
      this.toastr.success('Data Insert Successfully ..!')
    })
    .catch(err => { console.log(err) })
  }

  loadData() {
    const collectionInstance = collection(this.afs, 'categories')

    return collectionData(collectionInstance, { idField: 'id' }).pipe(
      map(action => {
        return action.map(a => {
          const data = {
            category: a['category']
          }
          const id = a['id']

          return { id, data }
        })
      })
    )
  }

  updateData(id, EditData) {
    const docInstance = doc(this.afs, 'categories', id)

    updateDoc(docInstance, EditData).then(docRef => {
      this.toastr.success('Data Updated Successfully ..!')
    })
  }

  deleteData(id) {
    const docInstance = doc(this.afs, 'categories', id)
    
    deleteDoc(docInstance).then(docRef => {
      this.toastr.success('Data Deleted ..!')
    })
  }
}
