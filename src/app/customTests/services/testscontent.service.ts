import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Testcontent } from "../model/testcontent.entity";


@Injectable({
  providedIn: 'root'
})
export class TestscontentService extends BaseService<Testcontent> {

   constructor(http: HttpClient) {
        super(http);
        this.resourceEndpoint = '/testscontent';
      }
}
