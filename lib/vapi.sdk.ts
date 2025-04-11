// This is a simple wrapper around the VAPI Web SDK
// It checks if we're in the browser environment before importing

let Vapi: any;

// Import the VAPI SDK only on the client side
if (typeof window !== "undefined") {
  try {
    // Dynamic import of the VAPI SDK
    import("@vapi-ai/web")
      .then(module => {
        Vapi = module.default;
      })
      .catch(error => {
        console.error("Error importing VAPI SDK:", error);
      });
  } catch (error) {
    console.error("Error setting up VAPI SDK:", error);
  }
}

// Create a placeholder API that works in both server and client contexts
class VAPIClient {
  private client: any = null;
  private isReady = false;
  private eventListeners: Record<string, Function[]> = {};

  constructor() {
    // Initialize the client when in browser
    if (typeof window !== "undefined") {
      // Wait for the dynamic import to complete
      const initClient = () => {
        if (Vapi) {
          try {
            const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;
            if (!token) {
              console.error("Missing VAPI web token in environment variables");
              return;
            }
            this.client = new Vapi(token);
            this.isReady = true;
          } catch (error) {
            console.error("Error initializing VAPI client:", error);
          }
        } else {
          // If not ready yet, retry after a small delay
          setTimeout(initClient, 100);
        }
      };

      initClient();
    }
  }

  async start(assistantId: string, options?: any) {
    if (!this.isReady) {
      await this.waitForReady();
    }

    if (this.client) {
      return this.client.start(assistantId, options);
    }

    console.warn("VAPI client not initialized");
    return Promise.reject("VAPI client not initialized");
  }

  stop() {
    if (this.client) {
      return this.client.stop();
    }
  }

  on(event: string, callback: Function) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }

    this.eventListeners[event].push(callback);

    if (this.client) {
      this.client.on(event, callback);
    }
  }

  off(event: string, callback: Function) {
    if (this.client) {
      this.client.off(event, callback);
    }

    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter(
        listener => listener !== callback
      );
    }
  }

  private waitForReady(): Promise<void> {
    return new Promise(resolve => {
      const checkReady = () => {
        if (this.isReady) {
          resolve();
        } else {
          setTimeout(checkReady, 100);
        }
      };
      checkReady();
    });
  }
}

// Export a singleton instance
export const vapi = new VAPIClient();
