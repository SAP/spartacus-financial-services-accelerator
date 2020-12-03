import { OccEndpoints } from '@spartacus/core';

export interface FormOccEndpoints extends OccEndpoints {
  /**
   * Get form definition by id
   *
   */
  formDefinition?: string;
  /**
   * Get form definitions
   *
   */
  formDefinitions?: string;
  /**
   * Get form data
   *
   */
  formData?: string;
  /**
   * Create form data
   *
   */
  createFormData?: string;
  /**
   * Upload file
   *
   */
  uploadFile?: string;
  /**
   * Remove file
   *
   */
  removeFile?: string;
  /**
   * Get file
   *
   */
  getFile?: string;
  /**
   * Get files
   *
   */
  getFiles?: string;
}
