import { PaginationModel } from '@spartacus/core';

export class PaginationHelper {
  public static getPaginationResults(pagination: PaginationModel, collection) {
    let paginatedCollection;
    const totalResults: number = collection.length;
    let totalPages: number = Math.floor(totalResults / pagination.pageSize);
    if (totalResults % pagination.pageSize > 0) {
      totalPages++;
    }
    let currentPage = !!pagination.currentPage ? pagination.currentPage : 0;
    if (pagination.pageSize === totalResults && currentPage !== 0) {
      currentPage--;
      pagination.currentPage = currentPage;
    }

    if (currentPage === 0) {
      paginatedCollection = collection.slice(0, pagination.pageSize);
    } else {
      paginatedCollection = collection.slice(
        currentPage * pagination.pageSize,
        pagination.pageSize + currentPage * pagination.pageSize
      );
    }
    const paginationData = {
      currentPage: currentPage,
      pageSize: pagination.pageSize,
      totalPages: totalPages,
      totalResults: totalResults,
    };
    return { pagination: paginationData, values: paginatedCollection };
  }
}
