import { Observable } from 'rxjs';

export abstract class FSProductAssignmentAdapter {
  /**
   * Abstract method used to load product assignments of organizational unit
   *
   * @param userId The user id
   * @param orgUnitId The org unit id
   * @param active: The assignment state
   * @param pageSize The page size
   * @param currentPage The current page
   * @param sort The sorting method
   */
  abstract loadProductAssignmentsForUnit(
    userId: string,
    orgUnitId: string,
    active: boolean,
    pageSize: number,
    currentPage: number,
    sort: string
  ): Observable<any>;

  /**
   * Abstract method used to create product assingnment for unit
   *
   * @param userId The user id
   * @param orgUnitId The org unit id
   * @param productCode The product code
   */
  abstract createProductAssignment(
    userId: string,
    orgUnitId: string,
    productCode: string
  );

  /**
   * Abstract method used to remove product assingnment for unit
   *
   * @param userId The user id
   * @param orgUnitId The org unit id
   * @param productCode The product code
   */
  abstract removeProductAssignment(
    userId: string,
    orgUnitId: string,
    productCode: string
  );

  /**
   * Abstract method used to load customer profile
   *
   * @param userId The user id
   * @param orgCustomerId The org customer Id
   */
  abstract loadCustomerProfile(userId: string, orgCustomerId: string);

  /**
   * Abstract method used to change active status of product assignment by its code
   *
   * @param userId The user id
   * @param orgUnitId The org unit id
   * @param productAssignmentCode The product assignment code
   * @param active The current active status of assignment
   */
  abstract changeActiveStatus(
    userId: string,
    orgUnitId: string,
    productAssignmentCode: string,
    active: boolean
  );
}
