/**
 * API Mode Controller
 * Detects whether to use real API or mock data based on environment
 */

export type ApiMode = "real" | "mock";

class ApiModeController {
  private mode: ApiMode = "mock"; // Default to mock until API_URL is available

  constructor() {
    this.detectMode();
  }

  /**
   * Detect which mode to use based on EXPO_PUBLIC_API_URL availability
   */
  private detectMode() {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    if (apiUrl && apiUrl.trim() !== "") {
      this.mode = "real";
      console.log("✅ API Mode: REAL - Using backend API:", apiUrl);
    } else {
      this.mode = "mock";
      console.log("📱 API Mode: MOCK - Using mock data for demo (backend not deployed)");
    }
  }

  getMode(): ApiMode {
    return this.mode;
  }

  isRealMode(): boolean {
    return this.mode === "real";
  }

  isMockMode(): boolean {
    return this.mode === "mock";
  }

  /**
   * Toggle mode manually (useful for testing)
   */
  setMode(mode: ApiMode) {
    this.mode = mode;
    console.log(`🔄 API Mode switched to: ${mode}`);
  }
}

export const apiModeController = new ApiModeController();
