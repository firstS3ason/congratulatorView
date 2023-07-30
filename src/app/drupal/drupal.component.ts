import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { interval, lastValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

interface IAttributes {
  drupal_internal__nid: string;
  title: string;
}

interface IArticle {
  attributes: IAttributes;
}

@Component({
  selector: 'app-drupal',
  templateUrl: './drupal.component.html',
  styleUrls: ['./drupal.component.scss'],
})
export class DrupalComponent implements OnInit {
  readonly form = this.fb.group({ 
    name :['', [Validators.required]],
    date :['', [Validators.required]],
    mail :['',[Validators.required]],
    photo: [[]]
  })

  li: any;
  lis: any[] = [];
  endpoint: string = `$=/node/article?sort=title`;
  loading: boolean = false;

  listQuota = 5;
  content = [];
  baseUrl = `$=`;
  path = '/node/article?sort=nid';
  pager = `&page[limit]=${this.listQuota}&include=field_image`;
  prev: string = '';
  next: string = '';
  current: string = '';

  
  constructor(private http: HttpClient,public userSerice:UserServiceService,
    private router: Router,
    private fb : FormBuilder) {}

  async ngOnInit(): Promise<any> {
  }
  public url:string | ArrayBuffer |null = ""

  // public createUser(fio:string,emal:string,date:string,file:string){
    
  //   this.userSerice.addUser(fio,date,emal,this.url?.toString()).subscribe(res=>{})
  //   console.log(this.url?.toString())
  // }
  
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('photo')?.setValue(file);
    }}
    
    onSubmit(){
    const formData = new FormData();
    const photos =  this.form.get('photo')?.value;
    formData.append('file', photos!);
    this.userSerice.addUser(this.form.get('name')?.value, this.form.get('date')?.value,this.form.get('mail')?.value, formData).subscribe(res=>{
    console.log(res);
    this.router.navigateByUrl('');
    });
    }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

    


  }
}
