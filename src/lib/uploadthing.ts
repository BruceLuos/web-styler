import {
  generateComponents,
  generateUploadButton,
  generateUploadDropzone,
  generateUploader,
} from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();

export { generateUploadButton, generateUploadDropzone, generateUploader };

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
