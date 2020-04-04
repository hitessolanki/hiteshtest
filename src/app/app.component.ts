import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, NgForm } from '@angular/forms';
import { MAX_NO_FILES, FILE_TYPES, MAX_FILE_SIZE_ERROR, MAX_FILE_SIZE } from './utility/constant';
import { UserService } from './user.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  imgs = [];
  image_info = "";
  isNewRecord: Boolean;
  existingImages = "";
  max_no_files: number = MAX_NO_FILES;
  max_file_size = MAX_FILE_SIZE;

  constructor(public fb: FormBuilder, private userService: UserService) { }
  fileInputValidator: ValidatorFn = (fg: FormGroup) => {
    let isError = null;
    let imgs = fg.get('images');
    if (imgs.value && imgs.value.length > 0) {
      let imgs_length = imgs.value.length;
      imgs.value.forEach(file => {
        if ($.inArray(file.type, FILE_TYPES) == -1) {
          isError = { invalidFileType: true }
          return;
        }
        if (isError == null && file.size > this.max_file_size) {
          isError = { invalidFileSize: true }
          return;
        }
      });
      if (isError == null && this.isNewRecord && imgs_length > this.max_no_files) {
        isError = { fileCountError: true }
      } else if (isError == null && !this.isNewRecord && (this.imgs.length + imgs_length) > this.max_no_files) {
        isError = { fileCountError: true }
      }
    }
    return isError
  };
  addForm: FormGroup = this.fb.group({
    id: [""],
    name: ["", [Validators.required]],
    gender: [],
    zip: ["", [Validators.required]],
    area: ["", [Validators.required]],
    images: [],
  }, { validator: this.fileInputValidator.bind(this) }
  );


  get name() {
    return this.addForm.get('name');
  }
  get area() {
    return this.addForm.get('area');
  }
  get zip() {
    return this.addForm.get('zip');
  }
  get gender() {
    return this.addForm.get('gender');
  }
  get images() {
    return this.addForm.get('images');
  }
  onFileChange(image_name) {
    let images_length = image_name.target.files.length;
    if (images_length > 0) {
      let allFiles = [];
      for (let index = 0; index < images_length; index++) {
        let file = image_name.target.files[index];

        allFiles.push(file);
      }
      this.addForm.get('images').setValue(allFiles);
      this.image_info = images_length + " File Selected";
    }
  }
  deleteImage() {

  }
  submitForm(form) {
    // this.isSubmitted = true;
    alert(JSON.stringify(form))
    if (!form) {
      return false;
    } else {
      this.userService.doPost('api/addUser', form).then((res: any) => {
        console.log('res', res);
      }, (error) => {
        console.log('err', error);
      });
    }
  }
}
