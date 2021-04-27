import { PaginationModel } from '@spartacus/core';

export class PaginationHelper {
  public static getPaginationResults(pagination: PaginationModel, collection) {
    let paginatedCollection;
    const totalResults: number = collection.length;
    const totalPages: number = Math.ceil(totalResults / pagination.pageSize);
    let currentPage = !!pagination.currentPage ? pagination.currentPage : 0;
    if (
      currentPage !== 0 &&
      totalResults % pagination.pageSize === 0 &&
      totalPages === currentPage
    ) {
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
