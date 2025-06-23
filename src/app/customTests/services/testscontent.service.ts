import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { TestContent } from "../model/testcontent.entity";


@Injectable({
  providedIn: 'root'
})
export class TestsContentService extends BaseService<TestContent> {

   constructor(http: HttpClient) {
        super(http);
        this.resourceEndpoint = '/tests-content';
      }
}
