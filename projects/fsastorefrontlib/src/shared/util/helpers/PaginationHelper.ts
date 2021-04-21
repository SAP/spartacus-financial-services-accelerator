export class PaginationHelper {
  public static getPaginationResults(pageSize, currentPageParam, collection) {
    let paginatedCollection;
    const totalResults: number = collection.length;
    let totalPages: number = Math.floor(totalResults / pageSize);
    if (totalResults % pageSize > 0) {
      totalPages++;
    }
    const currentPage = !!currentPageParam ? currentPageParam : 0;
    if (currentPage === 0) {
      paginatedCollection = collection.slice(0, pageSize);
    } else {
      paginatedCollection = collection.slice(
        currentPage * pageSize,
        pageSize + currentPage * pageSize
      );
    }
    const paginationData = {
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      totalResults: totalResults,
    };
    return { pagination: paginationData, values: paginatedCollection };
  }
}
