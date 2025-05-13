import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Plan} from "../model/plan.entity";


@Injectable({
  providedIn: 'root'
})
export class PlansService extends BaseService<Plan> {

  constructor(http: HttpClient) {
      super(http);
      this.resourceEndpoint = '/plans';
    }
}
