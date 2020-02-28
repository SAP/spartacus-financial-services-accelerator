import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-book-of-bussines',
  templateUrl: './book-of-bussines.component.html',
  styleUrls: ['./book-of-bussines.component.css']
})
export class BookOfBussinesComponent implements OnInit {

  users;

  constructor() { }

  ngOnInit() {
    this.users = [
        {
            "type": "userWsDTO",
            "name": "Donna Moore",
            "uid": "donna@moore.com",
            "dateOfBirth": "1990-12-20",
            "displayUid": "Donna@Moore.com",
            "firstName": "Donna",
            "language": {
              "active": true,
              "isocode": "en",
              "name": "English",
              "nativeName": "English"
            },
            "lastName": "Moore",
            "title": "Mrs.",
            "titleCode": "mrs"
          }
    ];
}

}
