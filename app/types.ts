export type ActionResponse =
  | { success: true }
  | {
      success: false;
      type: "unauthorized" | "validation_error" | "not_found" | "conflict";
      error: string;
    };
