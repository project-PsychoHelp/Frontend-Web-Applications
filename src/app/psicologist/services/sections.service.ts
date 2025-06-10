import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Sections } from "../model/sections.entity";
@Injectable({
  providedIn: 'root'
})
export class SectionsService  extends BaseService<Sections> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/sections';
  }
}
