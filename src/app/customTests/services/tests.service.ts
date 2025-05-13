import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Test } from "../model/test.entity";


@Injectable({
  providedIn: 'root'
})
export class TestsService extends BaseService<Test> {

  constructor(http: HttpClient) {
      super(http);
      this.resourceEndpoint = '/tests';
    }
}
